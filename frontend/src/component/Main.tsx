import React from 'react';
import PropTypes from 'prop-types';
//import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

// const useStyles = makeStyles((theme) => ({
//     markdown: {
//         ...theme.typography.body2,
//         padding: theme.spacing(3, 0),
//     },
// }));

export default function Main() {
    //const classes = useStyles();

    return (
        <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
                {"TITLEEE"}
            </Typography>
            <Divider />
        </Grid>
    );
}

Main.propTypes = {
    posts: PropTypes.array,
    title: PropTypes.string,
};