const {
    app,
    BrowserWindow,
    Menu,
    ipcMain  //The ipcMain module is an Event Emitter. When used in the main process, it handles asynchronous and synchronous messages sent from a renderer process
} = require('electron');

// const { autoUpdater } = require('electron-updater');

const path = require('path');
// process.env.NODE_ENV = 'production';

let mainWindow;
const os = require('os');
var apiProcess = null;

// #region Events

app.on('ready', init);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createMainWindow()
    }
});

process.on('exit', function () {
    console.log('Exit electron application..');
    apiProcess.kill();
});
// #endregion

function init() {
    startNetCoreApi();
    createMainWindow();
}

function createMainWindow() {
    console.log('start');
    //create new window
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        frame: true,
        resizable: true,
        icon: __dirname + '/assets/icon.png',
        //this configuration is needed to communicate using IPC module in ANGULAR
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            //loads de global context before to be able to import electron into to angular 
            // window.require
            preload: __dirname + '/preload.js'
        }
    });

    mainWindow.maximize();

    mainWindow.loadURL('http://localhost:5000/index.html');
    // Quit app when closed
    mainWindow.on('close', function (e) {
        mainWindow = null;
    })
    // Create menu  
    const mainMenuTemplate = [{
        label: 'File',
        submenu: [{
            label: 'Quit',
            accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+q',
            click() {
                app.quit();
            }
        }]
    }];

    // if mac, add empty object to menu
    if (process.platform == 'darwin') {
        mainMenuTemplate.unshift({});
    }

    // Add developer tools item if not in production
    if (process.env.NODE_ENV !== 'production') {
        mainMenuTemplate.push({
            label: 'Developer Tools',
            submenu: [{
                label: 'Toggle Devtools',
                accelerator: process.platform == 'darwin' ? 'Command+i' : 'Ctrl+i',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
            ]
        })
    }

    // Build menu from temmplate 
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);

    mainWindow.once('ready-to-show', () => {
        // if (process.env.NODE_ENV !== 'dev')
        //     autoUpdater.checkForUpdatesAndNotify();
    });

}


function startNetCoreApi() {
    var spawn = require('child_process').spawn;

    if (process.env.NODE_ENV == 'dev') {
        var wokingDirectory = path.join(__dirname, '../../dist/SmartSim.API');
    } else {
        var wokingDirectory = path.join(__dirname, '/../dist/SmartSim.API');
    }

    var apiPath = path.join(wokingDirectory, '/SmartSim.API.exe');

    if (os.platform() === 'darwin') {
        apiPath = path.join(wokingDirectory, '//SmartSim.API');
    }

    console.log(apiPath);

    apiProcess = spawn(apiPath, {
        cwd: wokingDirectory
    });

    apiProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        if (mainWindow == null) {
            console.log('createMainWindow');
            createMainWindow();
        }
    });

};

ipcMain.on('app_version', (event) => {
    event.sender.send('app_version', { version: app.getVersion() });
});

//When a new update is available we’ll send a message to the
//main window, notifying the user of the update
//event listeners to handle update events
// autoUpdater.on('update-available', () => {
//     mainWindow.webContents.send('update_available');
// });

// //event listeners to handle update events
// autoUpdater.on('update-downloaded', () => {
//     mainWindow.webContents.send('update_downloaded');
// });
// //event listener that will install the new version if the user selects “Restart”
// ipcMain.on('restart_app', () => {
//     autoUpdater.quitAndInstall();
// });
