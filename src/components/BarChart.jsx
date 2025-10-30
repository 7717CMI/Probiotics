import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

function BarChart({ data, dataKey, nameKey, color = "#8884d8" }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 60,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={colors.grey[800]} />
        <XAxis 
          dataKey={nameKey} 
          stroke={colors.grey[100]}
          style={{ fontSize: "12px" }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis 
          stroke={colors.grey[100]}
          style={{ fontSize: "12px" }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: colors.primary[500],
            border: `1px solid ${colors.grey[700]}`,
            borderRadius: "4px",
            color: colors.grey[100],
          }}
        />
        <Legend wrapperStyle={{ color: colors.grey[100] }} />
        <Bar dataKey={dataKey} fill={color} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

export default BarChart;

