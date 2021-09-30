import React from 'react';
import { useSelector } from 'react-redux';
import MDEditor from '@uiw/react-md-editor';

const PostMain = () => {
  const userState = useSelector((state) => state.userReducer);
  const { userInfo } = userState;
  const postState = useSelector((state) => state.codePostReducer);
  const { codePost } = postState;

  console.log(codePost)

  return (
    <div className='codepostmain'>
      <div className='codepostview-container'>
        <span className='codepostview-code'>
        <MDEditor.Markdown
          source={`${codePost.codeContent}`}
          previewOptions={{
            components: {
              code: ({ inline, children, className, ...props }) => {
                const txt = children[0] || '';
                if (inline) {
                  if (typeof txt === 'string' && /^\$\$(.*)\$\$/.test(txt)) {
                    const html = katex.renderToString(
                      txt.replace(/^\$\$(.*)\$\$/, '$1'),
                      {
                        throwOnError: false,
                      }
                    );
                    return <code dangerouslySetInnerHTML={{ __html: html }} />;
                  }
                  return <code>{txt}</code>;
                }
                if (
                  typeof txt === 'string' &&
                  typeof className === 'string' &&
                  /^language-katex/.test(className.toLocaleLowerCase())
                ) {
                  const html = katex.renderToString(txt, {
                    throwOnError: false,
                  });
                  return <code dangerouslySetInnerHTML={{ __html: html }} />;
                }
                return <code className={String(className)}>{txt}</code>;
              },
            },
          }}
        />
        </span>
        <span className='codepostview-text'>{codePost.textContent}</span>
      </div>
    </div>
  );
};

export default PostMain;
