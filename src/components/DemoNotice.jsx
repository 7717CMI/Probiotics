import React from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

function DemoNotice() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 165, 0, 0.2)" : "#FFEDCC",
        padding: "24px 28px",
        borderRadius: "12px",
        mb: "24px",
        display: "flex",
        alignItems: "flex-start",
        gap: 2.5,
        border: "3px solid #FF8C00",
        boxShadow: theme.palette.mode === "dark" 
          ? "0 4px 20px rgba(255, 140, 0, 0.3)" 
          : "0 4px 20px rgba(255, 140, 0, 0.25)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(90deg, #FF8C00, #FFA500, #FF8C00)",
          animation: "shimmer 2s infinite linear",
        },
        "@keyframes shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      }}
    >
      <WarningAmberIcon 
        sx={{ 
          color: "#FF8C00", 
          fontSize: "40px",
          flexShrink: 0,
          mt: "2px",
          filter: "drop-shadow(0 2px 4px rgba(255, 140, 0, 0.3))",
        }} 
      />
      <Box>
        <Typography
          variant="h5"
          sx={{ 
            color: "#FF6600",
            fontWeight: "800",
            mb: 1,
            letterSpacing: "1px",
            textTransform: "uppercase",
            fontSize: "18px",
            textShadow: theme.palette.mode === "dark" 
              ? "0 1px 2px rgba(0, 0, 0, 0.5)" 
              : "none",
          }}
        >
          ⚠ DEMO DATASET - FOR ILLUSTRATION PURPOSES ONLY
        </Typography>
        <Typography
          variant="body1"
          sx={{ 
            color: theme.palette.mode === "dark" ? "#e0e0e0" : "#333333",
            lineHeight: 1.7,
            fontSize: "15px",
            fontWeight: "500"
          }}
        >
          This dashboard uses synthetic data for demonstration purposes. No real-world data or actual vaccine market information is represented in this application.
        </Typography>
      </Box>
    </Box>
  );
}

export default DemoNotice;

