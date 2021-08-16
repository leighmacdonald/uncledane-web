import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {makeStyles} from "@material-ui/core/styles";
import thinking from '../images/thinking_about_feet.png'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="left">
            <Link color="inherit" href="https://uncledane.com/">
                ©️ Copyright Uncle Dane Heavy Industries
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: "#583A2CFF",
        marginTop: theme.spacing(3),
        padding: theme.spacing(6, 0),
        backgroundImage: `url(${thinking})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
    },
}));

export default function Footer() {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Container maxWidth="lg">
                <Typography variant="body2" align="left" color="textSecondary" gutterBottom>
                    <Link color={"inherit"} href={"mailto:danethebrain@gmail.com"}>✉️ Business Inquiries </Link>
                </Typography>
                <Typography variant="body2" align="left" color="textSecondary" component="p" gutterBottom>
                    <Link color={"inherit"} href={"https://github.com/leighmacdonald/uncledane-web/"}>🏗️ Leigh MacDonald (Code)</Link>
                </Typography>
                <Typography variant="body2" align="left" color="textSecondary" component="p" gutterBottom>
                    <Link color={"inherit"} href={"https://www.instagram.com/claudialutz_art/"}>🎨 Claudia Lutz (Animations)</Link>
                </Typography>
                <Copyright/>
            </Container>
        </footer>
    );
}
