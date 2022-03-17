import { Card, CardContent, CardHeader } from '@mui/material';
import React, { Fragment } from 'react'
import Chart from "react-apexcharts";

import { optionsDefault, seriesDefault } from './linesDefaults'

export default function Lines({ series, options }) {
  series = series ?? seriesDefault
  options = options ?? optionsDefault
  return (
      <Chart
        options={options}
        series={series}
        type="line"
        height={500}
      />
  )
}
