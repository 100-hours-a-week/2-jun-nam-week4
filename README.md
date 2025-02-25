# KTB 2 - Week 4. Community FE - JS event listener 추가 
Week4의 Week3의 과제를 개선해 event listener의 추가를 통해 실제 유저의 동작에 대해 커뮤니티 웹이 실행될 수 있도록 구현을 진행했습니다. 

과제 주제: Week3의 과제를 개선,  event listener의 추가
개발 환경: Windows 10, Vs Code, HTML, CSS, Vanilla JS 
<br>
<br>

# 프로그램 계층도
📦 assignment
<br>
┣ 📂 css 
<br>
┃ ┣ 📜 createPost.css 
<br>
┃ ┣ 📜 editPassword.css
<br>
┃ ┣ 📜 editPost.css 
<br>
┃ ┣ 📜 editProfile.css 
<br>
┃ ┣ 📜 index.css 
<br>
┃ ┣ 📜 login.css 
<br>
┃ ┣ 📜 post.css 
<br>
┃ ┗ 📜 signUp.css 
<br>
┃
<br>
┣ 📂 js 
<br>
┃ ┣ 📜 createPost.js 
<br>
┃ ┣ 📜 editPassword.js 
<br>
┃ ┣ 📜 editPost.js 
<br>
┃ ┣ 📜 editProfile.js 
<br>
┃ ┣ 📜 index.js 
<br>
┃ ┣ 📜 login.js 
<br>
┃ ┣ 📜 post.js 
<br>
┃ ┗ 📜 signUp.js 
<br>
┃
<br>
┣ 📂 html 
<br>
┃ ┣ 📜 createPost.html 
<br>
┃ ┣ 📜 editPassword.html 
<br>
┃ ┣ 📜 editPost.html 
<br>
┃ ┣ 📜 editProfile.html 
<br>
┃ ┣ 📜 index.html
<br>
┃ ┣ 📜 login.html 
<br>
┃ ┣ 📜 post.html 
<br>
┃ ┗ 📜 signUp.html 
<br>
┃
<br>
┗ 📜 README.md
<br>
┗ 📜 db.json
<br>

<br>
<br>

# 프로젝트 유의사항
  1. 해당 프로젝트의 github 주소에서 clone을 통해 로컬 환경으로 복사를 진행합니다.
  2. 구현이 npm의 json-server 패키지를 활용한 로컬 서버 기반으로 구현이 진행되어 있습니다. 따라서, 과제 실행에 앞서 npm의 설치와 npm을 통해 clone을 진행한 로컬 디렉토리에 `npm i -g json-server`를 통해 json-server 패키지 설치를 진행합니다. 
  3. clone을 진행한 로컬 디렉토리에서 bash창을 통해 `json-server ./db.json --port 5000` 명령을 실행합니다.
  4. 과제가 정상적으로 실행되는지 확인합니다.
  5. 해당 과제의 경우, session을 통해 로그인 후 유저 정보를 유지하고 있지 않기 때문에 특정 기능의 경우 유저의 이메일이 `ddd@test.com`인 상황이라는 가정 하에 작동을 실행하고 있습니다. 
  6. 데이터의 경우, assignment 폴더에 있는 db.json 파일에 users, posts, comments에 저장됩니다.

# 프로그램 실행 화면 흐름
<br>

1. 로그인 화면 
  
  ![Image](https://github.com/user-attachments/assets/3bacf935-0555-4f3b-8d9e-a903ee886a7f)
  <br>

  - 로그인 - 이메일 에러
  <br>

  ![Image](https://github.com/user-attachments/assets/b87c8ece-8057-4d0e-b5a6-fa13bc746d9f)
  <br>

  - 로그인 - 비밀번호 에러
    ![Image](https://github.com/user-attachments/assets/a1593352-e884-4baa-8f44-a541eba46fe2)
  <br>

  - 로그인 - 비밀번호 에러 2
  ![Image](https://github.com/user-attachments/assets/85751447-f4dc-4c57-bd25-3597e62c7f71)
<br>

2. 회원가입 화면 
![Image](https://github.com/user-attachments/assets/236ac90e-73ee-473f-9a59-f8dd76388b11)

<br>

  - 회원가입 - 이메일 에러
  <br>
  
![Image](https://github.com/user-attachments/assets/e311fb3e-28a8-4667-b015-c9efb4c5f9a4)
<br>

  - 회원가입 - 비밀번호 에러
   <br>

   ![Image](https://github.com/user-attachments/assets/3770f2a2-c26a-499b-91b7-cc12ac3ecef6) 비밀번호 에러
  <br>

  - 회원가입 - 비밀번호 에러2
   <br>

   ![Image](https://github.com/user-attachments/assets/03949bda-5c41-4306-8d2c-a4209a9ebcff)
  <br>

  - 회원가입 - 비밀번호확인 에러
   <br>

   ![Image](https://github.com/user-attachments/assets/e6d05291-57f4-4401-a633-5e6ad32ca82c)
  <br>

  - 회원가입 - 유효성 통과
   <br>

   ![Image](https://github.com/user-attachments/assets/b9951280-c130-4402-ab95-709956185136)
  <br>

3. 게시글 조회
<br>

![Image](https://github.com/user-attachments/assets/f251acc3-179f-44c1-939d-ebdc747049b4)
<br>

4. 게시글 상세조회
<br>

![Image](https://github.com/user-attachments/assets/324dfbb2-195b-4f08-ab74-8b68f0ab5496) 
<br>

  - 게시글 상세조회 - 댓글 삭제
  <br>

  ![Image](https://github.com/user-attachments/assets/aedcb8fa-b238-42ae-98c4-8af3d202faa6) 
  <br>

  - 게시글 상세조회 - 댓글 등록
  <br>

  ![Image](https://github.com/user-attachments/assets/d75fa9e2-dbff-4565-8a58-09265a8da83e)
  <br>

  - 게시글 상세조회 - 게시글 삭제
  <br>

  ![Image](https://github.com/user-attachments/assets/9b0448aa-002a-436a-9fa5-5d2a38a8a135)
  <br>

5. 게시글 수정
<br>

![Image](https://github.com/user-attachments/assets/fa4b510e-4a24-4212-a93a-11fc2f38bbfb)
<br>

6. 회원정보 수정
<br>

![Image](https://github.com/user-attachments/assets/4497d396-dd14-4b1e-9796-9e08c023c0ec)
<br>
  
  - 회원탈퇴 버튼
  <br>

  ![Image](https://github.com/user-attachments/assets/54baed80-fe98-4f7f-8dfe-cc03eb159b67)
  <br>

7. 비밀번호 수정
<br>

![Image](https://github.com/user-attachments/assets/263d2bff-5720-4191-ac03-c80815ac21a4)
<br>