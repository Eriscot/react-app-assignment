import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import list from '../../constants/list';
import { NavLink } from 'react-router-dom';
import './DrawerList.css';

export default props => {
    console.log(props);
    return (
        <List>
            {list.sort((a, b) => {
                return a.title > b.title ? 1 : -1;
            }).map(element => (
                <NavLink key={element.title} to={element.link} className={props.location.pathname === element.link ? 'disabled-link' : ''}>
                    <ListItem button>
                        <ListItemIcon>
                            {element.icon}
                        </ListItemIcon>
                        <ListItemText>{element.title}</ListItemText>
                    </ListItem>
                </NavLink>
            ))}
        </List>
    );
}