import "./css/styles.css";


import templateRoot from './hbs/root.hbs';





// use root template, apply to "app" div
let appEl = document.getElementById("app");
let mainEl;
appEl.innerHTML = templateRoot();
window.onload = () => {

	mainEl = document.getElementById("main");

};