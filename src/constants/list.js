import React from 'react';
import listItem from "./listItem";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import InboxIcon from '@material-ui/icons/Inbox';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';

const list = [
    new listItem({
        title: 'Операции',
        icon: <MonetizationOnIcon />,
        link: '/payments'
    }),
    new listItem({
        title: 'Посылки',
        icon: <InboxIcon />,
        link: '/orders'
    }),
    new listItem({
        title: 'Пенсии',
        icon: <AccountBalanceWalletIcon />,
        link: '/'
    }),
    new listItem({
        title: 'Подписки',
        icon: <SubscriptionsIcon />,
        link: '/subsription'
    })
];

export default list;