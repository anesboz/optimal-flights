export function getX(data) {
  if (!data) return []
  // return data.map(elm => elm.date + ` `+ elm.horaire)
  return data.map(elm => elm.date.split(` `)[0])
}

export function getY(data) {
  if (!data) return []
  return data.map(elm => elm.prix)
}

export function addMath(series) {
  console.log("🚀 ~ file: Main.js ~ line 22 ~ addMath ~ series", series)
  var minArr = []
  var maxArr = []
  series.map(({ data }) => {
    minArr.push(Math.min(...data.filter(e => e)))
    maxArr.push(Math.max(...data.filter(e => e)))
  })
  console.log("🚀 ~ file: Main.js ~ line 23 ~ addMath ~ minArr", minArr)
  console.log("🚀 ~ file: Main.js ~ line 25 ~ addMath ~ maxArr", maxArr)

  // const n = series[0].data.length
  return [...series,
  {
    name: `Min`,
    data: series[0].data.map(_ => Math.min(...minArr))
  },
  {
    name: `Max`,
    data: series[0].data.map(_ => Math.max(...maxArr))
  }
  ]
}
