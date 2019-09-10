const path = require('path');
const { app, BrowserWindow, BrowserView, ipcMain } = require('electron');

function createWindow() {
  const screen = require('electron').screen;
  const mainScreen = screen.getPrimaryDisplay();

  const wh = {
    w: mainScreen.size.width,
    h: mainScreen.size.height,
    defaultWidth: 480
  };

  let win = new BrowserWindow({
    width: wh.defaultWidth,
    height: wh.h,
    y: 0,
    x: wh.w - wh.defaultWidth,
    titleBarStyle: 'hidden',
    icon: path.join(__dirname, 'assets/icons/png/512x512.png'),
    webPreferences: {
      nodeIntegration: true
    }
  });

  const BAR = {
    height: 23
  };

  let view = new BrowserView();

  win.loadFile('index.html');
  win.addBrowserView(view);
  view.setBounds({ x: 0, y: BAR.height, width: wh.defaultWidth, height: wh.h - BAR.height });
  view.setAutoResize({
    horizontal: true,
    vertical: true
  });

  view.webContents.loadURL('https://localhost:3000');

  ipcMain.on('loadURL', (event, args) => {
    view.webContents.loadURL(args);
    view.webContents.focus();
    event.returnValue = 'message';
  });
}

app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
app.on('ready', createWindow);
