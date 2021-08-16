import React from "react"
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Link} from "@material-ui/core";
import settingsZip from "../public/dl/Uncle_Dane_Configs_v1.zip"

const useStyles = makeStyles(() => ({
    centered: {
        textAlign: 'center',
    },
}))

export const Settings = () => {
    const classes = useStyles();
    return <>
        <Grid container spacing={8}>
            <Grid item lg={12}>
                <Typography variant={"h1"}>Settings</Typography>
                <Typography variant={"h2"}>HUD</Typography>
                <Typography variant={"body1"} className={classes.centered}>
                    I use a custom HUD in TF2. From 2018 onward, I’ve used <Link href="https://huds.tf/forum/showthread.php?tid=207">BUDHUD</Link>.
                    Follow the <Link
                    href="https://github.com/rbjaxter/budhud/wiki/YouTube-&-Twitch-User-HUDs">directions</Link> on the wiki
                    to enable my exact settings, such as the centered metal count and custom menu background.
                </Typography>
                <Typography variant={"body1"} className={classes.centered}>
                    From 2014 to 2018 I used <Link href="https://huds.tf/forum/showthread.php?tid=377">RAYSHUD</Link>.
                </Typography>
            </Grid>
            <Grid item lg={12}>
                <Typography variant={"h2"}>Custom Engineer Animations</Typography>
                <Typography variant={"body1"} className={classes.centered}>
                    I use custom engineer viewmodel animations. In Casual Mode, these animations do
                    not work without doing a workaround, but they usually work in community servers
                    like <Link href="/servers">Uncletopia</Link>. Click <Link href="https://gamebanana.com/skins/129805">HERE</Link> to download them.
                </Typography>
            </Grid>
            <Grid item lg={12}>
                <Typography variant={"h2"}>Custom Hitsound</Typography>
                <Typography variant={"body1"} className={classes.centered}>
                    I use a custom hitsound in TF2. You can download it <Link href="https://gamebanana.com/sounds/21865">HERE</Link>. Name the
                    file <kbd>hitsound.wav</kbd> and put in the <kbd>tf/custom/stuff/sound/ui</kbd> folder.
                </Typography>
            </Grid>
            <Grid item lg={12}>
                <Typography variant={"h2"}>Custom Configs</Typography>
                <Typography variant={"body1"} className={classes.centered}>
                    I use a custom config, which is basically just a collection of files that
                    manage my in-game settings. This includes my custom binds, scripts, and visual settings
                    that I use every day.
                </Typography>
                <Typography variant={"body1"} className={classes.centered}>
                    <Button component={Link} href={settingsZip} color={"primary"}>Download Config</Button>
                </Typography>
                <Typography variant={"body1"} className={classes.centered}>
                    Note: Uncle Dane’s configs <i>ARE</i> intended to be a resource for you to pull from in order to improve
                    your own established settings. They are <i>NOT</i> a config pack like <a href="https://mastercomfig.com/">mastercoms</a>
                    or <Link href="https://github.com/Comanglia/ComangliaComs">comanglia</Link>. Please refer to the README
                    in the downloadable folder for more information.
                </Typography>
            </Grid>
        </Grid>

    </>
}