const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const sql = require('mssql');
const config = require('./config');

let mainWindow;
let user;
let password;
let pool;

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

ipcMain.on('logout', async (event) => {
    console.log('logout');
    user = undefined;
    password = undefined;
    pool.close();
});

ipcMain.on('login', async (event, data) => {
    try {
        console.log(data);
        user = data.nickname;
        password =  data.password;
        pool = new sql.ConnectionPool({
            ...config,
            user,
            password
        })
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('nickname', sql.VarChar(20), data.nickname)
                    .query('SELECT id FROM [Worker] WHERE nickname = @nickname')
                    .then(result => {
                        mainWindow.webContents.send('login status', {
                            user: result.recordset[0]
                        });
                    });
            })
            .catch(error => {
                mainWindow.webContents.send('login status', {
                    error: error.message
                });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('get magazines', async (event) => {
    try {
        
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .query('SELECT Magazine.id, name, type FROM Magazine INNER JOIN MagazineType ON MagazineType.id = typeId')
                    .then(result => {
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

ipcMain.on('get positions', async (event) => {
    try {
        
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .query('SELECT * FROM Position')
                    .then(result => {
                        if(result.recordset.length) {
                            mainWindow.webContents.send('return positions', {
                                table: result.recordset
                            });
                        } else {
                            mainWindow.webContents.send('return positions', {
                                error: 'The table is empty'
                            });
                        }
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('get transtypes', async (event) => {
    try {
        
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .query('SELECT * FROM TransType')
                    .then(result => {
                        if(result.recordset.length) {
                            mainWindow.webContents.send('return transtypes', {
                                table: result.recordset
                            });
                        } else {
                            mainWindow.webContents.send('return transtypes', {
                                error: 'The table is empty'
                            });
                        }
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('get ordertypes', async (event) => {
    try {
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .query('SELECT * FROM OrderType')
                    .then(result => {
                        if(result.recordset.length) {
                            mainWindow.webContents.send('return ordertypes', {
                                table: result.recordset
                            });
                        } else {
                            mainWindow.webContents.send('return ordertypes', {
                                error: 'The table is empty'
                            });
                        }
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('get magazinetypes', async (event) => {
    try {
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .query('SELECT * FROM MagazineType')
                    .then(result => {
                        if(result.recordset.length) {
                            mainWindow.webContents.send('return magazinetypes', {
                                table: result.recordset
                            });
                        } else {
                            mainWindow.webContents.send('return magazinetypes', {
                                error: 'The table is empty'
                            });
                        }
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('get districts', async (event) => {
    try {
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .query('SELECT District.id, name, districtNumber FROM District INNER JOIN Worker ON Worker.id = workerId')
                    .then(result => {
                        if(result.recordset.length) {
                            mainWindow.webContents.send('return districts', {
                                table: result.recordset
                            });
                        } else {
                            mainWindow.webContents.send('return districts', {
                                error: 'The table is empty'
                            });
                        }
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('get blocks', async (event) => {
    try {
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .query('SELECT Block.id, address, districtNumber FROM Block INNER JOIN District ON District.id = distId')
                    .then(result => {
                        console.log(result);
                        if(result.recordset.length) {
                            mainWindow.webContents.send('return blocks', {
                                table: result.recordset
                            });
                        } else {
                            mainWindow.webContents.send('return blocks', {
                                error: 'The table is empty'
                            });
                        }
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('get clients', async (event) => {
    try {
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .query('SELECT Client.id, name, phoneNumber, room, address FROM Client INNER JOIN Block ON Block.id = blockId')
                    .then(result => {
                        console.log(result);
                        if(result.recordset.length) {
                            mainWindow.webContents.send('return clients', {
                                table: result.recordset
                            });
                        } else {
                            mainWindow.webContents.send('return clients', {
                                error: 'The table is empty'
                            });
                        }
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('get transactions', async (event) => {
    try {
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .query(`SELECT [Transaction].id, type, Worker.name as worker, Client.name as client, total, tranDate 
                        FROM [Transaction] INNER JOIN TransType ON TransType.id = typeId 
                            INNER JOIN Client ON Client.id = clientId INNER JOIN Worker On Worker.id = workerId`)
                    .then(result => {
                        console.log(result);
                        if(result.recordset.length) {
                            mainWindow.webContents.send('return transactions', {
                                table: result.recordset
                            });
                        } else {
                            mainWindow.webContents.send('return transactions', {
                                error: 'The table is empty'
                            });
                        }
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('get pensions', async (event) => {
    try {
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .query(`SELECT Pension.id, Client.name as client, Worker.name as worker, total, date 
                    FROM Pension INNER JOIN Client ON Client.id = clientId
                    INNER JOIN Worker on Worker.id = workerId`)
                    .then(result => {
                        if(result.recordset.length) {
                            mainWindow.webContents.send('return pensions', {
                                table: result.recordset
                            });
                        } else {
                            mainWindow.webContents.send('return pensions', {
                                error: 'The table is empty'
                            });
                        }
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('get orders', async (event) => {
    try {
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .query(`SELECT [Order].id, type, sender, name, weight, cost, pickupDate 
                    FROM [Order] INNER JOIN Client ON Client.id = clientId
                    INNER JOIN OrderType on OrderType.id = typeId`)
                    .then(result => {
                        if(result.recordset.length) {
                            mainWindow.webContents.send('return orders', {
                                table: result.recordset
                            });
                        } else {
                            mainWindow.webContents.send('return orders', {
                                error: 'The table is empty'
                            });
                        }
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('get subscriptions', async (event) => {
    try {
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .query(`SELECT Subscription.id, Worker.name as worker, Client.name as client, Magazine.name as magazine,
                    subBegin, subEnd, total
                    FROM Subscription INNER JOIN Client ON Client.id = clientId
                    INNER JOIN Worker on Worker.id = workerId
                    INNER JOIN Magazine on Magazine.id = magazineId`)
                    .then(result => {
                        if(result.recordset.length) {
                            mainWindow.webContents.send('return subscriptions', {
                                table: result.recordset
                            });
                        } else {
                            mainWindow.webContents.send('return subscriptions', {
                                error: 'The table is empty'
                            });
                        }
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('get workers', async (event) => {
    try {
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .query(`SELECT Worker.id, name, position, phoneNumber
                    FROM Worker INNER JOIN Position ON Position.id = positionId`)
                    .then(result => {
                        if(result.recordset.length) {
                            mainWindow.webContents.send('return workers', {
                                table: result.recordset
                            });
                        } else {
                            mainWindow.webContents.send('return workers', {
                                error: 'The table is empty'
                            });
                        }
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('submit new position', async (event, data) => {
    try {
        console.log(data.position)
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('position', sql.NVarChar, data.position)
                    .query(`INSERT INTO Position VALUES(@position)`)
                    .then(result => {
                        console.log('test');
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('delete position', async (event, data) => {
    try {
        console.log(data.id);
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('id', sql.Int, data.id)
                    .query(`DELETE FROM Position WHERE id = @id`)
                    .then(result => {
                        console.log(result.recordset);
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('update position', async (event, data) => {
    try {
        console.log(data.id);
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('id', sql.Int, data.id)
                    .input('position', sql.NVarChar, data.position)
                    .query(`UPDATE Position SET position = @position WHERE id = @id`)
                    .then(result => {
                        console.log(result);
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('submit new magazinetype', async (event, data) => {
    try {
        console.log(data.type)
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('type', sql.NVarChar, data.type)
                    .query(`INSERT INTO MagazineType VALUES(@type)`)
                    .then(result => {
                        console.log('test');
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('delete magazinetype', async (event, data) => {
    try {
        console.log(data.id);
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('id', sql.Int, data.id)
                    .query(`DELETE FROM MagazineType WHERE id = @id`)
                    .then(result => {
                        console.log(result.recordset);
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('update magazinetype', async (event, data) => {
    try {
        console.log(data.id);
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('id', sql.Int, data.id)
                    .input('type', sql.NVarChar, data.type)
                    .query(`UPDATE MagazineType SET type = @type WHERE id = @id`)
                    .then(result => {
                        console.log(result);
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('submit new ordertype', async (event, data) => {
    try {
        console.log(data.type)
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('type', sql.NVarChar, data.type)
                    .query(`INSERT INTO OrderType VALUES(@type)`)
                    .then(result => {
                        console.log('test');
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('delete ordertype', async (event, data) => {
    try {
        console.log(data.id);
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('id', sql.Int, data.id)
                    .query(`DELETE FROM OrderType WHERE id = @id`)
                    .then(result => {
                        console.log(result.recordset);
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('update ordertype', async (event, data) => {
    try {
        console.log(data.id);
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('id', sql.Int, data.id)
                    .input('type', sql.NVarChar, data.type)
                    .query(`UPDATE OrderType SET type = @type WHERE id = @id`)
                    .then(result => {
                        console.log(result);
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('submit new transtype', async (event, data) => {
    try {
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('type', sql.NVarChar, data.type)
                    .input('cost', sql.Money, data.cost)
                    .query(`INSERT INTO TransType VALUES(@type, @cost)`)
                    .then(result => {
                        console.log('test');
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('delete transtype', async (event, data) => {
    try {
        console.log(data.id);
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('id', sql.Int, data.id)
                    .query(`DELETE FROM TransType WHERE id = @id`)
                    .then(result => {
                        console.log(result.recordset);
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('update transtype', async (event, data) => {
    try {
        console.log(data.id);
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('id', sql.Int, data.id)
                    .input('type', sql.NVarChar, data.type)
                    .input('cost', sql.Money, data.cost)
                    .query(`UPDATE TransType SET type = @type, cost = @cost WHERE id = @id`)
                    .then(result => {
                        console.log(result);
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
                role: 'reload'
            },
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