import { setVolAller } from "actions/mainAction"
import { SET_FLIGHT1, SET_FLIGHT2, SET_VOL_ALLER } from "actions/types"
import dateformat from "dateformat"
import { connect } from "react-redux"
import store from "store"
import ReactDOMServer from "react-dom/server"
import { GREEN, GREEN_LIGHT, RED, RED_LIGHT } from "variables/contants"
import { getNextDay } from "./timeManager"

function getIntervalDates(flights) {
  if (!flights.outboundFlights) return
  const allDates = [
    ...flights.outboundFlights.map((e) =>
      new Date(e.departureDateTime).getTime()
    ),
    ...flights.returnFlights.map((e) =>
      new Date(e.departureDateTime).getTime()
    ),
  ].filter((e) => e)
  var minDate = Math.min(...allDates)
  var maxDate = Math.max(...allDates)
  return [new Date(minDate), new Date(maxDate)]
}

function getWeekEndsAnnotations(interval) {
  const [start, end] = interval
  const color = "#0000003b"
  const annotations = []
  start.setHours(0, 0, 0, 0)
  let date = start
  while (date <= end) {
    if (date.getDay() === 6) {
      // saturday
      annotations.push({
        x: new Date(date).getTime(),
        x2: getNextDay(getNextDay(date)).getTime(),
        fillColor: color,
        opacity: 0.15,
        label: {
          borderColor: "transparent",
          style: {
            color: color,
            background: "transparent",
          },
          orientation: "horizontal",
          text: `Weekend ${dateformat(date, `dd`)}-${dateformat(
            getNextDay(date),
            `dd mmm`
          )} `,
          offsetX: 33,
          offsetY: -6,
          position: "bottom",
        },
      })
    }
    date = getNextDay(date)
  }
  return annotations
}

function getSelectedFlightsAnnotations(flight1, flight2) {
  const color = `blue`
  const obj = (val, text = `Selected`) => ({
    x: new Date(val).getTime(),
    fillColor: color,
    borderColor: color,
    opacity: 0.15,
    label: {
      borderColor: color,
      style: {
        color: color,
        background: "transparent",
      },
      orientation: "horizontal",
      text: text,
      offsetX: -33,
      offsetY: 6,
    },
  })
  var rv = [obj(flight1.departureDateTime), obj(flight2.departureDateTime)]

  if (flight1.departureDateTime != null && flight2.departureDateTime != null) {
    let tmp = obj(flight1.departureDateTime)
    tmp.x2 = new Date(flight2.departureDateTime).getTime()
    rv = [tmp]
  }
  console.log(`🚩 . rv`, rv)
  return rv
}

function getMin_MoyAnnotations(array, color, alignment) {
  if (!array || !alignment) return []
  const prices = array.map((elm) => elm.totalPriceOnePassenger).filter((e) => e)
  const min = Math.min(...prices)
  const sum = prices.reduce((a, b) => a + b, 0)
  const avg = sum / prices.length || 0
  const obj = (val) => ({
    y: val,
    borderColor: color,
    strokeDashArray: 2,
    fillColor: color,
    opacity: 0.2,
    label: {
      borderColor: "transparent",
      style: {
        color: color,
        background: "transparent",
      },
      text: "cheapest",
      offsetY: 15,
    },
  })

  if (alignment == `lines`) {
    return [obj(min), obj(avg)]
  } else if (alignment == `bande`) {
    const rv = obj(min)
    rv.y2 = avg
    return [rv]
  }
}

export const createOptions = ({
  series,
  title_text,
  flights,
  xaxis_title_text = `time`,
  yaxis_title_text = `prices`,
  dataLabels_enabled = true,
  flight1,
  flight2,
  allerState,
  retourState,
  weekendState,
  alignment,
  ...props
}) => {
  const i1 = flights[0].outboundFlights.indexOf(flight1)
  const i2 = flights[0].returnFlights.indexOf(flight2)
  const discrete = []
  discrete.push({
    seriesIndex: 0,
    dataPointIndex: i1,
    fillColor: "transparent",
    strokeColor: GREEN,
    size: 15,
  })
  discrete.push({
    seriesIndex: 1,
    dataPointIndex: i2,
    fillColor: "transparent",
    strokeColor: RED,
    size: 15,
  })
  return {
    // series: series,
    chart: {
      animations: {
        enabled: false,
      },
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
          store.dispatch({
            type: seriesIndex === 0 ? SET_FLIGHT1 : SET_FLIGHT2,
            payload: flight,
          })
        },
      },
    },
    colors: [allerState ? GREEN : RED, RED],
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
        // colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        colors: ["transparent"], // takes an array which will be repeated on columns
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
      // title: {
      //   text: yaxis_title_text,
      // },
      labels: {
        formatter: function (val, opts) {
          return val + ` €`
        },
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
        return ReactDOMServer.renderToString(myTooltip(flight))
      },
    },
    dataLabels: {
      enabled: dataLabels_enabled,
      background: {
        enabled: !true,
      },
      formatter: function (val, opts) {
        return val + ` €`
      },
    },
    markers: {
      colors: [`transparent`],
      size: 8,
      strokeColors: `transparent`,
      discrete: discrete,
    },
    annotations: {
      xaxis: [
        ...(weekendState
          ? getWeekEndsAnnotations(getIntervalDates(flights[0]))
          : []),
        ...getSelectedFlightsAnnotations(flight1, flight2),
        // {
        //   x: new Date("23 Nov 2017").getTime(),
        //   strokeDashArray: 0,
        //   borderColor: "#775DD0",
        //   label: {
        //     borderColor: "#775DD0",
        //     style: {
        //       color: "#fff",
        //       background: "#775DD0",
        //     },
        //     text: "Anno Test",
        //   },
        // },
        // {
        //   x: new Date("26 Nov 2017").getTime(),
        //   x2: new Date("28 Nov 2017").getTime(),
        //   fillColor: "#B3F7CA",
        //   opacity: 0.4,
        //   label: {
        //     borderColor: "#B3F7CA",
        //     style: {
        //       fontSize: "10px",
        //       color: "#fff",
        //       background: "#00E396",
        //     },
        //     offsetY: -10,
        //     text: "X-axis range",
        //   },
        // },
      ],
      yaxis: [
        ...(allerState
          ? getMin_MoyAnnotations(
              flights[0].outboundFlights,
              GREEN_LIGHT,
              alignment
            )
          : []),
        ...(retourState
          ? getMin_MoyAnnotations(
              flights[0].returnFlights,
              RED_LIGHT,
              alignment
            )
          : []),
        // {
        //   y: min1,
        //   y2: mediane1,
        //   borderColor: GREEN_LIGHT,
        //   strokeDashArray: 2,
        //   fillColor: GREEN_LIGHT,
        //   opacity: 0.2,
        //   label: {
        //     borderColor: "transparent",
        //     style: {
        //       color: `#27c43cb5`,
        //       background: "transparent",
        //     },
        //     text: "cheapest",
        //     offsetY: 15,
        //   },
        // },
        // {
        //   y: min2,
        //   y2: mediane2,
        //   borderColor: RED_LIGHT,
        //   strokeDashArray: 2,
        //   fillColor: RED_LIGHT,
        //   opacity: 0.2,
        //   label: {
        //     borderColor: "transparent",
        //     style: {
        //       color: `#ff634796`,
        //       background: "transparent",
        //     },
        //     text: "cheapest",
        //     offsetY: 15,
        //   },
        // },
      ],
      // points: [
      //   {
      //     x: new Date("01 Dec 2017").getTime(),
      //     y: 8607.55,
      //     marker: {
      //       size: 8,
      //       fillColor: "#fff",
      //       strokeColor: "red",
      //       radius: 2,
      //       cssClass: "apexcharts-custom-class",
      //     },
      //     label: {
      //       borderColor: "#FF4560",
      //       offsetY: 0,
      //       style: {
      //         color: "#fff",
      //         background: "#FF4560",
      //       },

      //       text: "Point Annotation",
      //     },
      //   },
      //   {
      //     x: new Date("08 Dec 2017").getTime(),
      //     y: 9340.85,
      //     marker: {
      //       size: 0,
      //     },
      //     image: {
      //       path: "../../assets/images/ico-instagram.png",
      //     },
      //   },
      // ],
    },
  }
}

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
          <div className="apexcharts-tooltip-y-group">
            <span className="apexcharts-tooltip-text-y-label">Time : </span>
            <span className="apexcharts-tooltip-text-y-value">{time}</span>
          </div>
          <div className="apexcharts-tooltip-y-group">
            <span className="apexcharts-tooltip-text-y-label">Price : </span>
            <span className="apexcharts-tooltip-text-y-value">
              {totalPriceOnePassenger} €
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
