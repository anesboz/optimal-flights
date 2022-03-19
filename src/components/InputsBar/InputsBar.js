import React, { useState } from "react"
import TextField from "@mui/material/TextField"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import MobileDatePicker from "@mui/lab/MobileDatePicker"
import { Button, Grid } from "@mui/material"
import { getFlights } from "actions/mainAction"
import { connect } from "react-redux"
import dateformat from "dateformat"
import { myDateFormat } from "variables/forFormatdate"

import FormGroup from "@mui/material/FormGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import { LoadingButton } from "@mui/lab"

function InputsBar(props) {
  const loading = props.loading
  const [origin, setOrigin] = useState(`ORY`)
  const [destination, setDestination] = useState(`ALG`)
  const [originDepartureDate, setOriginDepartureDate] = useState(new Date())
  const [nbDays, setNbDays] = useState(30)
  const [companies, setCompanies] = useState([`transavia`])
  const query = {
    origin,
    destination,
    originDepartureDate,
    nbDays,
    companies,
  }

  return (
    <Grid container spacing={2} padding={3}>
      <Grid item mob={4} lap={2}>
        <TextField
          label="De"
          value={origin}
          required
          error={origin === ""}
          onChange={(event) => {
            setOrigin(event.target.value)
          }}
          inputProps={{ style: { textTransform: "uppercase" } }}
        />
      </Grid>
      <Grid item mob={4} lap={2}>
        <TextField
          label="Vers"
          required
          value={destination}
          error={destination === ""}
          onChange={(event) => setDestination(event.target.value)}
          inputProps={{ style: { textTransform: "uppercase" } }}
        />
      </Grid>
      <Grid item mob={4} lap={2}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label="From"
            inputFormat="dd/MM/yyyy"
            value={originDepartureDate}
            onChange={(newValue) => setOriginDepartureDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
            minDate={new Date()}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item mob={4} lap={2}>
        <TextField
          label="Nb Days"
          type="number"
          error={nbDays <= 0}
          value={nbDays}
          onChange={(event) => {
            setNbDays(event.target.value)
          }}
          required
          autoCapitalize="true"
        />
      </Grid>
      <Grid item mob={8} lap={4}>
        <LoadingButton
          fullWidth={true}
          variant="contained"
          disabled={nbDays <= 0 || destination === "" || origin === ""}
          onClick={() => props.getFlights(query)}
          loading={loading}
        >
          SUBMIT
        </LoadingButton>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  loading: state.mainBranch.loading,
})

export default connect(mapStateToProps, { getFlights })(InputsBar)
