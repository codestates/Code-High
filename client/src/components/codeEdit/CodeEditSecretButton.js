import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { getCodepost } from '../../redux/actions/codePostActions';

import Button from '../basic/button/Button';

axios.defaults.withCredentials = true;
const serverUrl = 'https://api.codehigh.club';

function CodeEditSecretButton({ codeEditInfo, setCodeEditInfo }) {
  const state = useSelector((state) => state.userReducer);
  const { userInfo } = state;
  const postState = useSelector((state) => state.codePostReducer);
  const { codePost } = postState;

  const [isChecked, setIsChecked] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isChecked[0] === 'check') {
      setCodeEditInfo({ ...codeEditInfo, secret: false });
    } else if (isChecked.length === 0) {
      setCodeEditInfo({ ...codeEditInfo, secret: true });
    }
  }, [isChecked]);

  const changeHandle = (checked, id) => {
    if (checked) {
      setIsChecked([...isChecked, id]);
    } else {
      setIsChecked(isChecked.filter((el) => el !== id));
    }
  };

  const handleSaveButton = () => {
    const { accessToken } = userInfo;
    const { title, postTags, codeContent, textContent, secret } = codeEditInfo;
    const codeEdit = {
      title: title,
      secret: secret,
      codeContent: codeContent,
      tagList: postTags,
      textContent: textContent,
    };

    axios
      .patch(`${serverUrl}/post/${codePost.id}`, codeEdit, {
        headers: {
          Authorization: `bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          const data = {
            postId: codePost.id,
            accessToken: userInfo.accessToken,
          };
          dispatch(getCodepost(data));
          setTimeout(() => {
            history.push('/post');
          }, 1000);
        }
      });
  };

  const handleCancelButton = () => {
    window.history.back();
  };

  return (
    <div className='codeinputsecretbutton'>
      <div className='codeinputsecretbutton-container'>
        <div className='codeinputsecretbutton-checkbox'>
          {codePost.secret === false ? (
            <input
              type='checkbox'
              onChange={(e) => changeHandle(e.currentTarget.checked, 'check')}
              defaultChecked
            />
          ) : (
            <input
              type='checkbox'
              onChange={(e) => changeHandle(e.currentTarget.checked, 'check')}
            />
          )}
          <span>?????? ?????? ??????</span>
        </div>
        <div className='codeinputsecretbutton-button'>
          <Button
            content='SAVE'
            backgroundColor='#2F8C4C'
            color='#fff'
            onClickHandle={handleSaveButton}
          />
          <Button
            content='CANCEL'
            backgroundColor='#E1E1E1'
            color='#fff'
            onClickHandle={handleCancelButton}
          />
        </div>
      </div>
    </div>
  );
}

export default CodeEditSecretButton;
