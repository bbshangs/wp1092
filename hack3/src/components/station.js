import React from 'react'

function Station(props) {
  const stationId = props.stationId
  const nameId = `s-${stationId}`
  const lineId = `l-${stationId}`
  console.log("nameId = ", nameId)
  console.log("lineId = ", lineId)
  return (
    <div className="station-line-container">
      <div id={nameId} className="station-and-name"> {/* you should add both id and onClick to attributes */}
        <div className="station-rectangle"></div>
        <div className="station-name"></div>
      </div>
      <div id={lineId} className="line"></div> {/* you should add both id to attributes */}
    </div>
  )
}

export default Station
