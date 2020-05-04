import React from 'react';
import listItem from "./listItem";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import InboxIcon from '@material-ui/icons/Inbox';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import WorkIcon from '@material-ui/icons/Work';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ApartmentIcon from '@material-ui/icons/Apartment';
import HomeIcon from '@material-ui/icons/Home';

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
        link: '/pensions'
    }),
    new listItem({
        title: 'Подписки',
        icon: <SubscriptionsIcon />,
        link: '/subsription'
    }),
    new listItem({
        title: 'Клиенты',
        icon: <SupervisorAccountIcon />,
        link: '/clients'
    }),
    new listItem({
        title: 'Издания',
        icon: <MenuBookIcon />,
        link: '/magazines'
    }),
    new listItem({
        title: 'Тип операции',
        icon: <LocalAtmIcon />,
        link: '/paytypes'
    }),
    new listItem({
        title: 'Должности',
        icon: <AssignmentIndIcon />,
        link: '/positions'
    }),
    new listItem({
        title: 'Сотрудники',
        icon: <WorkIcon />,
        link: '/workers',
    }),
    new listItem({
        title: 'Участки',
        icon: <ApartmentIcon />,
        link: '/districts'
    }),
    new listItem({
        title: 'Дома',
        icon: <HomeIcon />,
        link: '/blocks'
    })
];

export default list;