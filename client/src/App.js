import React, { useEffect, Suspense } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import SignIn from './components/basic/modal/SignIn';
import Signup from './components/basic/modal/Signup';
import CodeInput from './pages/CodeInput';
import CodeStorage from './pages/CodeStorage';
import CodeReview from './pages/CodeReview';
import Mypage from './pages/Mypage';
import CodePost from './pages/CodePost';
import NotFoundError from './components/basic/error/NotFoundError';
import Loading from './components/basic/loading/Loading';
import NavBar from './components/basic/navbar/NavBar';

function App() {
  // Oauth authorizationCode 요청
  // TODO: 추후 클라이언트 내 다른 페이지로 리다이렉트 되도록 변경해야함
  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    if (authorizationCode) {
      console.log(authorizationCode);
      // getGithubAccessToken(authorizationCode);
      // getKakaoAccessToken(authorizationCode);
      // getGoogleAccessToken(authorizationCode);
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

  const getKakaoAccessToken = async (authorizationCode) => {
    try {
      const serverUrl = 'http://localhost:4000/auth/kakao';
      const token = await axios.post(serverUrl, { authorizationCode });
    } catch (err) {
      throw new Error(err);
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

  const Landing = React.lazy(
    () =>
      new Promise((resolve, reject) =>
        setTimeout(() => resolve(import('./pages/Landing')), 1000)
      )
  );

  return (
    <>
      <Suspense fallback={<Loading />}>
        <NavBar />
        <Switch>
          <Route exact path='/'>
            <Landing />
          </Route>
          <Route path='/login'>
            <SignIn />
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
          <Route path='/post'>
            <CodePost />
          </Route>
          <Route path='/mypage'>
            <Mypage />
          </Route>
          <Route path='/notfound'>
            <NotFoundError />
          </Route>
          <Route path='/loading'>
            <Loading />
          </Route>
          <Route path='/github'>
            <Loading />
          </Route>
          <Route path='/kakao'>
            <Loading />
          </Route>
          <Route path='/google'>
            <Loading />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
