import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import list from '../../constants/list';

export default function() {
    return (
        <List>
            {list.map(element => (
                <ListItem button key={element.title}>
                    <ListItemIcon>
                        {element.icon}
                    </ListItemIcon>
                    <ListItemText>{element.title}</ListItemText>
                </ListItem>
            ))}
        </List>
    );
}