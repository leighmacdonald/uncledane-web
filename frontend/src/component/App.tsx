import CssBaseline from '@material-ui/core/CssBaseline';
import {Container, ThemeProvider} from "@material-ui/core";
import {Header, HeaderLink} from "./Header";
import Footer from "./Footer";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import React from 'react';
import {Settings} from "./Settings";
import {Home} from "./Home";
import {Servers} from "./Servers";
import {Credits} from "./Credits";
import {Donate} from "./Donate";
import {tf2theme} from "../Theme";

export const App = () => {
    //const classes = useStyles();
    const headingLinks: HeaderLink[] = [
        {title: "Uncle Dane", url: "/"},
        {
            title: "Youtube", url: "https://www.youtube.com/uncledane", submenu: [
                {title: "Uncle Dane", url: "https://www.youtube.com/uncledane"},
                {title: "2Uncle2Dane", url: "https://www.youtube.com/2uncle2dane"},
                {title: "Whatever we want", url: "https://www.youtube.com/user/itswhateverwewant"}
            ],
        },
        {
            title: "Community", url: "#", submenu: [
                {title: "Discord", url: "https://www.discord.gg/uncledane"},
                {title: "Steam Group", url: "https://steamcommunity.com/groups/UncleDane"},
            ]
        },
        {title: "Servers", url: "/servers"},
        {
            title: "Social", url: "#", submenu: [
                {title: "Instagram", url: "https://www.instagram.com/danekevincook/"}
            ]
        },
        {
            title: "Music", url: "#", submenu: [
                {title: "Spotify", url: "https://open.spotify.com/artist/6h8zXsBuNnbaHv8lIH5yrd"},
                {title: "Bandcamp", url: "https://uncledane.bandcamp.com/"},
                {title: "Soundcloud", url: "https://soundcloud.com/uncle-dane"}
            ]
        },
        {title: "Settings", url: "/settings"},
        {title: "Credits", url: "/credits"},
        {title: "Merch", url: "https://uncledane.creator-spring.com/"},
        {title: "Donate", url: "/donate"},
    ]
    return (
        <Router>
            <React.Fragment>
                <ThemeProvider theme={tf2theme}>
                    <CssBaseline/>
                    <Container maxWidth="lg">
                        <Header links={headingLinks}/>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/servers" component={Servers}/>
                            <Route exact path="/settings" component={Settings}/>
                            <Route exact path="/credits" component={Credits}/>
                            <Route exact path="/donate" component={Donate}/>
                        </Switch>
                        <Footer/>
                    </Container>
                </ThemeProvider>
            </React.Fragment>
        </Router>
    )

}