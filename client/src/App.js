import React, { useEffect } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import Signin from './components/basic/modal/Signin';
import Signup from './components/basic/modal/Signup';
import CodeInput from './pages/CodeInput';
import SideBar from './components/basic/navbar/SideBar';
import NavBar from './components/basic/navbar/NavBar'
import Tag from './components/basic/tag/Tag'
import BlackFooter from './components/basic/footer/BlackFooter'
import WhiteFooter from './components/basic/footer/WhiteFooter'
import CodeStorage from './pages/CodeStorage';
import CodeReview from './pages/CodeReview';


function App () {
  // Oauth authorizationCode 요청
  // TODO: 추후 클라이언트 내 다른 페이지로 리다이렉트 되도록 변경해야함
  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    if (authorizationCode) {
      console.log(authorizationCode);
      // getGithubAccessToken(authorizationCode);
      getGoogleAccessToken(authorizationCode);
    }
  });

  const getGithubAccessToken = async (authorizationCode) => {
    try {
      const serverUrl = 'http://localhost:4000/auth/github';
      const token = await axios.post(serverUrl, { authorizationCode });
      console.log(token.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getGoogleAccessToken = async (authorizationCode) => {
    try {
      const serverUrl = 'http://localhost:4000/auth/google';
      const token = await axios.post(serverUrl, { authorizationCode });
      console.log(token.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getKakaoAccessToken = async (authorizationCode) => {
    try {
      const serverUrl = 'http://localhost:4000/auth/kakao';
      const token = await axios.post(serverUrl, { authorizationCode });
    } catch (err) {
      throw new Error(err);
    }
  }

  return (
    <>
      <Switch>
        <Route exact path='/'>
          <Landing />
        </Route>
        <Route path='/login'>
          <Signin />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/codestorage'>
          <CodeStorage />
        </Route>
        <Route path='/codeinput'>
          <CodeInput />
        </Route>
        <Route path='/codereview'>
          <CodeReview />
        </Route>
      </Switch>
    </>
  );
}

export default App;
