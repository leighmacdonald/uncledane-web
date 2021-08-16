import React, {useEffect, useState} from "react"
import Grid from "@material-ui/core/Grid";
import carouselDiscord from '../images/carousel_discord.webm'
import carouselCredits from '../images/carousel_credits.webm'
import carouselMerch from '../images/carousel_merch.webm'
import carouselTwitter from '../images/carousel_twitter.webm'
import carouselSettings from '../images/carousel_settings.webm'
import carouselServers from '../images/carousel_servers.webm'
import Link from "react-router-dom";
import {Button} from "@material-ui/core";

interface ImgLink {
    to: string
    img: string
    alt?: string
}

const AutoPlayVideo = (props: { path: string }) =>
    <video
        onMouseEnter={(e) => {
            const element = e.target as HTMLVideoElement;
            element.play();
        }}
        onMouseLeave={(e) => {
            const element = e.target as HTMLMediaElement;
            element.pause();
            element.currentTime = 0;
        }}
        src={props.path}
        width={"100%"}
    />


export const Home = () => {
    const [newest, setNewest] = useState<string>("")
    useEffect(() => {
        async function loadVideo() {
            const channelID = "UCu0PSyLD5p_J5osLk5UD0pw";
            const reqURL = "https://www.youtube.com/feeds/videos.xml?channel_id=UCu0PSyLD5p_J5osLk5UD0pw";
            const r = await fetch("https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(reqURL)+ channelID, {
                headers: {
                    "Content-Type": "application/rss+xml"
                }
            });
            const json = await r.json() as any;
            const link = json.items[0].link;
            const id = link.substr(link.indexOf("=") + 1);
            setNewest("https://youtube.com/embed/" + id + "?controls=0&showinfo=0&rel=0")
        }
        // noinspection JSIgnoredPromiseFromCall
        loadVideo()
    }, [])

    const imgLinks: ImgLink[] = [
        {to: "https://www.discord.gg/uncledane", alt: "", img: carouselDiscord},
        {to: "/servers", alt: "", img: carouselServers},
        {to: "/merch", alt: "", img: carouselMerch},
        {to: "https://twitter.com/danekevincook", alt: "", img: carouselTwitter},
        {to: "/credits", alt: "", img: carouselCredits},
        {to: "/settings", alt: "", img: carouselSettings}
    ]

    return <>
        <Grid container spacing={3}>
            {imgLinks.map((props: ImgLink, i: number) => {
                const {to, img} = props;
                return <Grid item lg={4} md={6} xs={6}  key={`${i}-car-link`}>
                    <Button component={Link as any} to={to}>
                        <AutoPlayVideo path={img} key={to}/>
                    </Button>
                </Grid>
            })}
        </Grid>
        {newest !== "" && <Grid container>
            <Grid item xs={12} style={{textAlign: "center"}}>
                <iframe id="youtube_video" width="960" height="540" frameBorder="0" allowFullScreen src={newest}/>
            </Grid>
        </Grid>}
    </>
}