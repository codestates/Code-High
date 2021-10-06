import React from 'react';
import WhiteFooter from '../components/basic/footer/WhiteFooter';
import PostComment from '../components/CodePost/PostComment';
import PostMain from '../components/CodePost/PostMainView';
import PostTagSet from '../components/CodePost/PostTagSet';
import PostTitle from '../components/CodePost/PostTitle';

const CodePost = () => {
  return (
    <>
      <PostTagSet />
      <PostTitle />
      <PostMain />
      <PostComment />
      <WhiteFooter />
    </>
  );
};

export default CodePost;
