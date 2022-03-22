import React from "react"
import dateformat from "dateformat"
import { connect } from "react-redux"

export default function Vol({ vol, color, title, resetFunction}) {
  if (Object.keys(vol).length === 0) return null
  const { date, totalPriceOnePassenger, time, href } = vol
  return (
    <div style={{ color, padding: 20 }}>
      {/* <b className="center">{title}</b> */}
      <b>
        {title} <span onClick={resetFunction}>🗑️</span>
      </b>
      <div className="apexcharts-tooltip-y-group">
        <span className="apexcharts-tooltip-text-y-label">📅 Date: </span>
        <span className="apexcharts-tooltip-text-y-value">
          {dateformat(date, `dddd dd mmmm yyyy`)}
        </span>
      </div>
      <div className="apexcharts-tooltip-y-group">
        <span className="apexcharts-tooltip-text-y-label">🕑 Time: </span>
        <span className="apexcharts-tooltip-text-y-value">{time}</span>
      </div>
      <div className="apexcharts-tooltip-y-group">
        <span className="apexcharts-tooltip-text-y-label">💸 Price: </span>
        <span className="apexcharts-tooltip-text-y-value">
          {totalPriceOnePassenger} €
        </span>
      </div>
      <div className="apexcharts-tooltip-y-group">
        <span className="apexcharts-tooltip-text-y-label">✈️ Book: </span>
        <a
          className="apexcharts-tooltip-text-y-value"
          href={href}
          target="_blank"
        >
          transavia.com
        </a>
      </div>
    </div>
  )
}
