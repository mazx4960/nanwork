import React from "react";
import { Box, Typography } from "@material-ui/core";

import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box>{children}</Box>
      <Box display="flex" justifyContent="center" mt={3} mb={2}>
        <Typography variant="caption">
          &copy; 2021 Nanwork. All Rights Reserved.
        </Typography>
      </Box>
    </>
  );
};

export default Layout;
