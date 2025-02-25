//과제 4: fetch API를 사용하기 때문에 function을 async로 수정
document.addEventListener("DOMContentLoaded", async () => {
  //과제4: 서버에서 async하게 post 정보를 읽은 다음, 요청된 post id에 맞는 정보를 페이지 상 layout에 맞게 출력될 수 있도록 한다.
  const postBody = document.getElementById("posts-body");

  //과제4: url을 통해 특정 post의 id를 전달하도록 index.html에서 설정했음. 이를 활용해 서버에서 특정 게시글의 정보를 받아옴
  //URLSearchParams를 통해 url을 통해 전달될 특정 값을 key-value 단위로 만들어서 관리할 수 있음
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  try {
    const postResponse = await fetch("http://localhost:5000/posts");
    const commentResponse = await fetch("http://localhost:5000/comments");
    if (!postResponse.ok) {
      postBody.innerHTML = `<p>잘못된 접근입니다</p>`;
      return;
    }

    const posts = await postResponse.json();
    const post = posts.find((post) => post.postId == postId);
    const comments = await commentResponse.json();
    const postComments = comments.filter((comment) => comment.postId == postId);
    postBody.innerHTML =
      `<div class="author-post-card">
            <h2 class="post-title">${post.title}</h2>
            <div class="post-meta">
                <div class="author-profile"></div>
                <div class="author-name">${post.author}</div>
                <span class="post-date">${post.createdAt}</span>
                <div class="buttons">
                    <button id="modify-post">수정</button>
                    <button id="delete-post">삭제</button>
                </div>
            </div>
            <hr class="divider">
        </div>
        <div class="post-text">
            <img class="post-image" src="https://plus.unsplash.com/premium_photo-1701192799526-1a042fa6bdba?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
            <div class="post-text-meta">
                ${post.content}
            </div>
        </div>
        <div class="post-buttons">
            <div class="post-num-likes" id="like-button">
                <div id="num-likes">${post.likeCount}</div>
                <p>좋아요수</p>
            </div>
            <div class="post-num-views">
                <p>${post.viewCount}</p>
                <p>조회수</p>
            </div>
            <div class="post-num-comments">
                <p>${postComments.length}</p>
                <p>댓글</p>
            </div>
        </div>
        <hr class="divider">
        <div class="post-write-comment">
            <form action="">
               <div class="post-write-comment-body">
                    <textarea name="" id="post-write-comment-text" placeholder="댓글을 입력해주세요!"></textarea>
                    <button class="registerCommentButton" id="register-comment-button" disabled>댓글 등록</button>
               </div>
            </form>
        </div>
        <div id="comment-section">
        </div>
        ` + postBody.innerHTML;

    //post에 comment가 있는 경우
    if (postComments) {
      const commentSection = document.getElementById("comment-section");

      postComments.forEach((comment) => {
        console.log("id: " + comment.id);
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment-post-card");

        if(comment.author == 'wefsdf'){
          commentElement.innerHTML = `
          <div class="post-meta">
              <div class="author-profile"></div>
              <div class="author-name">${comment.author}</div>
              <span class="post-date">${new Date(
                comment.createdAt
              ).toLocaleString()}</span>
               <div class="buttons">
                    <button class="modify-comment" id="modify-comment">수정</button>
                    <button class="delete-comment" id="delete-comment" data-id="${comment.id}">삭제</button>
                </div>
          </div>
          <p class="post-card-text" id="postCardText">${comment.content}</p>`;

      commentSection.appendChild(commentElement);
        }
        else{
          commentElement.innerHTML = `
              <div class="post-meta">
                  <div class="author-profile"></div>
                  <div class="author-name">${comment.author}</div>
                  <span class="post-date">${new Date(
                    comment.createdAt
                  ).toLocaleString()}</span>
              </div>
              <p class="post-card-text" id="postCardText">${comment.content}</p>`;
  
          commentSection.appendChild(commentElement);
        }
      });

      //Modify comment EventHandler
  const modifyCommentBtn = document.getElementById("modify-comment");
  const postCardText = document.getElementById("postCardText").innerText;
  modifyCommentBtn.addEventListener("click", () => {
    commentText.value = postCardText;
    commentText.dispatchEvent(new Event("input"));
    registerCommentBtn.textContent = "댓글 수정";
  });

  //Delete comment EventHandler
  //과제 4 추가 : DELETE 요청을 통한 comment 삭제, 기존에는 getElementById를 통해 button을 가져왔지만 특정 유저가
  //댓글을 2개 이상 다는 경우, getElementById는 최우선으로 나오는 comment에만 작동하게 되므로 querySelector를 이용한
  //방식으로 교체. querySelector의 경우, class 이름을 기준으로 찾으므로 수정, 삭제 버튼에 클래스 이름 추가
  const commentModalOverlay = document.getElementById("commentModalOverlay");
  
  //model에서 삭제해야 할 댓글의 아이디를 기억하기 위해 사용하는 임시 변수.
  let commentModalId;
  
  console.log(document.querySelectorAll('.delete-comment'));
  document.querySelectorAll('.delete-comment').forEach(button => {
    button.addEventListener("click", (e) => {
      if(e.target.classList.contains("delete-comment")){
        e.preventDefault();
        let commentId = button.getAttribute('data-id');
        commentModalId = commentId;
        commentModalOverlay.style.display = "flex";
        document.body.style.overflow = "hidden";
      }
    });
  })

  
  const commentCancelButton = document.getElementById("commentCancelButton");
  const commentConfirmButton = document.getElementById("commentConfirmButton");

  commentCancelButton.addEventListener("click", () => {
    commentModalOverlay.style.display = "none";
    document.body.style.overflow = "auto";
  });

  commentConfirmButton.addEventListener("click", async(e) => {
    e.preventDefault();
    const deleteCommentResponse = await fetch(`http://localhost:5000/comments/${commentModalId}`, {
      method: "DELETE"
    });

    if (!deleteCommentResponse.ok) {
      alert("댓글 삭제에 실패했습니다.");
      return;
    }
    commentModalOverlay.style.display = "none";
    document.body.style.overflow = "auto";
    window.location.reload();
  });
    }
  } catch (error) {}



  //Like EventHandler
  const likeButton = document.getElementById("like-button");
  likeButton.addEventListener("click", () => {
    const numLikes = document.getElementById("num-likes");
    const element = document.getElementsByClassName("post-num-likes")[0];
    const style = getComputedStyle(element);
    const bgColor = style["background-color"];

    if (rgbToHex(bgColor) == "#d9d9d9") {
      element.style.backgroundColor = "#ACA0EB";
      console.log(numLikes.innerText);
      numLikes.innerText = Number(numLikes.innerText) + 1;
    } else if (rgbToHex(bgColor) == "#aca0eb") {
      element.style.backgroundColor = "#d9d9d9";
      numLikes.innerText = Number(numLikes.innerText) - 1;
    }
  });

  //CommentText Change EventHandler
  const registerCommentBtn = document.getElementById("register-comment-button");
  const commentText = document.getElementById("post-write-comment-text");
  commentText.addEventListener("input", () => {
    const content = commentText.value.trim();

    if (content.length == 0) {
      registerCommentBtn.disabled = true;
      registerCommentBtn.style.backgroundColor = "#aca0eb";
    } else {
      registerCommentBtn.disabled = false;
      registerCommentBtn.style.backgroundColor = "#7f6aee";
    }
  });

  //header profile icon handelr
  const dropdown = document.getElementById("dropdown");
  const profileIcon = document.getElementById("profile-icon");

  profileIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("show");
  });

  window.addEventListener("click", () => {
    dropdown.classList.remove("show");
  });

  //Modify post EventHandler
  const modifyPostBtn = document.getElementById("modify-post");
  modifyPostBtn.addEventListener("click", () => {
    window.location.href = `editPost.html?id=${postId}`;
  });

  //Delete post button Eventhandler
  const deletePostBtn = document.getElementById("delete-post");
  const postModalOverlay = document.getElementById("postModalOverlay");
  deletePostBtn.addEventListener("click", (e) => {
    e.preventDefault();
    postModalOverlay.style.display = "flex";
    document.body.style.overflow = "hidden";
  });

  //Comment Button Click EventHandler
  registerCommentBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    if (registerCommentBtn.textContent === "댓글 수정") {
      document.getElementById("postCardText").innerHTML = commentText.value;
      registerCommentBtn.textContent = "댓글 등록";
    }

    //과제4: 특정 포스트에 댓글 추가하기
    const response = await fetch(`http://localhost:5000/posts`);

    if (!response.ok) {
      postBody.innerHTML = `<p>잘못된 접근입니다</p>`;
      return;
    }

    const newComment = {
      postId: postId,
      author: "wefsdf",
      createdAt: new Date().toISOString(),
      content: commentText.value,
    };

    try {
      const createCommentResponse = await fetch(
        `http://localhost:5000/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        }
      );

      if (!createCommentResponse.ok) {
        throw new Error("댓글 작성에 실패했습니다.");
      }

      alert("댓글이 성공적으로 작성되었습니다!");

      commentText.value = "";
      commentText.dispatchEvent(new Event("input"));

      window.location.href = `post.html?id=${postId}`;
    } catch (error) {
      console.error("댓글 작성 중 오류 발생:", error);
    }
  });

  //post modal EventHandler
  const postCancelButton = document.getElementById("postCancelButton");
  const postConfirmButton = document.getElementById("postConfirmButton");

  postCancelButton.addEventListener("click", () => {
    postModalOverlay.style.display = "none";
    document.body.style.overflow = "auto";
  });

  //과제 4 추가: DELETE 요청을 통해 게시글 삭제 버튼 클릭시 게시글을 목록에서 삭제 후 index.html에 반영
  postConfirmButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/posts");
    if (!response.ok) {
        throw new Error("게시글 데이터를 불러오는 데 실패했습니다.");
    }
    const posts = await response.json();
    const post = posts.find(p => p.postId == postId);
    if (!post) {
        alert("게시글을 찾을 수 없습니다.");
        return;
    }

    const deleteResponse = await fetch(`http://localhost:5000/posts/${post.id}`, {
        method: "DELETE"
    });

    if (!deleteResponse.ok) {
        throw new Error("게시글 삭제 실패");
    }

    alert("게시글이 삭제되었습니다.");

    postModalOverlay.style.display = "none";
    document.body.style.overflow = "auto";
    window.location.href = 'index.html';
  });
});

function rgbToHex(rgb) {
  const rgbValues = rgb.match(/\d+/g).map(Number);
  return `#${rgbValues.map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}
