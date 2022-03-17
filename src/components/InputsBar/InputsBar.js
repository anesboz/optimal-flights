import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import { Button, Grid } from '@mui/material'
import { getData } from 'actions/mainAction'
import { connect } from 'react-redux'
import dateformat from 'dateformat'
import { myDateFormat } from 'variables/forFormatdate'

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { LoadingButton } from '@mui/lab'

function InputsBar(props) {
  const { loading } = props.data
  const [de, setDe] = useState(`ORY`)
  const [vers, setVers] = useState(`ALG`)
  const [startDate, setStartDate] = useState(new Date())
  const [nbDays, setNbDays] = useState(30)
  const [retourBool, setRetourBool] = useState(true)

  return (
    <Grid container spacing={2} padding={3}>
      <Grid item xs={2}>
        <TextField
          label="De"
          value={de}
          required
          error={de === ""}
          onChange={(event) => {
            setDe(event.target.value)
          }}
          inputProps={{ style: { textTransform: "uppercase" } }}
        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          label="Vers"
          required
          value={vers}
          error={vers === ""}
          onChange={(event) => setVers(event.target.value)}
          inputProps={{ style: { textTransform: "uppercase" } }}

        />
      </Grid>
      <Grid item xs={2}>
        <TextField
          label="Nb Days"
          type="number"
          error={nbDays <= 0}
          value={nbDays}
          onChange={(event) => { setNbDays(event.target.value) }}
          required
          autoCapitalize='true'
        />
      </Grid>
      <Grid item xs={2}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            label="Date mobile"
            inputFormat="dd/MM/yyyy"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
            minDate={new Date()}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={2}>
        {/* <Button
          variant="contained"
          disabled={nbDays <= 0 || vers === "" || de === ""}
          onClick={() => props.getData(de, vers, dateformat(startDate, myDateFormat), nbDays, retourBool)}
        >SUBMIT</Button> */}
        <LoadingButton
          variant="contained"
          disabled={nbDays <= 0 || vers === "" || de === ""}
          onClick={() => props.getData(de, vers, dateformat(startDate, myDateFormat), nbDays, retourBool)}
          loading={loading}
          // disabled
        >
          SUBMIT
        </LoadingButton>
      </Grid>
      {/* <Grid item xs={2}>
        <FormGroup>
          <FormControlLabel control={
            <Checkbox checked={retourBool} onChange={(event) => setRetourBool(event.target.checked)} />
          }
            label="Retour"
          />
        </FormGroup>
      </Grid> */}
    </Grid>
  )
}


const mapStateToProps = (state) => ({
  data: state.mainBranch,
})

export default connect(mapStateToProps, { getData })(InputsBar)