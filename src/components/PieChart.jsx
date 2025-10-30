import React from 'react';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

function PieChart({ data, dataKey, nameKey, colors = COLORS }) {
  const theme = useTheme();
  const tokenColors = tokens(theme.palette.mode);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey={dataKey}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{
            backgroundColor: tokenColors.primary[500],
            border: `1px solid ${tokenColors.grey[700]}`,
            borderRadius: "4px",
            color: tokenColors.grey[100],
          }}
        />
        <Legend 
          wrapperStyle={{ color: tokenColors.grey[100] }}
          formatter={(value) => value}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}

export default PieChart;

