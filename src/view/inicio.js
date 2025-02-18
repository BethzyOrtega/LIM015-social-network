import {
  loginUser,
  loginGoogle,
  resetPassword,
} from '../firebase/fireBase-function.js';

const menuBurguer = document.getElementById('menuBurguer');
menuBurguer.classList = 'disable';

export const loginSection = () => {
  const containerAll = document.createElement('section');
  const containerLogin = document.createElement('section');
  containerAll.className = 'containerAll';
  containerLogin.className = 'loginSection';
  containerLogin.innerHTML = `
    <section>
      <p class="greetings">¡Resuelve tus dudas y conecta con otros programadores!</p>
    </section>
    <form class="formLogin">
      <p class="text">Iniciar sesión</p>
      <input type="email"  class="inputType" id="emailLogin" placeholder="user@example.com"/>
      <span id="errorEmailLogin" class="error"></span><br>
      <input type="password"  class="inputType" id="passwordLogin" placeholder="Password" autocomplete="on"/>
      <span id="errorpasswordLogin" class="error"></span><br>
      <span id="errorAllLogin" class="error"></span><br>
      <section class="buttonSection">
        <button  class="button" id="btnLogin">Login</button>
        <a href="" class="linkResetPassword">¿Olvidaste tu contraseña?</a>
        <span id="msgSendEmail" class="successfully"></span><br>
      </section>
      <section class="sectionIcons">
      <a href=""><i class="fab fa-facebook facebook"></i></a>
      <a href=""><i class="fab fa-google google"></i></a>
      </section>
    </form>
    <section> 
      <div id="myModalReset" class="modal" style="display: none;">
        <div class="modal-content">
          <p>Escriba su email</p>
          <input type="email"  class="inputType" id="emailReset" placeholder="user@example.com"/><br>
          <span id = "errorReset" class="error"></span>
          <div>
            <button class = "button" id="btnSend">Enviar</button>
            <button class = "button" id="btnCancelReset">Cancelar</button>
          </div>
        </div>
      </div>
    </section>
    <section class="linkRegister">
      <p class="text">¿No tienes cuenta?  <span><a href="#/register" id="linkRegister" class="link">Registrate aquí</a></span></p>
    </section>
  `;
  containerAll.appendChild(containerLogin);

  const btnLogin = containerAll.querySelector('#btnLogin');
  const btnGoogle = containerAll.querySelector('.google');
  const linkResetPassword = containerAll.querySelector('.linkResetPassword');
  const errorAllLogin = containerAll.querySelector('#errorAllLogin');
  const errorEmailLogin = containerAll.querySelector('#errorEmailLogin');
  const errorpasswordLogin = containerAll.querySelector('#errorpasswordLogin');
  const btnCancelReset = containerAll.querySelector('#btnCancelReset');
  const myModalReset = containerAll.querySelector('#myModalReset');
  const errorReset = containerAll.querySelector('#errorReset');
  const btnSend = containerAll.querySelector('#btnSend');
  const msgSendEmail = containerAll.querySelector('#msgSendEmail');
  const messages = [];

  /* **********Iniciar sesión con cuenta registrada********** */
  btnLogin.addEventListener('click', (event) => {
    event.preventDefault();
    const emailLogin = containerAll.querySelector('#emailLogin').value;
    const passwordLogin = containerAll.querySelector('#passwordLogin').value;
    if (emailLogin === '' || passwordLogin === '') {
      messages.push('Debe llenar todos los campos');
      errorAllLogin.innerHTML = messages;
      errorEmailLogin.innerHTML = '';
      errorpasswordLogin.innerHTML = '';
    } else {
      loginUser(emailLogin, passwordLogin)
        .then((userCredential) => {
          localStorage.setItem('email', userCredential.user.email);
          localStorage.setItem('uid', userCredential.user.uid);
          window.location.hash = '#/application';
        }).catch((err) => {
          const errorCode = err.code;
          if (errorCode === 'auth/wrong-password') {
            errorpasswordLogin.innerHTML = 'Usuario y/o contraseña incorrecta';
          } else if (errorCode === 'auth/invalid-email') {
            errorEmailLogin.innerHTML = 'Correo electrónico no válido';
          } else if (errorCode === 'auth/user-not-found') {
            errorpasswordLogin.innerHTML = 'Usuario y/o contraseña incorrecta';
          }
        });
      localStorage.setItem('email1', emailLogin);
      errorEmailLogin.innerHTML = '';
      errorpasswordLogin.innerHTML = '';
      errorAllLogin.innerHTML = '';
    }
  });

  /* **********Iniciar sesión con google********** */
  btnGoogle.addEventListener('click', (event) => {
    event.preventDefault();
    loginGoogle().then((userCredential) => {
      localStorage.setItem('emailGoogle', userCredential.user.email);
      localStorage.setItem('uidGoogle', userCredential.user.uid);
      window.location.hash = '#/application';
    });
  });

  /* **********Abrir el modal********** */
  linkResetPassword.addEventListener('click', (event) => {
    event.preventDefault();
    myModalReset.style.display = 'block';
  });

  /* **********Cancelar modal para restablecer contraseña********** */
  btnCancelReset.addEventListener('click', () => {
    myModalReset.style.display = 'none';
    errorReset.innerHTML = '';
  });

  /* **********Restablecer contraseña********** */
  btnSend.addEventListener('click', () => {
    const emailReset = containerAll.querySelector('#emailReset').value;
    if (emailReset !== '') {
      resetPassword(emailReset).then(() => {
        myModalReset.style.display = 'none';
        msgSendEmail.innerHTML = 'Se envió el correo satisfactoriamente, favor de verificar ';
      }).catch((err) => {
        const error = err.code;
        if (error === 'auth/user-not-found') {
          errorReset.innerHTML = 'Email no registrado';
        }
      });
      containerAll.querySelector('#emailReset').value = '';
      errorReset.innerHTML = '';
    } else {
      errorReset.innerHTML = 'No ha escrito ningún correo';
    }
  });

  /*
  const facebook = containerAll.querySelector('.facebook');
  facebook.addEventListener('click', (event) => {
    event.preventDefault();
    loginFacebook().then(() => {
      window.location.hash = '#/application';
    });
  }); */

  return containerAll;
};
