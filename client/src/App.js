import React, { useEffect, Suspense, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  githubSigninUser,
  kakaoSigninUser,
  googleSigninUser,
} from './redux/actions/userActions';
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
import UnauthorizedError from './components/basic/error/UnauthorizedError';
import Loading from './components/basic/loading/Loading';
import NavBar from './components/basic/navbar/NavBar';
import AdminGraph from './pages/AdminGraph';
import AdminTable from './pages/AdiminTable';
import CodeEdit from './pages/CodeEdit';
import NoticeForSignup from './components/basic/error/NoticeForSignup';
import FindingPassword from './components/basic/modal/FindingPassword';
import ResetPassword from './components/basic/modal/ResetPassword';

const serverUrl = 'https://api.codehigh.club';

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.userReducer);
  const { userInfo } = state;

  useEffect(() => {
    const url = new URL(window.location.href);
    const loginType = url.searchParams.get('login');
    const authorizationCode = url.searchParams.get('code');
    if (authorizationCode) {
      console.log('authorizationCode', authorizationCode);
      console.log('loginType', loginType);

      if (loginType === 'github') {
        getGithubAccessToken(authorizationCode);
      } else if (loginType === 'kakao') {
        getKakaoAccessToken(authorizationCode);
      } else if (loginType === 'google') {
        getGoogleAccessToken(authorizationCode);
      }
    }
  }, []);

  const getGithubAccessToken = (authorizationCode) => {
    dispatch(githubSigninUser(authorizationCode));
  };

  const getKakaoAccessToken = (authorizationCode) => {
    dispatch(kakaoSigninUser(authorizationCode));
  };

  const getGoogleAccessToken = (authorizationCode) => {
    dispatch(googleSigninUser(authorizationCode));
  };

  const Landing = React.lazy(
    () =>
      new Promise((resolve, reject) =>
        setTimeout(() => resolve(import('./pages/Landing')), 1000)
      )
  );
  const CodeStorage = React.lazy(
    () =>
      new Promise((resolve, reject) =>
        setTimeout(() => resolve(import('./pages/CodeStorage')), 1000)
      )
  );
  const CodeReview = React.lazy(
    () =>
      new Promise((resolve, reject) =>
        setTimeout(() => resolve(import('./pages/CodeReview')), 1000)
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
          <Route path='/findingpassword'>
            <FindingPassword />
          </Route>
          <Route path='/resetpassword'>
            <ResetPassword />
          </Route>
          <Route path='/codestorage'>
            <CodeStorage />
          </Route>
          <Route path='/codeinput'>
            <CodeInput />
          </Route>
          <Route path='/codeedit'>
            <CodeEdit />
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
          <Route path='/unauthorized'>
            <UnauthorizedError />
          </Route>
          <Route path='/noticeforsignup'>
            <NoticeForSignup />
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
          <Route path='/admingraph'>
            <AdminGraph />
          </Route>
          <Route path='/admintable'>
            <AdminTable />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
