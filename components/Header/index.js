import React, { useState } from "react";
import Link from 'next/link';
import { Box, Grid, Typography, Button, Stack } from "@mui/material";
import { useAuthUser, withAuthUser, AuthAction } from "next-firebase-auth";

import Loader from "@/elements/Loader";
import NewJobModal from "components/Job/NewJobModal";
import { db } from "@/firebase/firestore/database";

const Header = (props) => {
  //auth user object
  const AuthUser = useAuthUser();

  //signout user
  const handleLogout = () => AuthUser.signOut();

  const [openModal, setOpenModal] = useState(false); //State for the Apply Job Modal

  const PostJob = async (jobDetails) => {
    console.log(jobDetails);
    await db.collection("jobs").add({
      ...jobDetails,
      postedOn: new Date(),
      postedBy: AuthUser.uid,
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
              <Link href="/jobs/view">
                <Typography variant="h4">nanWorks</Typography>
              </Link>
              {AuthUser && (
                <Stack spacing={2} direction="row">
                  <Button
                    onClick={() => setOpenModal(true)}
                    variant="contained"
                    disabledElevation
                    color="primary"
                  >
                    Post a Job
                  </Button>
                  <Link href="/requests">
                    <Button
                      variant="contained"
                      disabledElevation
                      color="primary"
                    >
                      My requests
                    </Button>
                  </Link>
                  <Button
                    onClick={handleLogout}
                    variant="contained"
                    disabledElevation
                    color="primary"
                  >
                    Logout
                  </Button>
                </Stack>
              )}
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
