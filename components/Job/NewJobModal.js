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
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Close } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

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
  email: "",
  startDate: new Date(),
  timeDay: "",
  age: "",
  listingTitle: "",
  description: "",
};

const NewJobModal = (props) => {
  const [loading, setLoading] = useState(false);

  const [jobDetails, setJobDetails] = useState(initState);
  const [startDate, setStartDate] = useState(new Date());

  const handleChange = (e) => {
    setJobDetails((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setJobDetails((oldState) => ({
      ...oldState,
      startDate: date,
    }));
  };

  const handleSubmit = async () => {
    // for (const field in jobDetails) {
    //   if (!jobDetails[field]) {
    //     alert("Fill all the Required Fileds");
    //     return;
    //   }
    // }

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
              placeholder="Email*"
              type="email"
              name="email"
              value={jobDetails.email}
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                name="startDate"
                value={jobDetails.startDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
                fullWidth
              />
            </LocalizationProvider>
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
              type="number"
              name="age"
              value={jobDetails.age}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FilledInput
              onChange={handleChange}
              autoComplete="off"
              placeholder="Listing Title*"
              disableUnderline
              fullWidth
              multiline
              rows={4}
              name="title"
              value={jobDetails.title}
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
