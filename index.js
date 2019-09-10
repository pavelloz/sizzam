const path = require('path');
const { app, BrowserWindow, BrowserView } = require('electron');

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

function createWindow() {
  let win = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true
    }
  });

  let browser = new BrowserView();
  let addressBar = new BrowserView();

  browser.setAutoResize({
    horizontal: true,
    vertical: true,
  });

  addressBar.setAutoResize({
    horizontal: true
  });

  win.addBrowserView(browser);
  browser.setBounds({ x: 0, y: 44, width: 1024, height: 768 - 46 });
  browser.webContents.loadURL('https://www.github.com');
  
  win.addBrowserView(addressBar);
  addressBar.setBounds({ x: 0, y: 0, width: 1024, height: 44 });
  addressBar.webContents.loadURL(`file://${__dirname}/index.html`);

  // win.webContents.openDevTools();
}

app.on('ready', createWindow);
