const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const sql = require('mssql');
const config = require('./config');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true
        }
    })
    mainWindow.loadURL('http://localhost:3000/');
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
});

ipcMain.on('get user', async (event, data) => {
    try {
        await sql.connect(config)
            .then(pool => {
                return pool.request()
                    .input('nickname', sql.VarChar(20), data.nickname)
                    .input('password', sql.VarChar(20), data.password)
                    .query('SELECT * FROM [User] WHERE nickname = @nickname AND password = @password')
                    .then(result => {
                        if(result.recordset.length) {
                            mainWindow.webContents.send('return user', {
                                user: result.recordset[0]
                            });
                        } else {
                            mainWindow.webContents.send('return user', {
                                error: 'No user found'
                            });
                        }
                    });
            })
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('get magazines', async (event) => {
    try {
        await sql.connect(config)
            .then(pool => {
                return pool.request()
                    .query('SELECT * FROM [Magazines] ')
                    .then(result => {
                        console.log(result);
                        if(result.recordset.length) {
                            mainWindow.webContents.send('return magazines', {
                                table: result.recordset
                            });
                        } else {
                            mainWindow.webContents.send('return magazines', {
                                error: 'The table is empty'
                            });
                        }
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

const menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Exit',
                aggregator: 'Alt+F4',
                click: () => {
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'DEVELOPMENT',
        submenu: [
            {
                role: 'toggleDevTools'
            }
        ]
    }
]