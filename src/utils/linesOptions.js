import { setVolAller } from "actions/mainAction"
import { SET_FLIGHT1, SET_FLIGHT2, SET_VOL_ALLER } from "actions/types"
import dateformat from "dateformat"
import { connect } from "react-redux"
import store from "store"
import ReactDOMServer from "react-dom/server"
import { GREEN, RED } from "variables/contants"

export const createOptions = ({
  title_text,
  flights,
  xaxis_title_text = `time`,
  yaxis_title_text = `prices`,
  dataLabels_enabled = true,
  ...props
}) => {
  return {
    // series: series,
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: !true,
          zoomin: !true,
          zoomout: !true,
          pan: true,
          reset: true,
        },
      },
      events: {
        dataPointSelection: function (event, chartContext, config) {
          const { seriesIndex, dataPointIndex } = config
          const way = seriesIndex === 0 ? `outboundFlights` : `returnFlights`
          const flight = flights[0][way][dataPointIndex]
          console.log(`🚩 . flight`, flight)
          store.dispatch({
            type: seriesIndex === 0 ? SET_FLIGHT1 : SET_FLIGHT2,
            payload: flight,
          })
        },
        // markerClick: function (
        //   event,
        //   chartContext,
        //   { seriesIndex, dataPointIndex, config }
        // ) {
        //   console.log(`🚩 . seriesIndex`, seriesIndex)
        //   console.log(`🚩 . dataPointIndex`, dataPointIndex)
        // },
      },
    },
    colors: [GREEN, RED],
    stroke: {
      curve: "smooth",
      width: 1,
    },
    title: {
      text: title_text,
      align: "left",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      // title: {
      //   text: xaxis_title_text,
      // },
      type: `datetime`,
      tooltip: {
        enabled: !true,
      },
      labels: {
        formatter: function (val, opts) {
          try {
            const ff = dateformat(new Date(val), `ddd dd/mm`)
            const condition = ff.includes(`Sam`) || ff.includes(`Dim`)
            return ff + (condition ? `🔸` : ``)
          } catch (error) {
            return
          }
        },
      },
    },
    yaxis: {
      title: {
        text: yaxis_title_text,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
    tooltip: {
      intersect: true,
      shared: false,
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        const way = seriesIndex === 0 ? `outboundFlights` : `returnFlights`
        const flight = flights[0][way][dataPointIndex]
        // console.log(`🚩 . flight`, flight)
        // return (
        //   '<div class="arrow_box">' +
        //   "<span>" +
        //    +
        //   "</span>" +
        //   "</div>"
        // )
        // return JSON.stringify(flight)
        return ReactDOMServer.renderToString(myTooltip(flight))
      },
    },
    dataLabels: {
      enabled: dataLabels_enabled,
      // enabledOnSeries: [0, 2],
      background: {
        enabled: !true,
      },
    },
    markers: {
      colors: [`transparent`],
      size: 10,
    },
  }
}

/*
o.date = dateformat(new Date(date), `yyyy-mm-dd ddd`)
o.time = start + ` -> ` + end
o.totalPriceOnePassenger = vol.pricingInfoSum.totalPriceOnePassenger
o.href = vol.deeplink.href
o.departureDateTime = vol.outboundFlight.departureDateTime
o.arrivalDateTime = vol.outboundFlight.arrivalDateTime
*/

function myTooltip(obj) {
  const { date, totalPriceOnePassenger, time } = obj
  return (
    <div>
      <div
        className="apexcharts-tooltip-title"
        style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: "12px" }}
      >
        {date}
      </div>
      <div
        className="apexcharts-tooltip-series-group apexcharts-active"
        style={{ order: 1, display: "flex" }}
      >
        <div
          className="apexcharts-tooltip-text"
          style={{
            fontFamily: "Helvetica, Arial, sans-serif",
            fontSize: "12px",
          }}
        >
          {/* {Object.entries(toDisplay).map(([key, value]) => (
            <div className="apexcharts-tooltip-y-group">
              <span className="apexcharts-tooltip-text-y-label">{key} : </span>
              <span className="apexcharts-tooltip-text-y-value">{value}</span>
            </div>
          ))} */}
          <div className="apexcharts-tooltip-y-group">
            <span className="apexcharts-tooltip-text-y-label">time : </span>
            <span className="apexcharts-tooltip-text-y-value">{time}</span>
          </div>
          <div className="apexcharts-tooltip-y-group">
            <span className="apexcharts-tooltip-text-y-label">
              totalPriceOnePassenger :{" "}
            </span>
            <span className="apexcharts-tooltip-text-y-value">
              {totalPriceOnePassenger} €
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
