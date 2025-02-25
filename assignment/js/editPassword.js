document.addEventListener('DOMContentLoaded', async () => {
    const modifyButton = document.getElementById('modify-button');

    //과제4: 현재 session을 통해 로그인한 유저의 정보를 유지하고 있지 않으므로 임시 조치
    const response = await fetch('http://localhost:5000/users');
    const users = await response.json();
    const user = users.find(user => user.email == "ddd@test.com");

    function validateInputs() {
        const passPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
        
        const password = document.getElementById('password');
        const passwordReenter = document.getElementById('passReenter');

        const isPasswordValid = passPattern.test(password.value);
        
        if (isPasswordValid && passwordReenter.value === password.value) {
            modifyButton.style.backgroundColor = "#7F6AEE";
            return true;
        } else {
            modifyButton.style.backgroundColor = "#ACA0EB";
            return false;
        }
    }

    password.addEventListener('input', validateInputs);
    passReenter.addEventListener('input', validateInputs);

    modifyButton.addEventListener('click', async (e) => {
        e.preventDefault();

        //과제4: PATCH 요청을 통해 user의 password 수정 진행
        const modifyPasswordResponse = await fetch(`http://localhost:5000/users/${user.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: passReenter.value
            })
        })

        const passwordErrorMessage = document.getElementById('password-error-message');
        const passwordReenterErrorMessage = document.getElementById('pass-reenter-error-message');
        let passwordLength = password.value.length;

        if(passwordLength < 8 || passwordLength > 20){
            passwordErrorMessage.innerText="*비밀번호는 8자 이상, 20자 이하여야 합니다";
            return;
        }

        const passPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
        if(!passPattern.test(password.value)){
            passwordErrorMessage.innerText="*대문자, 소문자, 숫자, 특수문자를 각 최소 1개 포함해야 합니다";
            return;
        }
        else{
            passwordErrorMessage.innerHTML = "&nbsp;";
        }
        
        if(validateInputs()){
            window.location.href = 'index.html';
        }
        else{
            passwordReenterErrorMessage.innerText="*비밀번호와 다릅니다.";
        }
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
})