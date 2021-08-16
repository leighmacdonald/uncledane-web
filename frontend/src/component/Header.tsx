import Grid from "@material-ui/core/Grid";
import {Button, ButtonGroup, Paper, Link as MatLink} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import imgHeader from '../images/header_1920_450.jpg'
import {Link} from "react-router-dom";

export interface HeaderLink {
    title: string
    url: string
    submenu?: HeaderLink[]
}

const useStyles = makeStyles((theme) => ({
    headerContainer: {
        position: 'relative',
        backgroundImage: 'url('+imgHeader+')',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '300px',
        marginBottom: '3rem'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        height: '300px',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        height: '300px',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
    container: {

    },
    buttons: {
        backgroundColor: theme.palette.secondary.main,
    }
}));

const MenuButton = (link: HeaderLink): JSX.Element => {
    return <Button disableElevation component={Link} variant="contained" color={"secondary"} to={link.url}>{link.title}</Button>
}

export const Header = (props: { links: HeaderLink[]}) => {
    const classes = useStyles();
    return (
        <Paper className={classes.headerContainer}>
            <div className={classes.overlay} />
            <Grid container>
                <Grid item md={6}>
                    <div className={classes.mainFeaturedPostContent}>
                        <MatLink variant="subtitle1" href="#">
                            {"bap"}
                        </MatLink>
                    </div>
                </Grid>

                <Grid item xs={12} className={classes.buttons}>
                    <ButtonGroup disableElevation variant="contained" color="primary" aria-label="contained primary button group">
                    {props.links.map(((l, i) => {return <MenuButton {...l} key={`${i}-${l.url}`}/>}))}
                    </ButtonGroup>
                </Grid>
            </Grid>
        </Paper>
    )
}