import React from "react";
import { Box, Typography } from "@mui/material";

import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box>{children}</Box>
      <Box display="flex" justifyContent="center" mt={3} mb={2}>
        <Typography variant="caption">
          &copy; 2022 nanWork. All Rights Reserved.
        </Typography>
      </Box>
    </>
  );
};

export default Layout;
