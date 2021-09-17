import React from 'react';
import WhiteFooter from '../components/basic/footer/WhiteFooter';
import NavBar from '../components/basic/navbar/NavBar';
import PostComment from '../components/CodePost/PostComment';
import PostMain from '../components/CodePost/PostMainView';

const CodePost = () => {
    return (
        <>
        <NavBar/>
        <PostMain/>
        <PostComment/>
        <WhiteFooter/>
        </>
    );
};

export default CodePost;