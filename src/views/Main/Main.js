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

function Main(props) {
  var { query, flights, loading, flight1, flight2 } = props.mainBranch
  const [series, setSeries] = useState([])
  const [options, setOptions] = useState({})
  const [dataLabelState, setDataLabelState] = useState(true)
  useEffect(() => {
    const arr = []
    flights.map((flight) => {
      arr.push({
        name: `Aller ${query.origin} -> ${query.destination} (${flight.company})`,
        data: getY(flight.outboundFlights),
      })
      arr.push({
        name: `Retour ${query.destination} -> ${query.origin} (${flight.company})`,
        data: getY(flight.returnFlights),
      })
    })
    setSeries(arr)
  }, [loading])

  useEffect(() => {
    const a = getNDays(query.originDepartureDate, query.nbDays).map((e) => e)
    setOptions(
      createOptions({
        flights,
        xaxis_categories: a,
        xaxis_title_text: `Jours`,
        yaxis_title_text: `Prix`,
        dataLabels_enabled: dataLabelState,
      })
    )
  }, [loading, dataLabelState])

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
      </Grid>
      <Grid container spacing={2} paddingX={1}>
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
        <Grid item mob={12}>
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
        </Grid>
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
