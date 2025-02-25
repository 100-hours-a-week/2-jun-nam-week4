document.addEventListener('DOMContentLoaded', async () => {
    const changeProfilePicBtn = document.getElementById('changeProfilePicBtn');
    const profilePicInput = document.getElementById('profilePicInput');
    const profileImage = document.getElementById('profileImage');
    const nickname = document.getElementById('nickname');
    const response = await fetch('http://localhost:5000/users');
    const users = await response.json();
    
    //과제4: 현재 session을 통해 로그인한 유저의 정보를 유지하고 있지 않으므로 임시 조치
    const user = users.find(user => user.email == "ddd@test.com");
    nickname.value = user.nickname;


    changeProfilePicBtn.addEventListener('click', (e) => {
        e.preventDefault();
        profilePicInput.click();
    });

    profilePicInput.addEventListener('change', (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                profileImage.src = e.target.result;
            };

            reader.readAsDataURL(file);
        }
    });

    const modifyButton = document.getElementById('modify-button');
    modifyButton.addEventListener('click', async (e) => {
        e.preventDefault();

        const nickname = document.getElementById('nickname');
        const nicknameError = document.getElementById('nick-error-message');

        //async PATCH 요청을 통해 user의 nickname 정보를 수정하도록 요청
        const modifyNicknameResponse = await fetch(`http://localhost:5000/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nickname: nickname.value
            })
        });

        if(!modifyNicknameResponse.ok){
            throw new Error('유저 닉네임 수정 실패');
        }

        if(nickname.value.length >= 11){
            nicknameError.innerText = "*닉네임은 최대 10자 까지 작성 가능합니다";
            return;
        }
        else{
            nicknameError.innerHTML = '&nbsp;'
        }

        window.location.href = 'index.html';
    })

    const deleteAccountModalOverlay = document.getElementById('deleteAccountModalOverlay');
    const deleteAccount = document.getElementById('delete-account');
    deleteAccount.addEventListener('click', e => {
        e.preventDefault();
        deleteAccountModalOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    })

    const modifyComplete = document.getElementById('modify-complete');
    modifyComplete.addEventListener('click', () => {
        window.location.href = 'index.html';
    })

    const dropdown = document.getElementById("dropdown");
    const profileIcon = document.getElementById("profile-icon")

    profileIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('show');
    })

    window.addEventListener('click', () => {
        dropdown.classList.remove('show');
    })


    //modal EventHandler
    const deleteAccountCancelButton = document.getElementById('deleteAccountCancelButton');
    const deleteAccountConfirmButton = document.getElementById('deleteAccountConfirmButton');


    deleteAccountCancelButton.addEventListener('click', () => {
        deleteAccountModalOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    deleteAccountConfirmButton.addEventListener('click', () => {
        deleteAccountModalOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
        window.location.href = 'login.html';
    });
})