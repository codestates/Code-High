import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing';
import SignIn from './components/basic/modal/SignIn';
import Signup from './components/basic/modal/Signup';

import CodeInput from './pages/CodeInput';
import CodeReview from './pages/CodeReview';
import CodeStorage from './pages/CodeStorage';

function App() {
  return (
    <>
      <Landing />

      <Switch>
        <Route exact path='/'>
          <Landing/>
        </Route>
        <Route path='/login'>
          <SignIn/>
        </Route>
        <Route path='/signup'>
          <Signup/>
        </Route>
        <Route path='/codestorage'>
          <CodeStorage/>
        </Route>
        <Route path='/codeinput'>
          <CodeInput/>
        </Route>
        <Route path='/codereview'>
          <CodeReview/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
