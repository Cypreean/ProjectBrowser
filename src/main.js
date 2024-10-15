const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
import started from 'electron-squirrel-startup';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}
console.log('started')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webviewTag: true,
    },
  });


  mainWindow.setAlwaysOnTop(true, 'screen');
  
  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }


};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on('new-window', (event) => {
  createWindow();
} );

ipcMain.on('switch-display-mode', (event) => {
  const mainWindow = BrowserWindow.getFocusedWindow();
  console.log('Switching display mode...');
  try {
    if (mainWindow.isAlwaysOnTop()) {
      console.log('Current state: Always on top. Turning it off.');
      mainWindow.setAlwaysOnTop(false, 'screen');
    } else {
      console.log('Current state: Not always on top. Turning it on.');
      mainWindow.setAlwaysOnTop(true, 'screen');
    }
  } catch (error) {
    console.error('Error switching display mode:', error);
  }
});
