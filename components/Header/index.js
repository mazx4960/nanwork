import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Grid, Typography, Button, Stack } from "@mui/material";
import { useAuthUser, withAuthUser, AuthAction } from "next-firebase-auth";
import { Lock } from "@mui/icons-material";

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
      postedBy: AuthUser.email,
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
              <Link href="/jobs" passHref>
                <Button style={{ textTransform: "none" }}>
                  <Image src="/logo.png" alt="logo" width="50" height="50"/>
                  <Typography variant="h4">nanWork</Typography>
                </Button>
              </Link>
              {AuthUser && (
                <Stack spacing={2} direction="row" maxHeight={40}>
                  <Button
                    onClick={() => setOpenModal(true)}
                    variant="contained"
                    disabledElevation
                    color="primary"
                  >
                    Post a Job
                  </Button>
                  <Link href="/requests" passHref>
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
                    variant="outlined"
                    disabledElevation
                    color="primary"
                    startIcon={<Lock/>}
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
