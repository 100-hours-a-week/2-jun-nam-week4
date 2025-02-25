document.addEventListener('DOMContentLoaded', async () => {
    //과제4 변경점: fetch API를 사용해야하므로 function 부분에 async 예약어 추가
    const dropdown = document.getElementById("dropdown");
    const profileIcon = document.getElementById("profile-icon");
    // (불필요한 likes 변수는 제거되었습니다.)
    
    //과제4: fetch API를 통해 비동기적으로 서버에서 전체 작성 글 목록 가져오기
    const postList = document.getElementById('postList');

    try {
        const response = await fetch('http://localhost:5000/posts');

        if (!response.ok) {
            throw new Error('서버와의 연결이 원활하지 않습니다');
        }

        const posts = await response.json();

        //게시글 상세 조회를 위한 추가적인 attribute 설정: post-id
        if (posts.length === 0) {
            postList.innerHTML = "등록된 게시글이 없습니다";
            return;
        }
        
        postList.innerHTML = posts
            .map(post => `
                <div class="post-card" id="post-card" post-id="${post.postId}">
                    <h2 class="post-title">${post.title}</h2>
                    <div class="post-meta">
                        <span id="likes">좋아요 ${post.likeCount}</span>
                        <span id="comments">댓글 ${post.commentCount}</span>
                        <span id="views">조회수 ${post.viewCount}</span>
                        <span class="post-date">${post.createdAt}</span>
                    </div>
                    <hr class="divider">
                    <div class="post-author">
                        <div class="author-profile"></div>
                        <div class="author-name">${post.author}</div>
                    </div>
                </div>
            `)
            .join('');

        //과제4: 개별 게시글에 대한 event listener 설정
        document.querySelectorAll('.post-card').forEach(post => {
            console.log(post);
            post.addEventListener('click', () => {
                const postId = post.getAttribute('post-id');
                window.location.href = `post.html?id=${postId}`;
            });
        });
    } catch (error) {
        console.log('게시글을 불러오는데 실패했습니다');
    }

    profileIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    });

    window.addEventListener('click', () => {
        dropdown.classList.remove('show');
    });
});