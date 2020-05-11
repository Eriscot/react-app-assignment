import React from 'react';
import { 
    AppBar, 
    Toolbar, 
    IconButton, 
    Drawer, 
    makeStyles,
    Divider, 
    Avatar, 
    CssBaseline, 
    Popper, 
    MenuList, 
    MenuItem, 
    ClickAwayListener, 
    Paper, 
    Grow
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import DrawerList from './DrawerList';

const useStyles = makeStyles((theme) => ({
    drawerHeader: {
        display: 'flex',
        alignItems: 'flex-start',
        padding: theme.spacing(0, 1),
        justifyContent: 'flex-start',
    },
    hide: {
        display: 'none',
    },
    drawerClose: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    drawerWidth: {
        width: 300
    },
    menuButtonOpen: {
        marginRight: 'auto'
    },
    menuButtonClose: {
        marginLeft: 'auto'
    }
}));

export default function (props) {
    const classes = useStyles();
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [openMenu, setOpenMenu] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleDrawer = () => setOpenDrawer(!openDrawer);

    const handleToggle = () => {
        setOpenMenu((prevOpen) => !prevOpen);
    };
    
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpenMenu(false);
    };

    const handleForm = () => {
        props.history.push('/forms');
    }

    const handleLogout = () => {
        console.log(props);
        props.userLogout();
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenMenu(false);
        }
    }

    return(
        <>
            <CssBaseline />
            <AppBar
                position="sticky"
                color="inherit">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleDrawer}
                        className={classes.menuButtonOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <IconButton
                        ref={anchorRef}
                        onClick={handleToggle}
                        >
                        <Avatar>С</Avatar>
                    </IconButton>
                    <Popper open={openMenu} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={openMenu} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                        <MenuItem onClick={handleForm}>Формы</MenuItem>
                                        <MenuItem onClick={handleLogout}>Выход</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                            </Grow>
                        )}
                        </Popper>
                </Toolbar>
            </AppBar>
                <Drawer
                    anchor="left"
                    open={openDrawer}
                    classes={{
                        paper: clsx(classes.drawerWidth)
                    }}
                >
                    <Toolbar>
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleDrawer}
                            className={classes.menuButtonClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <DrawerList />
                </Drawer>
        </>
    );
}