import React from 'react';
import Kanban from '../components/codeStorage/Kanban';
import WhiteFooter from '../components/basic/footer/WhiteFooter';
import NavBar from '../components/basic/navbar/NavBar'

function CodeStorage(){
  
  return (
    <>
      <NavBar />
      <Kanban />
      <WhiteFooter />
    </>
  );
};

export default CodeStorage;