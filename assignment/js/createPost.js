document.addEventListener('DOMContentLoaded', () => {
    //header profile icon handelr
    const dropdown = document.getElementById("dropdown");
    const profileIcon = document.getElementById("profile-icon")
    const createBtn = document.getElementById('create-post-button');
    const postTitle = document.getElementById('create-post-form-title');
    const postInput = document.getElementById('create-post-body-text-input');
    const createForm = document.getElementById('create-post-form');

     profileIcon.addEventListener('click', (e) => {
         e.stopPropagation();
         dropdown.classList.toggle('show');
     })

     window.addEventListener('click', () => {
         dropdown.classList.remove('show');
     })

     function validateInputs() {
        if (postTitle.value.length != 0 && postInput.value.length != 0){
            createBtn.style.backgroundColor = "#7F6AEE";
        }
        else
            createBtn.style.backgroundColor = "#ACA0EB";
     }

     postTitle.addEventListener('input', validateInputs);
     postInput.addEventListener('input', validateInputs);

     //과제4 추가, create-post-form 시 발생하는 event 처리
     createForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        //과제4: 현재 로컬 서버 환경에서 login session과 관련된 처리는 진행하지 않으므로 작성자 이름 임시로 저장

        const title = document.getElementById('create-post-form-title');
        const content = document.getElementById('create-post-body-text-input');
        const author = "wefsdf";

        const response = await fetch('http://localhost:5000/posts');
        //fetch API를 통해 response를 받아오지 못하는 경우, 서버와의 연결에 문제가 있음을 암시
        if(!response.ok){
            throw new Error('네트워크에 문제가 발생했습니다');
        }

        //response를 JSON 형태의 파일로 변환
        const posts = await response.json();

        const newPost = {
            postId: posts.length + 1,
            title: title.value,
            content: content.value,
            author: author,
            createdAt: new Date().toISOString(),
            likeCount: 0,
            commentCount: 0,
            viewCount: 0,
            comments: []
        }

        try {
            const createPostResponse = await fetch('http://localhost:5000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPost)
            });
    
            if (!createPostResponse.ok) {
                throw new Error('게시글 작성에 실패했습니다.');
            }
    
            alert('게시글이 성공적으로 작성되었습니다!');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('게시글 작성 중 오류 발생:', error);
        }
     })
})