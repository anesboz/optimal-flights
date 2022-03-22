import React, { Fragment, useCallback, useEffect, useState } from "react"
import { createOptions } from "utils/linesOptions"
import Grid from "@mui/material/Grid"
import { tmpALLER, tmpREOUR } from "variables/tmpData"
import TextField from "@mui/material/TextField"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import MobileDatePicker from "@mui/lab/MobileDatePicker"
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  LinearProgress,
  Switch,
} from "@mui/material"
import InputsBar from "components/InputsBar/InputsBar"
import { getX, getY } from "./mainTools"
import { connect } from "react-redux"
import Vol from "components/vol/Vol"
import { getNDays } from "utils/timeManager"
import ReactApexChart from "react-apexcharts"
import { GREEN, RED } from "variables/contants"
import store from "store"
import { SET_FLIGHT1, SET_FLIGHT2 } from "actions/types"

import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

function Main(props) {
  var { query, flights, loading, flight1, flight2 } = props.mainBranch
  const [alignment, setAlignment] = useState("bande")
  const [series, setSeries] = useState([])
  const [options, setOptions] = useState({})
  const [dataLabelState, setDataLabelState] = useState(true)
  const [allerState, setAllerState] = useState(true)
  const [retourState, setRetourState] = useState(false)
  const [weekendState, setweekendState] = useState(true)
  useEffect(() => {
    // series
    const arr = []
    flights.map((flight) => {
      if (allerState) {
        arr.push({
          name: `Aller ${query.origin} -> ${query.destination} (${flight.company})`,
          data: getY(flight.outboundFlights),
        })
      }
      if (retourState) {
        arr.push({
          name: `Retour ${query.destination} -> ${query.origin} (${flight.company})`,
          data: getY(flight.returnFlights),
        })
      }
    })
    setSeries(arr)
    // options
    setOptions(
      createOptions({
        series,
        flights,
        dataLabels_enabled: dataLabelState,
        flight1,
        flight2,
        allerState,
        retourState,
        weekendState,
        alignment,
      })
    )
  }, [
    loading,
    dataLabelState,
    allerState,
    retourState,
    weekendState,
    alignment,
    flight1,
    flight2,
  ])

  return (
    <Fragment>
      <InputsBar />
      {loading ? <LinearProgress /> : null}
      <Grid container spacing={2}>
        <Grid item marginLeft={3}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={dataLabelState}
                  onChange={(event) => setDataLabelState(event.target.checked)}
                />
              }
              label="DataLabels"
            />
          </FormGroup>
        </Grid>
        <Grid item marginLeft={3}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={allerState}
                  onChange={(event) => setAllerState(event.target.checked)}
                />
              }
              label="Aller"
            />
          </FormGroup>
        </Grid>
        <Grid item marginLeft={3}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={retourState}
                  onChange={(event) => setRetourState(event.target.checked)}
                />
              }
              label="Retour"
            />
          </FormGroup>
        </Grid>
        <Grid item marginLeft={3}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={weekendState}
                  onChange={(event) => setweekendState(event.target.checked)}
                />
              }
              label="Weekends"
            />
          </FormGroup>
        </Grid>
        <Grid item marginLeft={3}>
          Range (cheapest) {"    "}
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={(_, newAlignment) => setAlignment(newAlignment)}
            aria-label="text alignment"
            size="small"
          >
            <ToggleButton value="lines" aria-label="left aligned">
              Lines
            </ToggleButton>
            <ToggleButton value="bande" aria-label="centered">
              Bande
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item marginLeft={3}>
          <Button
            fullWidth={true}
            // variant="contained"
            onClick={() => {
              store.dispatch({ type: SET_FLIGHT1, payload: {} })
              store.dispatch({ type: SET_FLIGHT2, payload: {} })
            }}
            loading={false}
          >
            RESET
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item mob={12}>
          <ReactApexChart
            options={options}
            series={series}
            type="line"
            height={500}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {/* <Grid item mob={12}>
          {Object.keys(flight1).length === 0 ||
          Object.keys(flight2).length === 0 ? null : (
            <div className="center">
              Total de
              <b style={{ margin: `0 5px` }}>
                {" "}
                {flight1.totalPriceOnePassenger +
                  flight2.totalPriceOnePassenger}{" "}
                €{" "}
              </b>
              pour
              <b style={{ margin: `0 5px` }}>
                {" "}
                {Math.ceil(
                  Math.abs(
                    new Date(flight2.arrivalDateTime) -
                      new Date(flight1.departureDateTime)
                  ) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                jours
              </b>
            </div>
          )}
        </Grid> */}
        <Grid item mob={6}>
          <Vol
            title="Vol Aller"
            vol={flight1}
            color={GREEN}
            resetFunction={() =>
              store.dispatch({
                type: SET_FLIGHT1,
                payload: {},
              })
            }
          />
        </Grid>
        <Grid item mob={6}>
          <Vol
            title="Vol Retour"
            vol={flight2}
            color={RED}
            resetFunction={() =>
              store.dispatch({
                type: SET_FLIGHT2,
                payload: {},
              })
            }
          />
        </Grid>
      </Grid>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  mainBranch: state.mainBranch,
})

export default connect(mapStateToProps)(Main)
