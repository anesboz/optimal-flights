import React, { Fragment, useCallback, useEffect, useState } from "react";
import Lines from "components/Lines/Lines";
import { createOptions } from "components/Lines/linesTools";
import Grid from "@mui/material/Grid";
import { tmpALLER, tmpREOUR } from "variables/tmpData";
import TextField from "@mui/material/TextField";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  LinearProgress,
} from "@mui/material";
import InputsBar from "components/InputsBar/InputsBar";
import { getX, getY } from "./mainTools";
import { connect } from "react-redux";
import Vol from "components/vol/Vol";

function Main(props) {
  var { aller, retour, vol, loading } = props.data;
  // aller = tmpALLER
  // retour = tmpREOUR
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});
  const [dataLabelState, setDataLabelState] = useState(true);

  useEffect(() => {
    setSeries([
      {
        name: `Aller ${vol.depart_airport} -> ${vol.destination_airport}`,
        data: getY(aller),
      },
      {
        name: `Retour ${vol.destination_airport} -> ${vol.depart_airport}`,
        data: getY(retour),
      },
    ]);
  }, [aller, retour]);

  useEffect(() => {
    setOptions(
      createOptions({
        xaxis_categories: getX(aller),
        xaxis_title_text: `Jours`,
        yaxis_title_text: `Prix`,
        dataLabels_enabled: dataLabelState,
      })
    );
  }, [aller, retour, dataLabelState]);

  return (
    <Fragment>
      <InputsBar />
      {loading ? <LinearProgress /> : null}
      <Grid item xs={2}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={dataLabelState}
                onChange={(event) => setDataLabelState(event.target.checked)}
              />
            }
            label="DataLabels"
          />
        </FormGroup>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Lines series={series} options={options} />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Vol />
        </Grid>
      </Grid>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  data: state.mainBranch,
});

export default connect(mapStateToProps)(Main);
