import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

function LineChart({ data, dataKeys, nameKey, colors = ["#8884d8", "#82ca9d"] }) {
  const theme = useTheme();
  const tokenColors = tokens(theme.palette.mode);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 60,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={tokenColors.grey[800]} />
        <XAxis 
          dataKey={nameKey} 
          stroke={tokenColors.grey[100]}
          style={{ fontSize: "12px" }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis 
          stroke={tokenColors.grey[100]}
          style={{ fontSize: "12px" }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: tokenColors.primary[500],
            border: `1px solid ${tokenColors.grey[700]}`,
            borderRadius: "4px",
            color: tokenColors.grey[100],
          }}
        />
        <Legend wrapperStyle={{ color: tokenColors.grey[100] }} />
        {dataKeys.map((key, index) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[index] || colors[0]}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

export default LineChart;

