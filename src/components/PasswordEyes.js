import eyeInvisible from '../assets/eye-invisible.png';
import eyeVisible from '../assets/eye-visible.png';

export function passwordEyes(passwordInput, passwordEye) {
  let eye = document.getElementById(passwordEye);
  let input = document.getElementById(passwordInput);
  eye.addEventListener('click', function () {
    if (input.getAttribute('type') === 'password') {
      input.setAttribute('type', 'text');
      eye.src = eyeVisible;
    } else if (input.getAttribute('type') === 'text') {
      input.setAttribute('type', 'password');
      eye.src = eyeInvisible;
    }
  });
}
