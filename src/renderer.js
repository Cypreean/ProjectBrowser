import './index.css';

//buttons

const backButton = document.getElementById('back-button');
const forwardButton = document.getElementById('forward-button');
const reloadButton = document.getElementById('reload-button');
const searchButton = document.getElementById('search-button');
const newWindwButton = document.getElementById('new-window-button');
const alwaysOnDisplayButton = document.getElementById('always-on-display-button');
const submitButton = document.getElementById('submit-button');
//url field

const urlField = document.getElementById('search-input');

//webview


const webview = document.getElementById('webview');
webview.src= "https://www.google.com";
let currentUrl = "";


newWindwButton.addEventListener('click', (event) => {
  window.api.newWindow();
});

backButton.addEventListener('click', (event) => {
  webview.goBack();
});

forwardButton.addEventListener('click', (event) => {
  webview.goForward();
});

reloadButton.addEventListener('click', (event) => {
  webview.reload();
});

webview.addEventListener('did-navigate', (event) => {
    currentUrl = event.url;
    urlField.value = currentUrl;
});


urlField.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    event.preventDefault();
    handleUrl();
    
  }
});
submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  handleUrl();
  
});


function handleUrl(){
  let url = "";
  const inputUrl = urlField.value;
  if (inputUrl.startsWith('http://') || inputUrl.startsWith('https://')) {
    url = inputUrl;
  } else {

    url = `https://google.com/search?q=${inputUrl}`;
  }
  webview.src = url;
}