import React, { useState, useMemo } from 'react';
import { Box, Grid, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import FilterDropdown from "../../components/FilterDropdown";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import LineChart from "../../components/LineChart";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import { getData, filterDataframe, formatNumber } from "../../utils/dataGenerator";

function Epidemiology() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  
  const data = getData();
  
  const [filters, setFilters] = useState({
    year: [],
    disease: [],
    region: [],
    incomeType: [],
    country: [],
  });

  const filteredData = useMemo(() => {
    return filterDataframe(data, {
      year: filters.year,
      disease: filters.disease,
      region: filters.region,
      incomeType: filters.incomeType,
      country: filters.country,
    });
  }, [data, filters]);

  const uniqueOptions = useMemo(() => {
    return {
      years: [...new Set(data.map(d => d.year))].sort(),
      diseases: [...new Set(data.map(d => d.disease))].sort(),
      regions: [...new Set(data.map(d => d.region))].sort(),
      incomeTypes: [...new Set(data.map(d => d.incomeType))].sort(),
      countries: [...new Set(data.map(d => d.country))].sort(),
    };
  }, [data]);

  const kpis = useMemo(() => {
    if (filteredData.length === 0) {
      return {
        totalPrevalence: "N/A",
        totalIncidence: "N/A",
        topDisease: "N/A",
        avgIncidenceRate: "N/A",
      };
    }

    const totalPrevalence = filteredData.reduce((sum, d) => sum + d.prevalence, 0);
    const totalIncidence = filteredData.reduce((sum, d) => sum + d.incidence, 0);
    const diseaseGroups = filteredData.reduce((acc, d) => {
      acc[d.disease] = (acc[d.disease] || 0) + d.prevalence;
      return acc;
    }, {});
    const topDisease = Object.entries(diseaseGroups).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
    const avgIncidenceRate = totalIncidence / filteredData.length;

    return {
      totalPrevalence: formatNumber(totalPrevalence),
      totalIncidence: formatNumber(totalIncidence),
      topDisease,
      avgIncidenceRate: formatNumber(avgIncidenceRate),
    };
  }, [filteredData]);

  const chartData1 = useMemo(() => {
    const grouped = filteredData.reduce((acc, d) => {
      acc[d.disease] = (acc[d.disease] || 0) + d.prevalence;
      return acc;
    }, {});
    return Object.entries(grouped).map(([disease, prevalence]) => ({
      disease,
      prevalence,
    })).sort((a, b) => b.prevalence - a.prevalence);
  }, [filteredData]);

  const chartData2 = useMemo(() => {
    const grouped = filteredData.reduce((acc, d) => {
      acc[d.region] = (acc[d.region] || 0) + d.incidence;
      return acc;
    }, {});
    return Object.entries(grouped).map(([region, incidence]) => ({
      region,
      incidence,
    }));
  }, [filteredData]);

  const chartData3 = useMemo(() => {
    const grouped = filteredData.reduce((acc, d) => {
      if (!acc[d.year]) {
        acc[d.year] = { prevalence: 0, incidence: 0 };
      }
      acc[d.year].prevalence += d.prevalence;
      acc[d.year].incidence += d.incidence;
      return acc;
    }, {});
    return Object.entries(grouped)
      .map(([year, values]) => ({
        year: parseInt(year),
        prevalence: values.prevalence,
        incidence: values.incidence,
      }))
      .sort((a, b) => a.year - b.year);
  }, [filteredData]);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            "&:hover": {
              backgroundColor: colors.blueAccent[800],
            },
          }}
        >
          Back to Home
        </Button>
      </Box>

      <Header title="Epidemiology Analysis" subtitle="Disease prevalence and incidence trends" />

      {/* Filters */}
      <Box
        sx={{
          backgroundColor: colors.primary[400],
          padding: "20px",
          borderRadius: "8px",
          mb: "20px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FilterDropdown
              label="Year"
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              options={uniqueOptions.years}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FilterDropdown
              label="Disease"
              value={filters.disease}
              onChange={(e) => setFilters({ ...filters, disease: e.target.value })}
              options={uniqueOptions.diseases}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FilterDropdown
              label="Region"
              value={filters.region}
              onChange={(e) => setFilters({ ...filters, region: e.target.value })}
              options={uniqueOptions.regions}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FilterDropdown
              label="Income Type"
              value={filters.incomeType}
              onChange={(e) => setFilters({ ...filters, incomeType: e.target.value })}
              options={uniqueOptions.incomeTypes}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FilterDropdown
              label="Country"
              value={filters.country}
              onChange={(e) => setFilters({ ...filters, country: e.target.value })}
              options={uniqueOptions.countries}
            />
          </Grid>
        </Grid>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={2} sx={{ mb: "20px" }}>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              backgroundColor: colors.primary[400],
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <StatBox
              title={kpis.totalPrevalence}
              subtitle="Total Prevalence"
              icon={<LocalHospitalOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
              progress="0.75"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              backgroundColor: colors.primary[400],
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <StatBox
              title={kpis.totalIncidence}
              subtitle="Total Incidence"
              icon={<LocalHospitalOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
              progress="0.70"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              backgroundColor: colors.primary[400],
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <StatBox
              title={kpis.topDisease}
              subtitle="Top Disease"
              icon={<LocalHospitalOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
              progress="0.60"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box
            sx={{
              backgroundColor: colors.primary[400],
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <StatBox
              title={kpis.avgIncidenceRate}
              subtitle="Avg Incidence Rate"
              icon={<LocalHospitalOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />}
              progress="0.65"
            />
          </Box>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: colors.primary[400],
              padding: "20px",
              borderRadius: "8px",
              height: "400px",
            }}
          >
            <BarChart
              data={chartData1}
              dataKey="prevalence"
              nameKey="disease"
              color={colors.blueAccent[500]}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: colors.primary[400],
              padding: "20px",
              borderRadius: "8px",
              height: "400px",
            }}
          >
            <PieChart
              data={chartData2}
              dataKey="incidence"
              nameKey="region"
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              backgroundColor: colors.primary[400],
              padding: "20px",
              borderRadius: "8px",
              height: "400px",
            }}
          >
            <LineChart
              data={chartData3}
              dataKeys={["prevalence", "incidence"]}
              nameKey="year"
              colors={[colors.blueAccent[500], colors.greenAccent[500]]}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Epidemiology;

