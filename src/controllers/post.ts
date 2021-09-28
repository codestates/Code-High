import { Request, Response } from 'express';
import { getConnection, getManager, getRepository, Tree } from 'typeorm';
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
    .getRawMany();

    res.status(200).send({ postList: result });
  }

}

const getUserPostList = async (req: Request, res: Response) => {
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
  .getRawMany()

  res.status(200).send({ postList: result});
}

const getPostById = async (req: Request, res: Response) => {

  const result = await Post.createQueryBuilder('post')
  .select(['post', 'user.name', 'postTag.tagId', 'tag.name', 'tag.category'])
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

  result['userName'] = result.user.name;
  delete result.user;

  res.status(200).send({ post: result });
}

const addPost = async (req: Request, res: Response) => {
  const { title, codeContent, textContent, tagList } = req.body
  const secret = req.body.secret || true;

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
    req.body.tagList.understanding = [{"id": "21", "name": "🙁", "category": "이해도"}];
  }
  
  const addTagList = Object.values(req.body.tagList);
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

  if (selectPost.userId !== req.body.authUserId) {
    return res.status(403).send({ message: 'forbidden'});
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
    req.body.tagList.understanding = [{"id": "21", "name": "🙁", "category": "이해도"}];
  }

  const addTagList = Object.values(req.body.tagList);
  const list = [];
  addTagList.map((el: Object[]) => list.push(...el));
  
  const postId = id;
  const postTagList: Posttag[] = list.map((el: any) => {
    return Posttag.create({ postId, tagId: el.id })
  })
  await Posttag.save(postTagList);

  res.status(201).send({ message: 'editPost'});
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
  deletePost,
  deletePostList
}