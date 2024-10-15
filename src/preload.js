const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('api', {
  newWindow: () => {
    ipcRenderer.send('new-window');
  },
  switchDisplayMode: () => {
    ipcRenderer.send('switch-display-mode');
  }

});

