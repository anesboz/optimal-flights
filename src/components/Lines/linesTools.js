import { setVolAller } from "actions/mainAction"
import dateformat from "dateformat"
import { connect } from "react-redux"


export const createOptions = ({ title_text, xaxis_categories, xaxis_title_text, yaxis_title_text, dataLabels_enabled,...props }) => {
  
  return ({
  chart: {
    height: 350,
    type: 'line',
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
    }
  },
  colors: ['#27c43c', '#ff6347eb'],
  stroke: {
    curve: 'smooth',
    width: 1
  },
  title: {
    text: title_text,
    align: 'left'
  },
  grid: {
    borderColor: '#e7e7e7',
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  xaxis: {
    categories: xaxis_categories,
    title: {
      text: xaxis_title_text
    },
    // type: `datetime`,
    tooltip: {
      enabled: !true,
    },
    labels: {
      formatter: function (val, opts) {
        const ff = dateformat(val, `ddd dd/mm`)
        const condition = ff.includes(`Sam`) || ff.includes(`Dim`)
        return ff + (condition ? `🔸` : ``)
        // return `<h2>Hello</h2>`
      },
    },
  },
  yaxis: {
    title: {
      text: yaxis_title_text
    }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'center', 
  },
  tooltip: {
    followCursor: true,
    //   custom: [
    //     function ({ series, seriesIndex, dataPointIndex, w }) {
    //       const value = series[seriesIndex][dataPointIndex]
    //       console.log("🚀  series[seriesIndex]", value )
    //       return `<h2 style={{color: 'red'}}>value</h2>`
    //   },
    //     function ({ series, seriesIndex, dataPointIndex, w }) {
    //       const value = series[seriesIndex][dataPointIndex]
    //       return '<div class="arrow_box">' +
    //         '<span>' +  value + '</span>' +
    //         '</div>'
    //     },
    // ]
  },
  dataLabels: {
    enabled: dataLabels_enabled,
    background: {
      enabled: !true
    },
  },
  markers: {
    size: 3,
  }
})}


const mapStateToProps = (state) => ({
  data: state.mainBranch,
})

export default connect(mapStateToProps, { setVolAller })(createOptions)