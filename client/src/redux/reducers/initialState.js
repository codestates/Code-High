export const initialState = {
  User: [
    {
      id: 1,
      name: 'kimcoding',
      phone: '010-0000-0000',
      email: 'kimcoding@gmail.com',
      image:
        'https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbftRiB%2FbtqAjaghSBk%2F5CcN9W5qyCU8HLylVYcXb1%2Fimg.png',
      loginType: 'email',
      authorityId: 3,
      createdAt: '2021.09.17',
      updatedAt: '2021.09.17',
    },
  ],
  Menu: [
    {
      id: 1,
      authorityId: 3,
      name: ['코드저장소', '코드 리뷰', '마이페이지'],
      url: ['/codestoreage', '/codereview', '/mypage'],
    },
  ],
  Post: [
    {
      id: 1,
      title: '알고리즘1', // 제목
      textContent: 'Hello World', // 텍스트 내용
      codeContent: 'Hello World', // 코드 내용
      secret: 'true', // 비밀글 여부
      userId: '1', // 작성자 id
      userName: 'kimcoding', // 작성자 이름
      createdAt: Date, // 작성일
      updatedAt: Date, // 수정일
      tagList: ['Heap', 'Programmers', '⭐️⭐️⭐️⭐️⭐️', '😐'], // 글에 선택된 태그 목록
      commentList: [], // 글 댓글 목록
    },
  ],
  Tag: [
    {
      id: '1',
      name: 'Heap', // 태그 이름
      category: '알고리즘', // 태그에 해당하는 카테고리 이름? 아이디? -> 어떤게 편하신가요
    },
    {
      id: '1',
      name: 'Programmers', // 태그 이름
      category: '플랫폼', // 태그에 해당하는 카테고리 이름? 아이디? -> 어떤게 편하신가요
    },
    {
      id: '1',
      name: '⭐️⭐️⭐️⭐️⭐️', // 태그 이름
      category: '난이도', // 태그에 해당하는 카테고리 이름? 아이디? -> 어떤게 편하신가요
    },
    {
      id: '1',
      name: '😐', // 태그 이름
      category: '이해도', // 태그에 해당하는 카테고리 이름? 아이디? -> 어떤게 편하신가요
    },
  ],
  Comment: [
    {
      id: 1,
      content: 'for문을 사용해보는건 어떨까요?',
      userId: '2',
      userName: 'jeoncookie',
      postId: '1',
      createdAt: Date,
      updatedAt: Date,
    },
  ],
};
