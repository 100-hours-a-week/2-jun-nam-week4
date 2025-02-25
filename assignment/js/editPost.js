document.addEventListener('DOMContentLoaded', async () => {
    //header profile icon handelr
    const dropdown = document.getElementById("dropdown");
    const profileIcon = document.getElementById("profile-icon")
    const modifyBtn = document.getElementById('modify-post-button');
    const backBtn = document.getElementById('back-button');
    
    //과제4: url을 통해 특정 post의 id를 전달하도록 index.html에서 설정했음. 이를 활용해 서버에서 특정 게시글의 정보를 받아옴
    //URLSearchParams를 통해 url을 통해 전달될 특정 값을 key-value 단위로 만들어서 관리할 수 있음
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");
    let post;
    try {
        const postResponse = await fetch("http://localhost:5000/posts");
    
        const posts = await postResponse.json();
        post = posts.find((post) => post.postId == postId);
    }
    catch(error){

    }

    profileIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    })

    window.addEventListener('click', () => {
        dropdown.classList.remove('show');
    })

    const postTitle = document.getElementById('edit-post-form-title');
    const postInput = document.getElementById('edit-post-body-text-input');

    //과제4: 서버에 저장된 post의 내용을 가져와서 반영
    postTitle.value = post.title;
    postInput.value = post.content;

    function validateInputs() {
       if (postTitle.value.length != 0 && postInput.value.length != 0){
            modifyBtn.style.backgroundColor = "#7F6AEE";
       }
       else
             modifyBtn.style.backgroundColor = "#ACA0EB";
    }

    postTitle.addEventListener('input', validateInputs);
    postInput.addEventListener('input', validateInputs);
    postTitle.dispatchEvent(new Event('input'))
    postInput.dispatchEvent(new Event('input'))

    //과제4: async를 통해 서버에 저장된 post의 내용을 갱신
    modifyBtn.addEventListener('click', async(e) => {
        e.preventDefault();
        const postModifyResponse = await fetch(`http://localhost:5000/posts/${post.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: postTitle.value,
                content:  postInput.value
            })
        })

        if(!postModifyResponse.ok){
            throw new Error('게시글 수정 실패');
        }

        window.location.href = `post.html?id=${postId}`;
    });

    //과제4: post GET 방식 변경에 따른 back button logic 변경
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = `post.html?id=${postId}`;
    });
})