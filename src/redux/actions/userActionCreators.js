import USER_ACTIONS from "./userActionsConstants";
const { ipcRenderer } = window.require('electron');

export function userLogin(payload) {
    return async dispatch => {
        dispatch(userLoginStart());
        ipcRenderer.send('login', {
            ...payload
        });
        ipcRenderer.on('login status', (event, data) => {
            if(data.error) {
                setTimeout(() => {
                    dispatch(userLoginError(data.error));
                }, 300);
            } else {
                setTimeout(() => {
                    dispatch(userLoginSuccess(data.user));
                }, 300);
            }
        });
    }
}

export function userLogout() {
    return async dispatch => {
        dispatch({
            type: USER_ACTIONS.LOGOUT
        });
        ipcRenderer.send('logout');
        (async () => {
            await setTimeout(() => {
                dispatch(userLogoutSuccess());
            }, 400);
        })();
    }
}

export function userLogoutSuccess() {
    return {
        type: USER_ACTIONS.LOGOUT_SUCCESS
    }
}

export function userLoginStart() {
    return {
        type: USER_ACTIONS.LOGIN_START
    }
}

export function userLoginSuccess(payload) {
    return {
        type: USER_ACTIONS.LOGIN_SUCCESS,
        payload
    }
}

export function userLoginError(error) {
    console.log('test');
    return {
        type: USER_ACTIONS.LOGIN_FAILED,
        error
    }
}

export function getMagazines() {
    return async dispatch => {
        dispatch(getMagazinesStart());
        ipcRenderer.send('get magazines');
        ipcRenderer.on('return magazines', async (event, data) => {
            if(data.error) {
                await setTimeout(() => {
                    dispatch(getMagazinesFailed(data.error));
                }, 100);
            } else {
                await setTimeout(() => {
                    dispatch(getMagazinesSuccess({
                        lastLoaded: 'magazines',
                        magazines: data.magazines
                    }));
                }, 100)
            }
        });
    }
}

export function getMagazinesStart() {
    return {
        type: USER_ACTIONS.GET_MAGAZINES_START,
    }
}

export function getMagazinesFailed(payload) {
    return {
        type: USER_ACTIONS.GET_MAGAZINES_FAILED,
        payload
    }
}

export function getMagazinesSuccess(payload) {
    return {
        type: USER_ACTIONS.GET_MAGAZINES_SUCCESS,
        payload
    }
}

export function getPositions() {
    return async dispatch => {
        dispatch(getPositionsStart());
        ipcRenderer.send('get positions');
        ipcRenderer.on('return positions', async (event, data) => {
            if(data.error) {
                await setTimeout(() => {
                    dispatch(getPositionsFailed(data.error));
                }, 100);
            } else {
                await setTimeout(() => {
                    dispatch(getPositionsSuccess({
                        lastLoaded: 'positions',
                        positions: data.positions
                    }));
                }, 100);
            }
        });
    }
}

export function getPositionsStart() {
    return {
        type: USER_ACTIONS.GET_POSITIONS_START,
    }
}

export function getPositionsFailed(payload) {
    return {
        type: USER_ACTIONS.GET_POSITIONS_FAILED,
        payload
    }
}

export function getPositionsSuccess(payload) {
    return {
        type: USER_ACTIONS.GET_POSITIONS_SUCCESS,
        payload
    }
}

export function getTransTypes() {
    return async dispatch => {
        dispatch(getTransTypesStart());
        ipcRenderer.send('get transtypes');
        ipcRenderer.on('return transtypes', async (event, data) => {
            if(data.error) {
                await setTimeout(() => {
                    dispatch(getTransTypesFailed(data.error));
                }, 100);
            } else {
                await setTimeout(() => {
                    dispatch(getTransTypesSuccess({
                        lastLoaded: 'transtypes',
                        transtypes: data.transtypes
                    }));
                }, 100);
            }
        });
    }
}

export function getTransTypesStart() {
    return {
        type: USER_ACTIONS.GET_TRANSTYPES_START,
    }
}

export function getTransTypesFailed(payload) {
    return {
        type: USER_ACTIONS.GET_TRANSTYPES_FAILED,
        payload
    }
}

export function getTransTypesSuccess(payload) {
    return {
        type: USER_ACTIONS.GET_TRANSTYPES_SUCCESS,
        payload
    }
}

export function getMagazineTypes() {
    return async dispatch => {
        dispatch(getMagazineTypesStart());
        ipcRenderer.send('get magazinetypes');
        ipcRenderer.on('return magazinetypes', async (event, data) => {
            if(data.error) {
                await setTimeout(() => {
                    dispatch(getMagazineTypesFailed(data.error));
                }, 100);
            } else {
                await setTimeout(() => {
                    dispatch(getMagazineTypesSuccess({
                        lastLoaded: 'magazinetypes',
                        magazinetypes: data.magazinetypes
                    }));
                }, 100);
            }
        });
    }
}

export function getMagazineTypesStart() {
    return {
        type: USER_ACTIONS.GET_MAGAZINETYPES_START,
    }
}

export function getMagazineTypesFailed(payload) {
    return {
        type: USER_ACTIONS.GET_MAGAZINETYPES_FAILED,
        payload
    }
}

export function getMagazineTypesSuccess(payload) {
    return {
        type: USER_ACTIONS.GET_MAGAZINETYPES_SUCCESS,
        payload
    }
}

export function getOrderTypes() {
    return async dispatch => {
        dispatch(getOrderTypesStart());
        ipcRenderer.send('get ordertypes');
        ipcRenderer.on('return ordertypes', async (event, data) => {
            if(data.error) {
                await setTimeout(() => {
                    dispatch(getOrderTypesFailed(data.error));
                }, 100);
            } else {
                await setTimeout(() => {
                    dispatch(getOrderTypesSuccess({
                        lastLoaded: 'ordertypes',
                        ordertypes: data.ordertypes
                    }));
                }, 100);
            }
        });
    }
}

export function getOrderTypesStart() {
    return {
        type: USER_ACTIONS.GET_ORDERTYPES_START,
    }
}

export function getOrderTypesFailed(payload) {
    return {
        type: USER_ACTIONS.GET_ORDERTYPES_FAILED,
        payload
    }
}

export function getOrderTypesSuccess(payload) {
    return {
        type: USER_ACTIONS.GET_ORDERTYPES_SUCCESS,
        payload
    }
}

export function getDistricts() {
    return async dispatch => {
        console.log('test');
        dispatch(getDistrictsStart());
        ipcRenderer.send('get districts');
        console.log('test');
        ipcRenderer.on('return districts', async (event, data) => {
            if(data.error) {
                await setTimeout(() => {
                    dispatch(getDistrictsFailed(data.error));
                }, 100);
            } else {
                await setTimeout(() => {
                    dispatch(getDistrictsSuccess({
                        lastLoaded: 'districts',
                        districts: data.districts
                    }));
                }, 100);
            }
        });
    }
}

export function getDistrictsStart() {
    return {
        type: USER_ACTIONS.GET_DISTRICTS_START,
    }
}

export function getDistrictsFailed(payload) {
    return {
        type: USER_ACTIONS.GET_DISTRICTS_FAILED,
        payload
    }
}

export function getDistrictsSuccess(payload) {
    return {
        type: USER_ACTIONS.GET_DISTRICTS_SUCCESS,
        payload
    }
}

export function getBlocks() {
    return async dispatch => {
        console.log('test');
        dispatch(getBlocksStart());
        ipcRenderer.send('get blocks');
        console.log('test');
        ipcRenderer.on('return blocks', async (event, data) => {
            console.log('test');
            if(data.error) {
                await setTimeout(() => {
                    dispatch(getBlocksFailed(data.error));
                }, 100);
            } else {
                await setTimeout(() => {
                    dispatch(getBlocksSuccess({
                        lastLoaded: 'blocks',
                        blocks: data.blocks
                    }));
                }, 100);
            }
        });
    }
}

export function getBlocksStart() {
    return {
        type: USER_ACTIONS.GET_BLOCKS_START,
    }
}

export function getBlocksFailed(payload) {
    return {
        type: USER_ACTIONS.GET_BLOCKS_FAILED,
        payload
    }
}

export function getBlocksSuccess(payload) {
    return {
        type: USER_ACTIONS.GET_BLOCKS_SUCCESS,
        payload
    }
}

export function getClients() {
    return async dispatch => {
        dispatch(getClientsStart());
        ipcRenderer.send('get clients');
        ipcRenderer.on('return clients', async (event, data) => {
            if(data.error) {
                await setTimeout(() => {
                    dispatch(getClientsFailed(data.error));
                }, 100);
            } else {
                await setTimeout(() => {
                    dispatch(getClientsSuccess({
                        lastLoaded: 'clients',
                        clients: data.clients
                    }));
                }, 100);
            }
        });
    }
}

export function getClientsStart() {
    return {
        type: USER_ACTIONS.GET_CLIENTS_START,
    }
}

export function getClientsFailed(payload) {
    return {
        type: USER_ACTIONS.GET_CLIENTS_FAILED,
        payload
    }
}

export function getClientsSuccess(payload) {
    return {
        type: USER_ACTIONS.GET_CLIENTS_SUCCESS,
        payload
    }
}

export function getTransactions() {
    return async dispatch => {
        dispatch(getTransactionsStart());
        ipcRenderer.send('get transactions');
        ipcRenderer.on('return transactions', async (event, data) => {
            if(data.error) {
                await setTimeout(() => {
                    dispatch(getTransactionsFailed(data.error));
                }, 100);
            } else {
                await setTimeout(() => {
                    dispatch(getTransactionsSuccess({
                        lastLoaded: 'transactions',
                        transactions: data.transactions
                    }));
                }, 100);
            }
        });
    }
}

export function getTransactionsStart() {
    return {
        type: USER_ACTIONS.GET_TRANSACTIONS_START,
    }
}

export function getTransactionsFailed(payload) {
    return {
        type: USER_ACTIONS.GET_TRANSACTIONS_FAILED,
        payload
    }
}

export function getTransactionsSuccess(payload) {
    return {
        type: USER_ACTIONS.GET_TRANSACTIONS_SUCCESS,
        payload
    }
}

export function getPensions() {
    return async dispatch => {
        dispatch(getPensionsStart());
        ipcRenderer.send('get pensions');
        ipcRenderer.on('return pensions', async (event, data) => {
            if(data.error) {
                await setTimeout(() => {
                    dispatch(getPensionsFailed(data.error));
                }, 100);
            } else {
                await setTimeout(() => {
                    dispatch(getPensionsSuccess({
                        lastLoaded: 'pensions',
                        pensions: data.pensions
                    }));
                }, 100);
            }
        });
    }
}

export function getPensionsStart() {
    return {
        type: USER_ACTIONS.GET_PENSIONS_START,
    }
}

export function getPensionsFailed(payload) {
    return {
        type: USER_ACTIONS.GET_PENSIONS_FAILED,
        payload
    }
}

export function getPensionsSuccess(payload) {
    return {
        type: USER_ACTIONS.GET_PENSIONS_SUCCESS,
        payload
    }
}

export function getSubscriptions() {
    return async dispatch => {
        dispatch(getSubscriptionsStart());
        ipcRenderer.send('get subscriptions');
        ipcRenderer.on('return subscriptions', async (event, data) => {
            if(data.error) {
                await setTimeout(() => {
                    dispatch(getSubscriptionsFailed(data.error));
                }, 100);
            } else {
                await setTimeout(() => {
                    dispatch(getSubscriptionsSuccess({
                        lastLoaded: 'subscriptions',
                        subscriptions: data.subscriptions
                    }));
                }, 100);
            }
        });
    }
}

export function getSubscriptionsStart() {
    return {
        type: USER_ACTIONS.GET_SUBSCRIPTIONS_START,
    }
}

export function getSubscriptionsFailed(payload) {
    return {
        type: USER_ACTIONS.GET_SUBSCRIPTIONS_FAILED,
        payload
    }
}

export function getSubscriptionsSuccess(payload) {
    return {
        type: USER_ACTIONS.GET_SUBSCRIPTIONS_SUCCESS,
        payload
    }
}

export function getOrders() {
    return async dispatch => {
        dispatch(getOrdersStart());
        ipcRenderer.send('get orders');
        ipcRenderer.on('return orders', async (event, data) => {
            if(data.error) {
                await setTimeout(() => {
                    dispatch(getOrdersFailed(data.error));
                }, 100);
            } else {
                await setTimeout(() => {
                    dispatch(getOrdersSuccess({
                        lastLoaded: 'orders',
                        orders: data.orders
                    }));
                }, 100);
            }
        });
    }
}

export function getOrdersStart() {
    return {
        type: USER_ACTIONS.GET_ORDERS_START,
    }
}

export function getOrdersFailed(payload) {
    return {
        type: USER_ACTIONS.GET_ORDERS_FAILED,
        payload
    }
}

export function getOrdersSuccess(payload) {
    return {
        type: USER_ACTIONS.GET_ORDERS_SUCCESS,
        payload
    }
}

export function getWorkers() {
    return async dispatch => {
        dispatch(getWorkersStart());
        ipcRenderer.send('get workers');
        ipcRenderer.on('return workers', async (event, data) => {
            if(data.error) {
                setTimeout(() => {
                    dispatch(getWorkersFailed(data.error));
                }, 100);
            } else {
                setTimeout(() => {
                    dispatch(getWorkersSuccess({
                        lastLoaded: 'workers',
                        workers: data.workers
                    }));
                }, 100);
            }
        });
    }
}

export function getWorkersStart() {
    return {
        type: USER_ACTIONS.GET_WORKERS_START,
    }
}

export function getWorkersFailed(payload) {
    return {
        type: USER_ACTIONS.GET_WORKERS_FAILED,
        payload
    }
}

export function getWorkersSuccess(payload) {
    return {
        type: USER_ACTIONS.GET_WORKERS_SUCCESS,
        payload
    }
}

export function positionSubmit(payload) {
    return async dispatch => {
        if(payload.new) {
            ipcRenderer.send('submit new position', {
                position: payload.position
            });
        } else {
            ipcRenderer.send('update position', {
                id: payload.id,
                position: payload.position
            });
        }
        setTimeout(() => {
            dispatch(getPositions())
        }, 50);
    }
}

export function positionDelete(payload) {
    return async dispatch => {
        ipcRenderer.send('delete position', {
            id: payload.id
        });
        setTimeout(() => {
            dispatch(getPositions());
        }, 50)
    }
}

export function magazineTypeSubmit(payload) {
    return async dispatch => {
        if(payload.new) {
            ipcRenderer.send('submit new magazinetype', {
                type: payload.type
            });
        } else {
            ipcRenderer.send('update magazinetype', {
                id: payload.id,
                type: payload.type
            });
        }
        setTimeout(() => {
            dispatch(getMagazineTypes())
        }, 50);
    }
}

export function magazineTypeDelete(payload) {
    return async dispatch => {
        ipcRenderer.send('delete magazinetype', {
            id: payload.id
        });
        setTimeout(() => {
            dispatch(getMagazineTypes());
        }, 50)
        
    }
}

export function orderTypeSubmit(payload) {
    return async dispatch => {
        if(payload.new) {
            ipcRenderer.send('submit new ordertype', {
                type: payload.type
            });
        } else {
            ipcRenderer.send('update ordertype', {
                id: payload.id,
                type: payload.type
            });
        }
        setTimeout(() => {
            dispatch(getOrderTypes())
        }, 50);
    }
}

export function orderTypeDelete(payload) {
    return async dispatch => {
        ipcRenderer.send('delete ordertype', {
            id: payload.id
        });
        setTimeout(() => {
            dispatch(getOrderTypes());
        }, 50)
        
    }
}

export function transTypeSubmit(payload) {
    return async dispatch => {
        if(payload.new) {
            ipcRenderer.send('submit new transtype', {
                type: payload.type,
                cost: payload.cost
            });
        } else {
            ipcRenderer.send('update transtype', {
                id: payload.id,
                type: payload.type,
                cost: payload.cost
            });
        }
        setTimeout(() => {
            dispatch(getTransTypes())
        }, 50);
    }
}

export function transTypeDelete(payload) {
    return async dispatch => {
        ipcRenderer.send('delete transtype', {
            id: payload.id
        });
        setTimeout(() => {
            dispatch(getTransTypes());
        }, 50)
        
    }
}

export function districtSubmit(payload) {
    return async dispatch => {
        if(payload.new) {
            ipcRenderer.send('submit new district', {
                workerId: payload.workerId
            });
        } else {
            ipcRenderer.send('update district', {
                id: payload.id,
                workerId: payload.workerId
            });
        }
        setTimeout(() => {
            dispatch(getDistricts())
        }, 50);
    }
}

export function districtDelete(payload) {
    return async dispatch => {
        ipcRenderer.send('delete district', {
            id: payload.id
        });
        setTimeout(() => {
            dispatch(getDistricts());
        }, 50)
        
    }
}

export function blockSubmit(payload) {
    return async dispatch => {
        if(payload.new) {
            ipcRenderer.send('submit new block', {
                address: payload.address,
                distId: payload.distId
            });
        } else {
            ipcRenderer.send('update block', {
                id: payload.id,
                address: payload.address,
                distId: payload.distId
            });
        }
        setTimeout(() => {
            dispatch(getBlocks())
        }, 50);
    }
}

export function blockDelete(payload) {
    return async dispatch => {
        ipcRenderer.send('delete block', {
            id: payload.id
        });
        setTimeout(() => {
            dispatch(getBlocks());
        }, 50)
        
    }
}

export function magazineSubmit(payload) {
    return async dispatch => {
        if(payload.new) {
            ipcRenderer.send('submit new magazine', {
                name: payload.name,
                typeId: payload.typeId
            });
        } else {
            ipcRenderer.send('update magazine', {
                id: payload.id,
                name: payload.name,
                typeId: payload.typeId
            });
        }
        setTimeout(() => {
            dispatch(getMagazines())
        }, 50);
    }
}

export function magazineDelete(payload) {
    return async dispatch => {
        ipcRenderer.send('delete magazine', {
            id: payload.id
        });
        setTimeout(() => {
            dispatch(getMagazines());
        }, 50)
        
    }
}

export function workerSubmit(payload) {
    return async dispatch => {
        if(payload.new) {
            ipcRenderer.send('submit new worker', {
                name: payload.name,
                positionId: payload.positionId,
                phoneNumber: payload.phoneNumber
            });
        } else {
            ipcRenderer.send('update worker', {
                id: payload.id,
                name: payload.name,
                positionId: payload.positionId,
                phoneNumber: payload.phoneNumber
            });
        }
        setTimeout(() => {
            dispatch(getWorkers())
        }, 50);
    }
}

export function workerDelete(payload) {
    return async dispatch => {
        ipcRenderer.send('delete worker', {
            id: payload.id
        });
        setTimeout(() => {
            dispatch(getWorkers());
        }, 50)
        
    }
}

export function clientSubmit(payload) {
    return async dispatch => {
        console.log(payload);
        if(payload.new) {
            ipcRenderer.send('submit new client', {
                name: payload.name,
                phoneNumber: payload.phoneNumber,
                room: payload.room,
                blockId: payload.blockId
            });
        } else {
            ipcRenderer.send('update client', {
                id: payload.id,
                name: payload.name,
                phoneNumber: payload.phoneNumber,
                room: payload.room,
                blockId: payload.blockId
            });
        }
        setTimeout(() => {
            dispatch(getClients())
        }, 50);
    }
}

export function clientDelete(payload) {
    return async dispatch => {
        ipcRenderer.send('delete client', {
            id: payload.id
        });
        setTimeout(() => {
            dispatch(getClients());
        }, 50)
    }
}

export function pensionSubmit(payload) {
    return async dispatch => {
        if(payload.new) {
            ipcRenderer.send('submit new pension', {
                clientId: payload.clientId,
                workerId: payload.workerId,
                total: payload.total,
                date: payload.date
            });
        } else {
            ipcRenderer.send('update pension', {
                id: payload.id,
                clientId: payload.clientId,
                workerId: payload.workerId,
                total: payload.total,
                date: payload.date
            });
        }
        setTimeout(() => {
            dispatch(getPensions())
        }, 50);
    }
}

export function pensionDelete(payload) {
    return async dispatch => {
        ipcRenderer.send('delete pension', {
            id: payload.id
        });
        setTimeout(() => {
            dispatch(getPensions());
        }, 50)
    }
}

export function transactionSubmit(payload) {
    return async dispatch => {
        if(payload.new) {
            ipcRenderer.send('submit new transaction', {
                typeId: payload.typeId,
                clientId: payload.clientId,
                workerId: payload.workerId,
                total: payload.total,
                tranDate: payload.tranDate
            });
        } else {
            ipcRenderer.send('update transaction', {
                id: payload.id,
                typeId: payload.typeId,
                clientId: payload.clientId,
                workerId: payload.workerId,
                total: payload.total,
                tranDate: payload.tranDate
            });
        }
        setTimeout(() => {
            dispatch(getTransactions())
        }, 50);
    }
}

export function transactionDelete(payload) {
    return async dispatch => {
        ipcRenderer.send('delete transaction', {
            id: payload.id
        });
        setTimeout(() => {
            dispatch(getTransactions());
        }, 50)
    }
}

export function subscriptionSubmit(payload) {
    return async dispatch => {
        if(payload.new) {
            ipcRenderer.send('submit new subscription', {
                workerId: payload.workerId,
                clientId: payload.clientId,
                magazineId: payload.magazineId,
                subBegin: payload.subBegin,
                subEnd: payload.subEnd,
                total: payload.total
            });
        } else {
            ipcRenderer.send('update subscription', {
                id: payload.id,
                workerId: payload.workerId,
                clientId: payload.clientId,
                magazineId: payload.magazineId,
                subBegin: payload.subBegin,
                subEnd: payload.subEnd,
                total: payload.total
            });
        }
        setTimeout(() => {
            dispatch(getSubscriptions())
        }, 50);
    }
}

export function subscriptionDelete(payload) {
    return async dispatch => {
        ipcRenderer.send('delete subscription', {
            id: payload.id
        });
        setTimeout(() => {
            dispatch(getSubscriptions());
        }, 50)
    }
}

export function orderSubmit(payload) {
    return async dispatch => {
        if(payload.new) {
            ipcRenderer.send('submit new order', {
                typeId: payload.typeId,
                sender: payload.sender,
                clientId: payload.clientId,
                weight: payload.weight,
                cost: payload.cost,
                pickupDate: payload.pickupDate
            });
        } else {
            ipcRenderer.send('update subscription', {
                id: payload.id,
                typeId: payload.typeId,
                sender: payload.sender,
                clientId: payload.clientId,
                weight: payload.weight,
                cost: payload.cost,
                pickupDate: payload.pickupDate
            });
        }
        setTimeout(() => {
            dispatch(getOrders())
        }, 50);
    }
}

export function orderDelete(payload) {
    return async dispatch => {
        ipcRenderer.send('delete order', {
            id: payload.id
        });
        setTimeout(() => {
            dispatch(getOrders());
        }, 50)
    }
}