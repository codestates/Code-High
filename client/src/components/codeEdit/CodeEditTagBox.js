import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Tag from '../basic/tag/Tag';

import tagNameData from './TagNameData';

function CodeEditTagBox({ codeEditInfo, setCodeEditInfo }) {
  const postState = useSelector((state) => state.codePostReducer);
  const { codePost } = postState;

  const [choiceTag, setChoiceTag] = useState({
    algorithm: codePost.postTags.algorithm,
    language: codePost.postTags.language,
    platform: codePost.postTags.platform,
    difficulty: codePost.postTags.difficulty,
    understanding: codePost.postTags.understanding,
  });

  useEffect(() => {
    let taglist = [
      ...codePost.postTags.algorithm,
      ...codePost.postTags.language,
      ...codePost.postTags.platform,
      ...codePost.postTags.difficulty,
      ...codePost.postTags.understanding,
    ];
    let taglistId = taglist.map((ele) => ele.id - 1);
    taglistId.map((ele) => {
      let tag = document.querySelectorAll('div.tag-button');
      tag[ele].style.backgroundColor = '#2F8C4C';
    });
  }, []);

  useEffect(() => {
    setCodeEditInfo({ ...codeEditInfo, postTags: choiceTag });
  }, [choiceTag]);

  const handleChangeColor = (e) => {
    const currentTagName = e.target.innerHTML;
    const currentTag = tagNameData.filter((ele) => ele.name === currentTagName);

    if (currentTag[0].category === 'algorithm') {
      const algorithmFillterTag = choiceTag.algorithm.filter(
        (ele) => ele.name === currentTagName
      );
      const algorithmRemoveTag = choiceTag.algorithm.filter(
        (ele) => ele.name !== currentTagName
      );
      if (choiceTag.algorithm.length === 0) {
        setChoiceTag({ ...choiceTag, algorithm: [...currentTag] });
        e.target.style.backgroundColor = '#2F8C4C';
      } else if (algorithmFillterTag.length === 0) {
        setChoiceTag({
          ...choiceTag,
          algorithm: [...choiceTag.algorithm, ...currentTag],
        });
        e.target.style.backgroundColor = '#2F8C4C';
      } else if (algorithmFillterTag.length !== 0) {
        setChoiceTag({
          ...choiceTag,
          algorithm: [...algorithmRemoveTag],
        });
        e.target.style.backgroundColor = '#E1E1E1';
      }
    } else if (currentTag[0].category === 'language') {
      if (choiceTag.language.length === 0) {
        setChoiceTag({ ...choiceTag, language: [...currentTag] });
        e.target.style.backgroundColor = '#2F8C4C';
      } else if (choiceTag.language.length === 1) {
        const languageButton = document.querySelectorAll(
          'div.tag-button.language'
        );
        const arr = [...languageButton];
        arr.map((ele) => {
          ele.style.backgroundColor = '#E1E1E1';
        });
        setChoiceTag({ ...choiceTag, language: [...currentTag] });
        e.target.style.backgroundColor = '#2F8C4C';
      }
    } else if (currentTag[0].category === 'platform') {
      if (choiceTag.platform.length === 0) {
        setChoiceTag({ ...choiceTag, platform: [...currentTag] });
        e.target.style.backgroundColor = '#2F8C4C';
      } else if (choiceTag.platform.length === 1) {
        const platformButton = document.querySelectorAll(
          'div.tag-button.platform'
        );
        const arr = [...platformButton];
        arr.map((ele) => {
          ele.style.backgroundColor = '#E1E1E1';
        });
        setChoiceTag({ ...choiceTag, platform: [...currentTag] });
        e.target.style.backgroundColor = '#2F8C4C';
      }
    } else if (currentTag[0].category === 'difficulty') {
      if (choiceTag.difficulty.length === 0) {
        setChoiceTag({ ...choiceTag, difficulty: [...currentTag] });
        e.target.style.backgroundColor = '#2F8C4C';
      } else if (choiceTag.difficulty.length === 1) {
        const difficultyButton = document.querySelectorAll(
          'div.tag-button.difficulty'
        );
        const arr = [...difficultyButton];
        arr.map((ele) => {
          ele.style.backgroundColor = '#E1E1E1';
        });
        setChoiceTag({ ...choiceTag, difficulty: [...currentTag] });
        e.target.style.backgroundColor = '#2F8C4C';
      }
    } else if (currentTag[0].category === 'understanding') {
      if (choiceTag.understanding.length === 0) {
        setChoiceTag({ ...choiceTag, understanding: [...currentTag] });
        e.target.style.backgroundColor = '#2F8C4C';
      } else if (choiceTag.understanding.length === 1) {
        const understandingButton = document.querySelectorAll(
          'div.tag-button.understanding'
        );
        const arr = [...understandingButton];
        arr.map((ele) => {
          ele.style.backgroundColor = '#E1E1E1';
        });
        setChoiceTag({ ...choiceTag, understanding: [...currentTag] });
        e.target.style.backgroundColor = '#2F8C4C';
      }
    }
  };

  return (
    <div className='codeinputtagbox'>
      <div className='codeinputtagbox-container'>
        <div className='codeinputtagbox-tagbox'>
          <span>????????????</span>
          <div>
            {tagNameData.map((item, index) => {
              if (item.category === 'algorithm') {
                return (
                  <Tag
                    className={`algorithm`}
                    key={index}
                    content={item.name}
                    backgroundColor='#E1E1E1'
                    onClickHandle={handleChangeColor}
                    id={item.id}
                  />
                );
              }
            })}
          </div>
        </div>
        <div className='codeinputtagbox-tagbox'>
          <span>??????</span>
          <div>
            {tagNameData.map((item, index) => {
              if (item.category === 'language') {
                return (
                  <Tag
                    className='language'
                    key={index}
                    content={item.name}
                    backgroundColor='#E1E1E1'
                    onClickHandle={handleChangeColor}
                    id={item.id}
                  />
                );
              }
            })}
          </div>
        </div>
        <div className='codeinputtagbox-tagbox'>
          <span>?????????</span>
          <div>
            {tagNameData.map((item, index) => {
              if (item.category === 'platform') {
                return (
                  <Tag
                    className='platform'
                    key={index}
                    content={item.name}
                    backgroundColor='#E1E1E1'
                    onClickHandle={handleChangeColor}
                    id={item.id}
                  />
                );
              }
            })}
          </div>
        </div>
        <div className='codeinputtagbox-tagbox'>
          <span>?????????</span>
          <div>
            {tagNameData.map((item, index) => {
              if (item.category === 'difficulty') {
                return (
                  <Tag
                    className='difficulty'
                    key={index}
                    content={item.name}
                    backgroundColor='#E1E1E1'
                    onClickHandle={handleChangeColor}
                    id={item.id}
                  />
                );
              }
            })}
          </div>
        </div>
        <div className='codeinputtagbox-tagbox'>
          <span>?????????</span>
          <div>
            {tagNameData.map((item, index) => {
              if (item.category === 'understanding') {
                return (
                  <Tag
                    className='understanding'
                    key={index}
                    content={item.name}
                    backgroundColor='#E1E1E1'
                    onClickHandle={handleChangeColor}
                    id={item.id}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeEditTagBox;
