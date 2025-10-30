import React from 'react';
import { Box, Typography, useTheme, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import HealingOutlinedIcon from "@mui/icons-material/HealingOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";

function Navbar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  
  const menuItems = [
    {
      title: "HOME",
      path: "/",
      icon: <HomeOutlinedIcon sx={{ fontSize: "18px" }} />,
    },
    {
      title: "Epidemiology",
      path: "/epidemiology",
      icon: <LocalHospitalOutlinedIcon sx={{ fontSize: "18px" }} />,
    },
    {
      title: "Vaccination Rate",
      path: "/vaccination-rate",
      icon: <HealingOutlinedIcon sx={{ fontSize: "18px" }} />,
    },
    {
      title: "Pricing Analysis",
      path: "/pricing",
      icon: <AttachMoneyOutlinedIcon sx={{ fontSize: "18px" }} />,
    },
    {
      title: "CAGR Analysis",
      path: "/cagr",
      icon: <TrendingUpOutlinedIcon sx={{ fontSize: "18px" }} />,
    },
    {
      title: "MSA Comparison",
      path: "/msa-comparison",
      icon: <PieChartOutlinedIcon sx={{ fontSize: "18px" }} />,
    },
    {
      title: "Procurement",
      path: "/procurement",
      icon: <ShoppingCartOutlinedIcon sx={{ fontSize: "18px" }} />,
    },
    {
      title: "Brand-Demographic",
      path: "/brand-demographic",
      icon: <MedicationOutlinedIcon sx={{ fontSize: "18px" }} />,
    },
    {
      title: "FDF Analysis",
      path: "/fdf",
      icon: <ScienceOutlinedIcon sx={{ fontSize: "18px" }} />,
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: colors.primary[400],
        borderBottom: `2px solid ${colors.primary[300]}`,
        display: "flex",
        alignItems: "center",
        px: 3,
        py: 1.5,
        position: "relative",
      }}
    >
      {/* Logo Section */}
      <Box
        display="flex"
        alignItems="center"
        component={Link}
        to="/"
        sx={{ 
          mr: 4,
          textDecoration: "none",
          cursor: "pointer"
        }}
      >
        <Box
          sx={{
            width: "40px",
            height: "40px",
            backgroundColor: colors.greenAccent[500],
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 1.5,
          }}
        >
          <LocalHospitalOutlinedIcon
            sx={{ fontSize: "24px", color: colors.primary[500] }}
          />
        </Box>
        <Box>
          <Typography
            variant="h5"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ lineHeight: 1.2, mb: -0.5 }}
          >
            Vaccine
          </Typography>
          <Typography
            variant="h6"
            color={colors.grey[100]}
            sx={{ lineHeight: 1.2, fontSize: "14px" }}
          >
            Analytics
          </Typography>
        </Box>
      </Box>

      {/* Navigation Items */}
      <Box 
        display="flex" 
        alignItems="center" 
        flexGrow={1} 
        sx={{ 
          gap: 0.5, 
          overflowX: "auto",
          "&::-webkit-scrollbar": {
            height: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: colors.primary[500],
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: colors.grey[600],
            borderRadius: "2px",
          },
        }}
      >
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              startIcon={item.icon}
              sx={{
                color: isActive ? colors.blueAccent[500] : colors.grey[300],
                backgroundColor: isActive ? colors.primary[500] : "transparent",
                borderBottom: isActive ? `3px solid ${colors.blueAccent[500]}` : "3px solid transparent",
                borderRadius: 0,
                "&:hover": {
                  backgroundColor: colors.primary[500],
                  color: colors.blueAccent[400],
                  borderBottom: `3px solid ${colors.blueAccent[400]}`,
                },
                px: 2,
                py: 1.5,
                minWidth: "auto",
                textTransform: "none",
                fontSize: "14px",
                fontWeight: isActive ? 600 : 400,
                whiteSpace: "nowrap",
                position: "relative",
                transition: "all 0.2s ease",
              }}
            >
              {item.title}
            </Button>
          );
        })}
      </Box>
      
      {/* Bottom border indicator */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          backgroundColor: colors.primary[300],
        }}
      />
    </Box>
  );
}

export default Navbar;
