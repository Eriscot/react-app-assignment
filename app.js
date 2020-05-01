const { app, BrowserWindow, ipcMain } = require('electron');
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

    //         (error) => {
        //     console.log(data);
        //     if(error) {
        //         mainWindow.webContents.send('return user', {
        //             error
        //         });
        //         console.error(error);
        //     } else {
        //         req.query(`SELECT TOP 1 FROM [User] WHERE nickname = ${data.nickname} AND password = ${data.password}`, (error, result) => {
        //             if(error) {
        //                 console.error(error);
        //                 mainWindow.webContents.send('return user', {
        //                     error
        //                 });
        //             } else {
        //                 mainWindow.webContents.send('return user', {
        //                     user: result
        //                 });
        //             }
        //         });
        //     }
        // });
})