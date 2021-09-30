import React from 'react';
import { useSelector } from 'react-redux';
// import showdown from 'showdown';
// import MarkdownView from 'react-showdown';
import MDEditor from '@uiw/react-md-editor';

const PostMain = () => {
  const userState = useSelector((state) => state.userReducer);
  const { userInfo } = userState;
  const postState = useSelector((state) => state.codePostReducer);
  const { codePost } = postState;

  //!showdown
  // const converter = new showdown.Converter();
  // const changeCode = `${codePost.codeContent}`;
  // const html = converter.makeHtml(`${changeCode}`);

  //!markdown
  // const markdown = `
  // # Welcome to React Showdown :+1:
  // <h1>sss</h1>
  // To get started, edit the markdown in \`example/src/App.tsx\`.

  // | Column 1 | Column 2 |
  // |----------|----------|
  // | A1       | B1       |
  // | A2       | B2       |

  // <code>jsconst hello</code>
  // `;

  console.log(codePost)

  return (
    <div className='codepostmain'>
      <div className='codepostview-container'>
        {/* <span className='codepostview-code' dangerouslySetInnerHTML={{ __html: html }}/> */}
        {/* <MarkdownView className='codepostview-code' markdown={changeCode} options={{ tables: true, emoji: true }}/> */}
        {/* <MarkdownView
          markdown={markdown}
          options={{ tables: true, emoji: true }}
        /> */}
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
