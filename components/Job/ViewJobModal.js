import React from "react";

import {
  Box,
  Grid,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  makeStyles,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
  info: {
    "& > *": {
      margin: "5px",
    },
  },
  skillChip: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.75),
    fontSize: "14.5px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: 600,
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
  },
  included: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "#fff",
    },
  },
}));

const ViewJobModal = (props) => {
  const classes = useStyles();

  return (
    <Dialog open={!!Object.keys(props.job).length} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {props.job.title} @ {props.job.phone}
          <IconButton onClick={props.closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption" size={20}>
              Posted on:{" "}
            </Typography>
            <Typography variant="body2" size={20}>
              {props.job.postedOn &&
                format(props.job.postedOn, "dd/MM/yyyy HH:MM")}
            </Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption">Job Type: </Typography>
            <Typography variant="body2" size={20}>
              {props.job.type}
            </Typography>
          </Box>

          <Box className={classes.info} display="flex">
            <Typography variant="caption">Description: </Typography>
            <Typography variant="body2" size={20}>
              {props.job.description}
            </Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption">Phone: </Typography>
            <Typography variant="body2" size={20}>
              {props.job.phone}
            </Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption">Time of the day: </Typography>
            <Typography variant="body2" size={20}>
              {props.job.timeDay}
            </Typography>
          </Box>
          <Box className={classes.info} display="flex">
            <Typography variant="caption">Age of child: </Typography>
            <Typography variant="body2" size={20}>
              {props.job.age}
            </Typography>
          </Box>
          <Box className={classes.info}>
            <Grid container alignItems="center">
              {props.job.skills &&
                props.job.skills.map((skill) => (
                  <Grid item key={skill} className={classes.skillChip}>
                    {skill}
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ViewJobModal;