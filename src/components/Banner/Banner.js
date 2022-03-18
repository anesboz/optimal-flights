import React from 'react'
import appLogo from "assets/images/optimal-flights-logo.jpg"

export default function Banner() {
  return (
    <div
      style={{
        height: 80,
        display: `flex`,
        alignContent: `center`,
        justifyContent: `center`,
        backgroundColor: `#34495e`,
      }}
    >
      <h2
        style={{
          color: `yellow`,
        }}
      >
        ✈️ Optimal Flights
      </h2>
    </div>
  )
}
