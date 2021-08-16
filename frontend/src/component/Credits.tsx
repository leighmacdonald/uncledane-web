import React from "react"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import {Avatar, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import MusicNoteOutlinedIcon from '@material-ui/icons/MusicNote';

interface Credit {
    url: string
    title: string
    music: string[]
}

const creds: Credit[] = [
    {
        url: "https://www.youtube.com/watch?v=S-xG4yv5AHE",
        title: "Stock Engineer: THE WRENCH",
        music: [
            "Halo 3 -- Luck",
            "Halo 3 -- Behold A Pale Horse",
            "Halo 3 -- Farthest Outpost",
            "Halo 3 -- Out Of Shadow",
            "Halo 3 -- One Final Effort",
            "Halo CE -- Opening Suite",
        ]
    },
    {
        url: "https://www.youtube.com/watch?v=WFtnWHhyVO4",
        title: "Stock Engineer: THE PISTOL",
        music: [
            "Halo 2 -- Halo Theme (Mjolnir Mix)",
            "Halo 2 -- In Amber Clad",
            "Halo 2 -- Mombasa Suite",
            "Halo 2 -- The Last Spartan",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=bUbUqsoI4OQ",
        title: "Stock Engineer: THE SHOTGUN",
        music: [
            "Halo: CE -- Opening Suite",
            "Halo: CE -- Truth and Reconciliation Suite",
            "Halo: CE -- Perilous Journey",
            "Halo: CE -- The Gun Pointed At The Head Of The Universe",
            "Halo: CE -- Drumrun",
            "Halo: CE -- A Walk In The Woods",
            "Halo: CE -- Halo",
            "La Caution -- Thé à la Menthe",
            "Guitar Hero II -- Cheap Trick -- Surrender",
            "Berserk -- Guts",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=VdV7Yvwd-u0",
        title: "The Best Bad Map In TF2",
        music: [
            "Halo 2 -- Peril",
            "Super Mario 3D World -- Piranha Creeper Creek",
            "Pokemon OR/AS -- Battle! Uxie/Mesprit/Azelf",
            "Super Smash Bros Ultimate -- Yoshi’s Story 64",
            "Bring Me The Horizon -- Can You Feel My Heart",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=xlyCQCzgZeQ",
        title: "Makin' Bacon",
        music: [
            "Sting -- Epilogue (Nothing 'Bout Me)",
            "Dub Pistols -- Cyclone",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=3u8JBh3ciIs",
        title: "How To Fight Every Class In TF2 (As Engineer) (And Win!)",
        music: [
            "Super Smash Brothers Ultimate -- Menu Theme",
            "Alex Giudici -- More Gun (Alex Giudici Remix)",
            "Team Fortress 2 -- Various Tracks from the TF2 OST",
            "Epidemic Sound -- Various free rights music",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=AU5E_bJycE4",
        title: "Texas Style",
        music: [
            "April March -- Chick Habit",
            "Jurassic 5 -- A Day At The Races",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=cxGJAgaqaL8",
        title: "Scream Fortress Again",
        music: [
            "Team Fortress 2 -- Misfortune Teller",
            "Team Fortress 2 -- Haunted Fortress",
            "Team Fortress 2 -- Carousel of Curses",
            "Undertale -- sans.",
            "Undertale -- Dogbass",
            "Hades -- House of Hades",
            "Hades -- Out of Tartarus",
            "Hades -- Wretched Shades",
            "Hades -- The Painful Way",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=91pcGACXt5M",
        title: "Engie Brain #3 - Using The Jag",
        music: [
            "Animal Crossing: New Leaf -- 8am",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=tvQrOksU-Kg",
        title: "The Panic Attack Is Good, Actually",
        music: [
            "The Elder Scrolls V: Skyrim -- Under An Ancient Sun",
            "Tetris 99 -- Main Theme",
            "Risk of Rain 2 -- Nocturnal Emission",
            "Risk of Rain 2 -- Koppen As Fuck",
            "Risk of Rain 2 -- Thermodynamic Equilibrium",
            "HoopsAndHipHop -- Cianwood City Remix (Pokemon HG/SS)",
            "The Legend of Zelda: Breath of the Wild -- Hateno Ancient Tech Lab",
            "The Legend of Zelda: Breath of the Wild -- Hinox Battle",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=tLYQ__tbCYk",
        title: "*teleports behind you* “Nothin’ personal, pardner…”",
        music: [
            "Team Fortress 2 -- Playing With Danger",
            "Plants VS Zombies -- Main Menu",
            "Plants VS Zombies -- Mini Games",
            "Plants VS Zombies -- The Roof (Horde)",
            "Pokemon DPP -- Battle! Champion Cynthia",
            "Earthworm Jim -- Andy Asteroids",
            "Earthworm Jim -- Down The Tubes",
            "Earthworm Jim -- For Pete’s Sake",
            "Earthworm Jim -- New Junk City",
            "Earthworm Jim -- Snot A Problem",
            "Goldfinger -- Superman (8-Bit Remix by 8-Bit Universe)",
            "Lewis Burns -- Traditional Didgeridoo Rhythms",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=Z0KFW-Zrh9I",
        title: "Engie Brain #2 -- King of the Hill",
        music: [
            "Animal Crossing: New Leaf -- 8am",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=ZRclhDVtCaE",
        title: "I Still Love The Rescue Ranger",
        music: [
            "Pokemon Sword/Shield -- Marnie’s Theme",
            "Pokemon Sword/Shield -- Battle! Mysterious Being",
            "Pokemon Sword/Shield -- Battle! Gym Leader",
            "Pokemon Sword/Shield -- Wild Area (Version 2)",
            "Pokemon Sword/Shield -- Salon",
            "Pokemon Sword/Shield -- Gym Lobby",
            "Pokemon Sword/Shield -- Gym",
            "Pokemon Sword/Shield -- Turffield",
            "Pokemon GO -- Overworld Theme",
            "Animal Crossing: New Horizons -- 7am",
            "Animal Crossing: New Horizons -- 3am",
            "Animal Crossing: New Horizons -- 3pm",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=YgtSWCt5MgU",
        title: "Impractical Engineering",
        music: [
            "Harry Belafonte -- Jump In The Line",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=6VmvItzjvdw",
        title: "MvM With YouTubers #5",
        music: [
            "Super Smash Brothers WiiU/3DS -- Trailer Theme",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=_dgioprmFPI",
        title: "Why I Main Engineer",
        music: [
            "The Legend of Zelda: Breath of the Wild -- Riding (Day)",
            "Spiderman 2 The Game -- Pizza Theme",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=sgfGkw4Ja5w",
        title: "More Scream Fortress",
        music: [
            "Undertale -- Sans",
            "Undertale -- Megalovania",
            "Kero Kero Bonito -- Flamingo",
            "Nickelback -- Hero",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=W4HOMvM2E0s",
        title: "Engineer Weapons Tier List",
        music: [
            "Team Fortress 2 -- More Gun",
            "Halo: Combat Evolved -- Main Theme",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=06JVyJvYMjY",
        title: "pub.compilation.2019.17618.18632",
        music: [
            "Sugarhill Gang -- Apache (Jump On It)",
            "Alanis Morissette -- Ironic",
            "Metallica -- Master of Puppets",
            "Diddy Kong Racing -- Fossil Canyon",
            "Super Mario Party -- Free Play",
            "Mega Man X -- T34 Staff Roll (Credits Theme)",
            "Curb Your Enthusiasm -- Theme",
            "Duck Hunt -- Theme",
            "Family Guy -- Scene Transition Sting",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=e8y3N9sgyps",
        title: "Engie Brain #1 -- Payload Defense",
        music: [
            "Animal Crossing: New Leaf -- 1pm",
            "Animal Crossing: New Leaf -- 8am",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=toxY8lHfs30",
        title: "Engineer’s Best Weapon",
        music: [
            "Grand Theft Auto IV -- Loading Screen Music",
            "Super Smash Brothers Ultimate -- Battle! (Zinnia) (Pokemon Su/Mo Remix)",
            "Super Smash Brothers Ultimate -- Gang-Plank Galleon (Donkey Kong Country Remix)",
            "Super Smash Brothers Ultimate -- Overworld (Super Mario Brothers 3 Remix)",
            "Super Smash Brothers Ultimate -- Snakey Chantey (Donkey Kong Country 2: Diddy’s Kong Quest Remix)",
            "HoopsAndHipHop -- Goldenrod City Remix (Pokemon HG/SS)",
            "Noisestorm -- Crab Rave",
            "Guns And Roses -- Welcome To The Jungle",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=zLks7Vph674",
        title: "Will It Kritz?",
        music: [
            "Super Smash Brothers Ultimate -- Battle! (Trainer) (Pokemon X/Y Remix)",
            "Super Smash Brothers Ultimate -- Kass’ Theme (The Legend of Zelda: Breath of the Wild Remix)",
            "Super Smash Brothers Ultimate -- Tour (Animal Crossing: New Leaf Remix)",
            "Super Smash Brothers -- Bonus Stage",
            "The Legend of Zelda: Breath of the Wild -- Kass’ Theme",
            "The Legend of Zelda: Breath of the Wild -- Molduga Battle",
            "Minecraft -- Living Mice by C418",
            "Will It Blend -- Theme Song",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=XbtFOCl-OyE",
        title: "Engineering 101: Tools Of The Trade",
        music: [
            "Super Smash Brothers Wii U -- Poke Floats",
            "Super Smash Brothers Wii U -- Pokemon Center (Pokemon Red/Blue)",
            "Super Smash Brothers Wii U -- Route 10",
            "Super Smash Brothers Wii U -- Yoshi’s Story (Version 2)",
            "Super Smash Brothers Wii U -- Yoshi’s Story (Ending)",
            "Super Smash Brothers Wii U -- Final Destination",
            "Jeopardy -- 30 Second Timer",
            "NFL Theme Song",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=tSTxL4vLa3Q",
        title: "Scream Fortress Number Ten",
        music: [
            "BoyWithAni -- Ridin’ Round Town Like I’m Judge Joe Brown",
            "Tommy James & The Shondells -- Crystal Blue Persuasion",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=WHvwijT2ss8",
        title: "Remove Random Crits From TF2",
        music: [
            "Hearthstone -- Tricks of the Trade",
            "Hearthstone -- Two Rogues One Mark",
            "Hearthstone -- Playing With A Full Deck",
            "Hearthstone -- Awash In Ale But Nary A Mug",
            "Hearthstone -- Tabletop Battles",
            "Hearthstone -- Mine Cart Chase",
            "Hearthstone -- Grand Tournament Store Theme",
            "Pokemon HeartGold/SoulSilver -- Hurry Along",
            "Pokemon Gold/Silver/Crystal -- Johto Wild Pokemon (Day)",
            "HoopsAndHipHop -- S.S. Anne Remix ",
            "Miami Nights 1984 -- Ocean Drive",
            "Tchaikovsky -- Waltz Of The Flowers",
            "PinkiePieSwear -- Trixie’s Good Side",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=T880bbxBsOg",
        title: "Noob! You Underestimate The Power Of The Short Circuit!",
        music: [
            "Frank Sinatra -- Blue Moon (8-Bit Remix)",
            "HoopsAndHipHop -- Cianwood City Remix",
            "HoopsAndHipHop -- Goldenrod City Remix",
            "HoopsAndHipHop -- TinBell Tower Remix",
            "HoopsAndHipHop -- S.S. Anne Remix",
            "Saffron City Jazz Cover",
            "PokeMart Reorchestrated",
            "Mega Man 3 -- Spark Man Stage",
            "The Twilight Zone -- Theme",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=I9ieN1ACfP4",
        title: "TF2 Maps (Actual Size)",
        music: [
            "Crash Bandicoot 2 -- Road To Ruin / Ruination",
            "Crash Bandicoot 2 -- Turtle Woods / The Pits / Night Fight",
            "Crash Bandicoot 3 -- Hang em High / High Time / Flaming Passion",
            "Dan Terminus -- Avalanche ",
            "Globglobaggalab Instrumental",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=l8m55CbwBJ0",
        title: "Advanced Engineer Contracts",
        music: [
            "80’s Workout (Royalty Free Synthwave)",
            "Donkey Kong 2 -- Token Tango",
            "Pokemon HeartGold/SoulSilver -- Game Corner",
            "Pokemon HeartGold/SoulSilver -- Radio Route 101",
            "Pokemon HeartGold/SoulSilver -- Viridian Forest",
            "Pokemon HeartGold/SoulSilver -- Wi-Fi Communication",
            "Super Smash Brothers Wii U -- Mega Man 2 Medley",
            "Edvard Grieg -- Morning",
        ],
    },
    {
        url: "https://www.youtube.com/watch?v=X1p42KtZOCw",
        title: "Trickle-Down Balance",
        music: [
            "Human League -- Don’t You Want Me (Midi Version)",
            "Summer Vibes Instrumental -- Nkato (Royalty Free Music)",
            "32 Bars Freestyle Beat 4.2 -- Kontekst (Royalty Free Music)",
        ],
    },
]

export const Credits = () => {
    return <>
        <Typography variant={"h1"}  gutterBottom>Video Credits</Typography>
        <Grid container>
            {creds.map((credit, j) => {
                return <Grid item lg={6}  key={`${j}-cr-cont`} >
                    <Typography variant={"h2"} gutterBottom component={Link} to={credit.url} color={"primary"} style={{textDecoration: "none"}}>
                        {credit.title}
                    </Typography>
                    <div>
                        <List dense>
                            {credit.music.map((value, i) =>
                                <ListItem key={`${i}-cr`}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <MusicNoteOutlinedIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={value}
                                    />
                                </ListItem>
                            )}
                        </List>
                    </div>
                </Grid>
            })}
        </Grid>
    </>
}