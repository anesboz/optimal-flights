import React from "react"
import { Button } from "@mui/material"

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
      className="center-y"
    >
      <h2
        style={{
          color: `yellow`,
          cursor: "pointer"
        }}
        onClick={() => window.location.reload(false)}
      >
        ✈️ Optimal Flights
      </h2>
      <Button
        style={{
          position: 'absolute',
          right: 20,
          color: 'white',
        }}
        variant="outlined"
        onClick={() =>
          window.open('https://github.com/anesboz/optimal-flights#readme')
        }
      >
        Tutorial
      </Button>
    </div>
  )
}
