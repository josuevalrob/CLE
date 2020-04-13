import React from 'react'
import {Typography, IconButton, Grid, Link} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export const HeaderForm = ({title, subtitle, style}) => (
    <>
    <Typography className={style} variant="h2" >
        {title}
    </Typography>
    <Typography color="textSecondary" gutterBottom >
        {subtitle}
    </Typography>
    </>
)

 export const Cross = ({style, handleBack}) => (
    <div className={style}>
        <IconButton onClick={handleBack}>
            <ArrowBackIcon />
        </IconButton>
    </div>
 )

export const OptionsForm = ({rt}) => (
    <Typography
        color="textSecondary"
        variant="body1"
    >
        Have an account?{' '}
        <Link
        component={rt}
        to="/sign-in"
        variant="h6"
        >
        Sign in
        </Link>
    </Typography>
)

export const AllPageForm = ({children, classes, goBack}) => {
    return (
        <div className={classes.root}>
            <Grid className={classes.grid} container >
                <Grid className={classes.content} item lg={7} xs={12} >
                    <div className={classes.content}>
                        <Cross style={classes.contentHeader} handleBack={goBack} />
                        <div className={classes.contentBody}>
                            {children}
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}