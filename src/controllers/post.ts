import { Request, Response } from 'express';
import { getConnection, getManager, getRepository, In, Tree } from 'typeorm';
import { Comment } from '../entity/Comment';
import { Post } from '../entity/Post';
import { Posttag } from '../entity/Posttag';

const getPostList = async (req: Request, res: Response) => {

  const isSecret = req.body.userRole === 1 ? [true, false] : [false];
  const page = req.query.page;
  const pageCount = (page === '1') ? 15 : 6;
  const pageOffset = (page === '1') ? 0 : (Number(page) - 2) * 6 + 15;

  if (!page) {
    const result = await getRepository(Post).createQueryBuilder('post')
    .select(['post.id AS id', 'post.title AS title'])
    .addSelect('SUBSTR(post.codeContent, 1, 200)', 'codeContent')
    .addSelect('user.name', 'userName')
    .leftJoin('post.user','user')
    .where('post.secret In (:...isSecret)', { isSecret })
    .orderBy('post.createdAt', 'DESC')
    .getRawMany();
    
    res.send({ postList: result });

  } else {
    const result = await getRepository(Post).createQueryBuilder('post')
    .select(['post.id AS id', 'post.title AS title'])
    .addSelect('SUBSTR(post.codeContent, 1, 200)', 'codeContent')
    .addSelect('user.name', 'userName')
    .leftJoin('post.user','user')
    .where('post.secret In (:...isSecret)', { isSecret })
    .offset(pageOffset)
    .limit(pageCount)
    .orderBy('post.createdAt', 'DESC')
    .getRawMany();

    res.status(200).send({ postList: result });
  }

}

const getUserPostList = async (req: Request, res: Response) => {
  if (req.body.userRole > 4 ) {
    return res.status(403).send({ message: 'forbidden user'})
  }

  const id = req.body.authUserId;
  const search = req.query.search;

  const result = await Post.createQueryBuilder('post')
  .select([
    'post.id AS id',
    'post.title AS title',
    'post.codeContent AS codeContent',
    'post.secret AS secret',
    'postTag.tagId AS understanding',
  ])
  .leftJoin('post.postTags', 'postTag', 'postTag.tagId In (:understand)', { understand: [21, 22, 23]})
  .where('post.userId = :id', { id })
  .orderBy('post.createdAt', 'DESC')
  .getRawMany()

  res.status(200).send({ postList: result});
}

const getPostById = async (req: Request, res: Response) => {

  const result = await Post.createQueryBuilder('post')
  .select(['post', 'user.name', 'postTag.tagId', 'tag.name', 'tag.categoryId', 'tag.category'])
  .leftJoin('post.user', 'user')
  .leftJoin('post.postTags', 'postTag')
  .leftJoin('postTag.tag', 'tag')
  .where('post.id = :id', { id: req.params.id })
  .getOne();

  if (result.secret) {
    if (req.body.userRole !== 1 && req.body.authUserId !== result.userId) {
      return res.status(403).send({ message: 'forbidden user'});
    }
  }

  const postTags = {
    algorithm: [],
    language: [],
    platform: [],
    difficulty: [],
    understanding: []
  }
  
  result.postTags.forEach((el) => {
    const tag = {
      id: el.tagId,
      name: el.tag.name,
      category: el.tag.category
    }
    switch (el.tag.categoryId) {
      case 1: 
        postTags['algorithm'].push(tag);
        break;
      case 2:
        postTags['platform'].push(tag);
        break;
      case 3:
        postTags['difficulty'].push(tag);
        break;
      case 4:
        postTags['understanding'].push(tag);
        break;
      case 5:
        postTags['language'].push(tag);
        break
    }
  })

  delete result.postTags;
  
  const post: object = result;
  post['userName'] = result.user.name;
  delete result.user;
  post['postTags'] = postTags;

  res.status(200).send({ post });
}

const addPost = async (req: Request, res: Response) => {
  if (req.body.userRole > 3 ) {
    return res.status(403).send({ message: 'forbidden user'})
  }

  const { title, codeContent, textContent, tagList } = req.body
  const secret = req.body.secret;

  if (!title || !codeContent) {
    return res.status(422).send('fill in the title box');
  }

  const newPost = Post.create({  
    title,
    codeContent,
    textContent,
    secret,
    userId: req.body.authUserId
  })
  const result = await Post.save(newPost);
  const postId = result.id;

  if (!tagList || !tagList.understanding || tagList.understanding.length === 0) {
    tagList.understanding = [{"id": "21", "name": "🙁", "category": "이해도"}];
  }
  
  const addTagList = Object.values(tagList);
  const list = [];
  addTagList.map((el: Object[]) => list.push(...el));

  const postTagList: Posttag[] = list.map((el: any) => {
    return Posttag.create({ postId, tagId: el.id })
  })
  
  await Posttag.save(postTagList);
  res.status(201).send({ postId });
}

const editPost = async (req: Request, res: Response) => {

  const id = Number(req.params.id);
  const selectPost = await Post.findOne(id)
  if (!selectPost) {
    return res.status(404).send({ message: 'post not found'});
  }

  if (req.body.userRole > 3 || selectPost.userId !== req.body.authUserId) {
    return res.status(403).send({ message: 'forbidden user'});
  }

  const { title, codeContent, textContent, secret, tagList } = req.body;
  if (!title || !codeContent || secret === undefined) {
    return res.status(422).send({ message: 'title, codeContent, secret value is null'});
  }

  await Post.update({ id }, { title, codeContent, textContent, secret });

  // 태그
  const deleteTagList = await Posttag.find({ postId: id });
  await Posttag.remove(deleteTagList);

  if (!tagList || !tagList.understanding || tagList.understanding.length === 0) {
    tagList.understanding = [{"id": "21", "name": "🙁", "category": "이해도"}];
  }

  const addTagList = Object.values(tagList);
  const list = [];
  addTagList.map((el: Object[]) => list.push(...el));
  
  const postId = id;
  const postTagList: Posttag[] = list.map((el: any) => {
    return Posttag.create({ postId, tagId: el.id })
  })
  await Posttag.save(postTagList);

  res.status(201).send({ message: 'editPost'});
}

const editUnderstandLevel = async (req: Request, res: Response) => {
  if (req.body.userRole > 4 ) {
    return res.status(403).send({ message: 'forbidden user'})
  }

  const { postId, understanding } = req.body;

  if (!postId || !understanding) {
    return res.status(422).send({ message: 'cannot find postId or tagId in body'});
  }

  const selectPost = await Post.findOne(postId, { select: ['userId']})
  if (!selectPost) {
    return res.status(404).send({ message: 'post not found'})
  }

  if (selectPost.userId !== req.body.authUserId) {
    return res.status(403).send({ message: 'forbidden user'});
  }

  const postUnderstandingTag = await Posttag.findOne({ postId, tagId: In([21, 22, 23]) })
  if (!postUnderstandingTag) {
    const tag = Posttag.create({ postId, tagId: understanding });
    await Posttag.save(tag);
  } else {
    Posttag.merge(postUnderstandingTag, { tagId: understanding })
    await Posttag.save(postUnderstandingTag);
  }

  res.status(201).send({ message: 'edit understand level'});
}

const deletePost = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const selectPost = await Post.findOne(id)

  if (!selectPost) {
    return res.status(404).send({ message: 'post not found'});
  }

  if (req.body.userRole !== 1 && selectPost.userId !== req.body.authUserId) {
    return res.status(403).send({ message: 'forbidden'});
  }

  const deleteTagList = await Posttag.find({ postId: id });
  await Posttag.remove(deleteTagList);
  await Post.remove(selectPost);

  res.status(200).send({ message: 'delete post successfully'});
}

const deletePostList = async (req: Request, res: Response) => {
  if (req.body.userRole > 3 ) {
    return res.status(403).send({ message: 'forbidden user'})
  }

  const postList = req.body.postList;
  let selectPostList;

  // TODO: count확인

  if (req.body.userRole !== 1) {
    selectPostList = await Post.findByIds(postList, { where: { userId: req.body.authUserId } })
  } else {
    selectPostList = await Post.findByIds(postList);
  }
  
  await Post.remove(selectPostList);
  res.status(200).send({ message: 'delete posts successfully'})
}

export {
  getPostList,
  getUserPostList,
  getPostById,
  addPost,
  editPost,
  editUnderstandLevel,
  deletePost,
  deletePostList
}