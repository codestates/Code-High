import React, { useEffect, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { githubSigninUser, kakaoSigninUser, googleSigninUser } from './redux/actions/userActions';
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
  const dispatch = useDispatch();

  useEffect(() => {
    const url = new URL(window.location.href);
    const loginType = url.searchParams.get('login');
    const authorizationCode = url.searchParams.get('code');
    if (authorizationCode) {
      console.log('authorizationCode',authorizationCode);
      console.log('loginType',loginType);

      if (loginType === 'github') {
        getGithubAccessToken(authorizationCode);
      } else if (loginType === 'kakao') {
        getKakaoAccessToken(authorizationCode);
      } else if (loginType === 'google') {
        getGoogleAccessToken(authorizationCode);
      }
    }
  },[]);

  const getGithubAccessToken = (authorizationCode) => {
      dispatch(githubSigninUser(authorizationCode))
  };

  const getKakaoAccessToken = (authorizationCode) => {
      dispatch(kakaoSigninUser(authorizationCode))
  };

  const getGoogleAccessToken =  (authorizationCode) => {
      dispatch(googleSigninUser(authorizationCode))
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
