import React, { useState } from "react";
import {
  Box,
  Button,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: "#fff",
    display: "flex",
    boxShadow: "0px 1px 5px rgba(0,0,0,0.1)",
    borderRadius: "5px",
    "& > * ": {
      flex: 1,
      height: "45px",
      margin: "8px",
    },
  },
});

const SearchBar = (props) => {
  const [loading, setLoading] = useState(false);

  const [jobSearch, setJobSearch] = useState({
    type: "Volunteer",
  });

  const handleChange = (e) => {
    setJobSearch((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  const search = async () => {
    setLoading(true);
    await props.fetchCustomJobs(jobSearch);
    setLoading(false);
  };

  const classes = useStyles();
  return (
    <Box p={2} mt={-5} mb={2} className={classes.wrapper}>
      <Select
        onChange={handleChange}
        value={jobSearch.type}
        name="type"
        disableUnderline
        variant="filled"
      >
        <MenuItem value="Volunteer">Volunteer</MenuItem>
        <MenuItem value="Paid">Paid</MenuItem>
      </Select>
      
      <Button
        variant="contained"
        color="primary"
        disabledElevation
        onClick={search}
      >
        {loading ? <CircularProgress color="secondary" size={22} /> : "Search"}
      </Button>
    </Box>
  );
};

export default SearchBar;
