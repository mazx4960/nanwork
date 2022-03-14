import React from "react";
import { Box, Grid, Typography, Button, Divider, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { formatDistance } from "date-fns";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    border: "1px solid #e8e8e8",
    cursor: "pointer",
    transition: ".3s",
    "&:hover": {
      boxShadow: "opx 5px 25px rgba(0,0,0,0.1)",
      borderLeft: "6px solid #4064E4",
    },
  },
  attribute: {
    fontSize: "13.5px",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(0.75),
    borderRadius: "5px",
    display: "inline-block",
    fontWeight: 600,
  },
}));

const JobCard = (props) => {
  const classes = useStyles();
  return (
    <Box p={2} className={classes.wrapper} onClick={props.onView}>
      <Grid container mb={2} alignItems="center">
        <Grid item xs>
          <Typography variant="h4">{props.title}</Typography>
          <Typography variant="body1">{props.description}</Typography>
          <Stack direction="row" spacing={2} mt={2}>
            <Typography className={classes.attribute} variant="subtitle1">
              Child Age: {props.age}
            </Typography>
            <Typography className={classes.attribute} variant="subtitle1">
              Start Date: {props.startDate.toDate().toLocaleDateString("en-US")}
            </Typography>
            <Typography className={classes.attribute} variant="subtitle1">
              Time: {props.timeDay}
            </Typography>
          </Stack>
        </Grid>

        <Grid item container direction="column" alignItems="flex-end" xs>
          <Grid item>
            <typography variant="caption">
              {formatDistance(Date.now(), props.postedOn)} ago | {props.type}
            </typography>
          </Grid>
          <Grid item>
            <Box mt={2}>
              <Button onClick={props.onAction} variant="outlined">
                {props.buttonText}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobCard;
