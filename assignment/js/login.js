document.addEventListener('DOMContentLoaded', () => {
    // 요소 참조 (HTML의 id와 일치하도록 변수명을 명확하게 지정)
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('login-button');
    const emailErrorMessage = document.getElementById('email-error-message');
    const passwordErrorMessage = document.getElementById('password-error-message');
  
    // 정규표현식 상수 (이메일, 비밀번호 유효성 검사)
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
  
    // 입력값에 따른 버튼 색상 업데이트
    function validateInputs() {
      const isEmailValid = EMAIL_REGEX.test(emailInput.value);
      const isPasswordValid = PASSWORD_REGEX.test(passwordInput.value);
      loginButton.style.backgroundColor = (isEmailValid && isPasswordValid) ? "#7F6AEE" : "#ACA0EB";
    }
  
    emailInput.addEventListener('input', validateInputs);
    passwordInput.addEventListener('input', validateInputs);
  
    // 로그인 버튼 클릭 시, 서버와 통신하여 사용자 인증 처리
    loginButton.addEventListener('click', async (e) => {
      e.preventDefault();
  
      // 이전 오류 메시지 초기화
      emailErrorMessage.innerHTML = "&nbsp;";
      passwordErrorMessage.innerHTML = "&nbsp;";
  
      // 이메일 형식 검사
      if (!EMAIL_REGEX.test(emailInput.value)) {
        emailErrorMessage.textContent = "*올바른 이메일 주소 형식을 입력해주세요 (예: example@example.com)";
        return;
      }
  
      // 비밀번호 길이 검사
      const passwordLength = passwordInput.value.length;
      if (passwordLength < 8 || passwordLength > 20) {
        passwordErrorMessage.textContent = "*비밀번호는 8자 이상, 20자 이하여야 합니다";
        return;
      }
  
      // 비밀번호 복잡성 검사
      if (!PASSWORD_REGEX.test(passwordInput.value)) {
        passwordErrorMessage.textContent = "*대문자, 소문자, 숫자, 특수문자를 각 최소 1개 포함해야 합니다";
        return;
      }
  
      // 서버와 통신하여 사용자 인증 (Fetch API 활용)
      try {
        const response = await fetch('http://localhost:5000/users');
        if (!response.ok) {
          throw new Error('네트워크에 문제가 발생했습니다');
        }
        const users = await response.json();
  
        const userExists = users.some(
          user => user.email === emailInput.value && user.password === passwordInput.value
        );
  
        if (!userExists) {
          emailErrorMessage.textContent = "*등록된 이메일이 아니거나 비밀번호가 틀립니다";
        } else {
          window.location.href = 'index.html';
        }
      } catch (error) {
        alert("로그인 중 문제가 발생했습니다");
      }
    });
  });