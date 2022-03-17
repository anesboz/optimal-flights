import { createTheme } from "@mui/material"

export const API_KEY = `e55c5c42b36640c6a9bc530f622b1acc`

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
})
