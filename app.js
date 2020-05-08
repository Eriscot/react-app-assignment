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
                    .query('SELECT Magazine.id, name, type, typeId FROM Magazine INNER JOIN MagazineType ON MagazineType.id = typeId')
                    .then(result => {
                        if(result.recordset.length) {
                            mainWindow.webContents.send('return magazines', {
                                magazines: result.recordset
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
                                positions: result.recordset
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
                                transtypes: result.recordset
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
                        console.log(result);
                        if(result.recordset.length) {
                            mainWindow.webContents.send('return ordertypes', {
                                ordertypes: result.recordset
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
                                magazinetypes: result.recordset
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
                    .query('SELECT District.id, name, workerId FROM District LEFT JOIN Worker ON Worker.id = workerId')
                    .then(result => {
                        if(result.recordset.length) {
                            mainWindow.webContents.send('return districts', {
                                districts: result.recordset
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
                    .query('SELECT Block.id, address, distId FROM Block INNER JOIN District ON District.id = distId')
                    .then(result => {
                        console.log(result);
                        if(result.recordset.length) {
                            mainWindow.webContents.send('return blocks', {
                                blocks: result.recordset
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
                    .query('SELECT Client.id, name, phoneNumber, room, address, blockId FROM Client LEFT JOIN Block ON Block.id = blockId')
                    .then(result => {
                        console.log(result);
                        if(result.recordset.length) {
                            mainWindow.webContents.send('return clients', {
                                clients: result.recordset
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
                                transactions: result.recordset
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
                                pensions: result.recordset
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
                                orders: result.recordset
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
                                subscriptions: result.recordset
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
                    .query(`SELECT Worker.id, name, position, phoneNumber, positionId
                    FROM Worker INNER JOIN Position ON Position.id = positionId`)
                    .then(result => {
                        if(result.recordset.length) {
                            mainWindow.webContents.send('return workers', {
                                workers: result.recordset
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

ipcMain.on('submit new district', async (event, data) => {
    try {
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('workerId', sql.Int, data.workerId)
                    .query(`INSERT INTO District VALUES(@workerId)`)
                    .then(result => {
                        console.log('test');
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('delete district', async (event, data) => {
    try {
        console.log(data.id);
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('id', sql.Int, data.id)
                    .query(`DELETE FROM District WHERE id = @id`)
                    .then(result => {
                        console.log(result.recordset);
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('update district', async (event, data) => {
    try {
        console.log(data.id);
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('id', sql.Int, data.id)
                    .input('workerId', sql.Int, data.workerId)
                    .query(`UPDATE District SET workerId = @workerId WHERE id = @id`)
                    .then(result => {
                        console.log(result);
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('submit new block', async (event, data) => {
    try {
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('address', sql.NVarChar, data.address)
                    .input('distId', sql.Int, data.distId)
                    .query(`INSERT INTO Block VALUES(@address, @distId)`)
                    .then(result => {
                        console.log('test');
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('delete block', async (event, data) => {
    try {
        console.log(data.id);
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('id', sql.Int, data.id)
                    .query(`DELETE FROM Block WHERE id = @id`)
                    .then(result => {
                        console.log(result.recordset);
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('update block', async (event, data) => {
    try {
        console.log(data.id);
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('id', sql.Int, data.id)
                    .input('address', sql.NVarChar, data.address)
                    .input('distId', sql.Int, data.distId)
                    .query(`UPDATE Block SET address = @address, distId = @distId WHERE id = @id`)
                    .then(result => {
                        console.log(result);
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('submit new magazine', async (event, data) => {
    try {
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('name', sql.NVarChar, data.name)
                    .input('typeId', sql.Int, data.typeId)
                    .query(`INSERT INTO Magazine VALUES(@name, @typeId)`)
                    .then(result => {
                        console.log('test');
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('delete magazine', async (event, data) => {
    try {
        console.log(data.id);
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('id', sql.Int, data.id)
                    .query(`DELETE FROM Magazine WHERE id = @id`)
                    .then(result => {
                        console.log(result.recordset);
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('update magazine', async (event, data) => {
    try {
        console.log(data.id);
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('id', sql.Int, data.id)
                    .input('name', sql.NVarChar, data.name)
                    .input('typeId', sql.Int, data.typeId)
                    .query(`UPDATE Magazine SET name = @name, typeId = @typeId WHERE id = @id`)
                    .then(result => {
                        console.log(result);
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('submit new worker', async (event, data) => {
    try {
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('name', sql.NVarChar, data.name)
                    .input('positionId', sql.Int, data.positionId)
                    .input('phone', sql.NVarChar, data.phoneNumber)
                    .query(`INSERT INTO Worker VALUES(@name, @positionId, @phoneNumber)`)
                    .then(result => {
                        console.log('test');
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('delete worker', async (event, data) => {
    try {
        console.log(data.id);
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('id', sql.Int, data.id)
                    .query(`DELETE FROM Worker WHERE id = @id`)
                    .then(result => {
                        console.log(result.recordset);
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('update worker', async (event, data) => {
    try {
        console.log(data.id);
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('id', sql.Int, data.id)
                    .input('name', sql.NVarChar, data.name)
                    .input('positionId', sql.Int, data.positionId)
                    .input('phoneNumber', sql.NVarChar, data.phoneNumber)
                    .query(`UPDATE Worker SET name = @name, positionId = @positionId, phoneNumber = @phoneNumber WHERE id = @id`)
                    .then(result => {
                        console.log(result);
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('submit new client', async (event, data) => {
    try {
        await pool.connect()
            .then(pool => {
                console.log('error here')
                return pool.request()
                    .input('name', sql.NVarChar, data.name)
                    .input('phoneNumber', sql.NVarChar, data.phoneNumber)
                    .input('room', sql.Int, data.room)
                    .input('blockId', sql.Int, data.blockId)
                    .query(`INSERT INTO Client VALUES(@name, @phoneNumber, @room, @blockId)`)
                    .then(result => {
                        console.log('test');
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('delete client', async (event, data) => {
    try {
        console.log(data.id);
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('id', sql.Int, data.id)
                    .query(`DELETE FROM Client WHERE id = @id`)
                    .then(result => {
                        console.log(result.recordset);
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('update client', async (event, data) => {
    try {
        console.log(data.id);
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('id', sql.Int, data.id)
                    .input('name', sql.NVarChar, data.name)
                    .input('phoneNumber', sql.NVarChar, data.phoneNumber)
                    .input('room', sql.Int, data.room)
                    .input('blockId', sql.Int, data.blockId)
                    .query(`UPDATE Client SET name = @name, phoneNumber = @phoneNumber, room = @room, blockId = @blockId WHERE id = @id`)
                    .then(result => {
                        console.log(result);
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('submit new pension', async (event, data) => {
    try {
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('clientId', sql.Int, data.clientId)
                    .input('workerId', sql.NVarChar, data.workerId)
                    .input('total', sql.Int, data.total)
                    .input('date', sql.DateTime, data.date)
                    .query(`INSERT INTO Pension VALUES(@clientId, @workerId, @total, @date)`)
                    .then(result => {
                        console.log('test');
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('delete pension', async (event, data) => {
    try {
        console.log(data.id);
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('id', sql.Int, data.id)
                    .query(`DELETE FROM Client WHERE id = @id`)
                    .then(result => {
                        console.log(result.recordset);
                    });
            });
    } catch(e) {
        console.error(e);
    }
});

ipcMain.on('update pension', async (event, data) => {
    try {
        console.log(data.id);
        await pool.connect()
            .then(pool => {
                return pool.request()
                    .input('id', sql.Int, data.id)
                    .input('clientId', sql.Int, data.clientId)
                    .input('workerId', sql.NVarChar, data.workerId)
                    .input('total', sql.Int, data.total)
                    .input('date', sql.DateTime, data.date)
                    .query(`UPDATE Client SET clientId = @clientid, workerId = @workerId, total = @total, date = @date WHERE id = @id`)
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