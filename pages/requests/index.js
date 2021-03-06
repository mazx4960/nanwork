import React, { useState, useEffect } from "react";
import { Box, Grid, CircularProgress, Typography } from "@mui/material";
import { useAuthUser, withAuthUser, AuthAction } from "next-firebase-auth";

import { db } from "../../utils/firebase/firestore/database";
import JobCard from "../../components/Job/JobCard";
import ViewJobModal from "../../components/Job/ViewJobModal";
import Loader from "@/elements/Loader";
import Layout from "components/Layout";

const Requests = () => {
  //auth user object
  const AuthUser = useAuthUser();

  const [jobs, setJobs] = useState([]); //State to save data of jobs from firebase
  const [loading, setLoading] = useState(true); //state for the loader of the data
  const [viewJob, setViewJob] = useState({}); //State for the View or Check Job Modal

  const fetchJobs = async () => {
    setLoading(true);
    const req = await db
      .collection("jobs")
      .orderBy("postedOn", "desc")
      .where("postedBy", "==", AuthUser.email)
      .get();

    const tempData = req.docs.map((job) => ({
      ...job.data(),
      id: job.id,
      postedOn: job.data().postedOn.toDate(),
    }));

    setJobs(tempData);
    setLoading(false);
  };

  const deleteJob = async (id) => {
    await db.collection("jobs").doc(id).delete();
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Layout>
      <ViewJobModal job={viewJob} closeModal={() => setViewJob({})} />
      <Box>
        <Grid container justifyContent="center">
          <Grid item xs={10}>
            {loading ? (
              <Box display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Box my={2} display="flex" justifyContent="flex-start">
                  <Typography variant="h4" fontWeight="bold">
                    My requests
                  </Typography>
                </Box>
                {jobs.map((job) => (
                  <JobCard
                    buttonText="Delete"
                    onView={() => setViewJob(job)}
                    onAction={(e) => {
                      e.stopPropagation();
                      deleteJob(job.id);
                    }}
                    key={job.id}
                    {...job}
                  />
                ))}
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  LoaderComponent: Loader,
  authPageURL: "/login",
})(Requests);
