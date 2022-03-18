import { createTheme } from "@mui/material"

export const API_KEY = `e55c5c42b36640c6a9bc530f622b1acc`
export const GREEN = `#27c43c`
export const RED = `#ff6347eb`

export const myTheme = createTheme({
  breakpoints: {
    values: {
      mob: 0,
      lap: 1024,
      desktop: 1200,
    },
  },
})
