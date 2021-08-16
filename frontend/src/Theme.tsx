import {createTheme} from "@material-ui/core";

export const tf2theme = createTheme({
    typography: {
        fontFamily: [
            '"TF2 Build"',
            '"Helvetica Neue"',
            'Helvetica',
            'Roboto',
            'Arial',
            'sans-serif'
        ].join(','),
        h1: {textAlign: "center", fontSize: 48, marginBottom: 12},
        h2: {textAlign: "center", fontSize: 36, marginBottom: 12},
        h3: {textAlign: "center"},
        h4: {textAlign: "center"},
        h5: {textAlign: "center"},
        h6: {textAlign: "center"},
        body1: {
            fontFamily: [
                '"Helvetica Neue"',
                'Helvetica',
                'Roboto',
                'Arial',
                'sans-serif'
            ].join(','),
            fontWeight: 400,
            fontSize: 20
        }
    },
    spacing: 6,
    palette: {
        background: {
            paper: "#6a4737",
            default: "#261812",
        },
        primary: {
            main: "#fa9e4b"
        },
        secondary: {
            main: "rgb(252, 198, 149)",
        },
        text: {
            primary: "rgb(255, 252, 249)",
            secondary: "rgb(252, 198, 149)",
        },
    },
})
