const { app, BrowserWindow } = require("electron");

function createWindow() {
  const path = require("path");

const win = new BrowserWindow({
  width: 1000,
  height: 800,
  icon: path.join(__dirname, "assets/icon.ico"),
  webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
});


  win.loadFile("index.html");
}

app.whenReady().then(createWindow);
