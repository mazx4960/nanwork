import React, { useState } from "react";

import {
  Box,
  Grid,
  FilledInput,
  IconButton,
  Typography,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Close } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  skillChip: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(0.75),
    fontSize: "14.5px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: 600,
    border: `1px solid ${theme.palette.secondary.main}`,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "#fff",
    },
  },
  included: {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
  },
}));

const initState = {
  name: "",
  type: "Volunteer",
  phone: "",
  timeDay: "",
  age: "",
  description: "",
};

const NewJobModal = (props) => {
  const [loading, setLoading] = useState(false);

  const [jobDetails, setJobDetails] = useState(initState);

  const handleChange = (e) => {
    e.persist();
    setJobDetails((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    for (const field in jobDetails) {
      if (typeof jobDetails[field] === "string" && !jobDetails[field]) {
        alert("Fill all the Required Fileds");
        return;
      }
    }

    setLoading(true);
    await props.PostJob(jobDetails);
    closeModal();
  };

  const closeModal = () => {
    setJobDetails(initState);
    setLoading(false);
    props.closeJobModal();
  };

  const classes = useStyles();
  return (
    <Dialog open={props.openModal} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Post a Job
          <IconButton onClick={closeModal}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              autoComplete="off"
              name="name"
              value={jobDetails.name}
              placeholder="Name*"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              onChange={handleChange}
              fullWidth
              disableUnderline
              variant="filled"
              name="type"
              value={jobDetails.type}
            >
              <MenuItem value="Volunteer">Volunteer</MenuItem>
              <MenuItem value="Paid">Paid</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              autoComplete="off"
              placeholder="Phone*"
              name="phone"
              value={jobDetails.phone}
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              autoComplete="off"
              placeholder="Time of the day*"
              disableUnderline
              fullWidth
              name="timeDay"
              value={jobDetails.timeDay}
            />
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              autoComplete="off"
              placeholder="Age of child*"
              disableUnderline
              fullWidth
              name="age"
              value={jobDetails.age}
            />
          </Grid>
          <Grid item xs={12}>
            <FilledInput
              onChange={handleChange}
              autoComplete="off"
              placeholder="Job Description*"
              disableUnderline
              fullWidth
              multiline
              rows={4}
              name="description"
              value={jobDetails.description}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Box
          color="red"
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="caption">*Required Fields</Typography>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disableElevation
            color="primary"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="secondary" size={22} />
            ) : (
              "Post Job"
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default NewJobModal;
