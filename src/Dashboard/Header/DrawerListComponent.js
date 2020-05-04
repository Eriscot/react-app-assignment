import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import list from '../../constants/list';
import { NavLink } from 'react-router-dom';
import './DrawerList.css';

export default props => {
    console.log(props);
    return (
        <List>
            {list.map(element => (
                <NavLink to={element.link} className={props.location.pathname === element.link ? 'disabled-link' : ''}>
                    <ListItem button key={element.title}>
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