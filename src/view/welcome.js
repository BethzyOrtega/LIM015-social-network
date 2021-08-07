export const welcomeSection = () => {
  const containerAll = document.createElement('section');
  const containerWelcome = document.createElement('section');
  containerWelcome.className = 'welcomeSection';
  containerWelcome.innerHTML = `
  <section id="welcome">
    <p>Conecta con otros PROGRAMADORES</p>
    <button  id="btnStart">Get Start</button>
  </section>
    `;
  containerAll.appendChild(containerWelcome);
  const btnWelcome = containerAll.querySelector('#btnStart');
  btnWelcome.addEventListener('click', () => {
    window.location.hash = '#/login';
  });
  return containerWelcome;
};
