import React from 'react';
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { tokens } from "../theme";
import Header from "../components/Header";

function PlaceholderPage({ title, subtitle }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
          }}
        >
          Back to Home
        </Button>
      </Box>
      <Header title={title} subtitle={subtitle} />
      <Box sx={{ textAlign: "center", mt: "100px" }}>
        <Typography variant="h4" color={colors.grey[300]}>
          {title} - To be implemented
        </Typography>
        <Typography variant="h6" color={colors.grey[400]} sx={{ mt: "20px" }}>
          Follow the same pattern as Epidemiology and VaccinationRate pages
        </Typography>
      </Box>
    </Box>
  );
}

export default PlaceholderPage;

