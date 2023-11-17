/* eslint-disable import/order */
import 'regenerator-runtime';
import '../styles/skeletonStyle.css';
import '../styles/skeletonResponsive.css';
import App from './views/app';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const app = new App({
  button: document.querySelector('.mobile-menu-button'), // Ganti dengan selector yang sesuai
  drawer: document.querySelector('.menu'), // Ganti dengan selector yang sesuai
  content: document.querySelector('.content'), // Ganti dengan selector yang sesuai
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
