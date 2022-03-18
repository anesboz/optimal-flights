import { ThemeProvider } from "@mui/material"
import Banner from "components/Banner/Banner"
import { myTheme } from "variables/contants"
import Main from "views/Main/Main"

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={myTheme}>
        <Banner />
        <Main />
      </ThemeProvider>
    </div>
  )
}

export default App
