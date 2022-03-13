import React, { useState } from "react";
import { Box, Grid, Typography, Button } from "@material-ui/core";
import { useAuthUser, withAuthUser, AuthAction } from "next-firebase-auth";
import Loader from "@/elements/Loader";
import NewJobModal from "components/Job/NewJobModal";
import { db } from "@/firebase/firestore/database";

const Header = (props) => {
  //auth user object
  const AuthUser = useAuthUser();

  const [openModal, setOpenModal] = useState(false); //State for the Apply Job Modal

  const PostJob = async (jobDetails) => {
    await db.collection("jobs").add({
      ...jobDetails,
    });
    
  };

  return (
    <>
      <NewJobModal
        closeJobModal={() => setOpenModal(false)}
        openModal={openModal}
        PostJob={PostJob}
      />
      <Box p={10} bgcolor="secondary.main" color="white">
        <Grid container justifyContent="center">
          <Grid item xs={10}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h4">nanWorks</Typography>
              <Button
                onClick={() => setOpenModal(true)}
                variant="contained"
                disabledElevation
                color="primary"
              >
                Post a Job
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  LoaderComponent: Loader,
  authPageURL: "/login",
})(Header);
