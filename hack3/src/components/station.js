import React from 'react'

function Station(props) {
  const stationId = props.stationId
  const stationName = props.stationName
  const stationType = props.stationType

  
  const nameId = `s-${stationId}`
  const lineId = `l-${stationId}`
  var recName = "station-rectangle"
  var lineName = "line"
  switch (stationType) {
    case 'R':
      recName += ' red'
      lineName += ' red'
      break;
    case 'G':
      recName += ' green'
      lineName += ' green'
      break
    case 'O':
      recName += ' orange'
      lineName += ' orange'
      break;
    case 'B':
      recName += ' blue'
      lineName += ' blue'
      break;
  }

  console.log("nameId = ", nameId)
  console.log("lineId = ", lineId)
  return (
    <div className="station-line-container">
      <div id={nameId} className="station-and-name"> {/* you should add both id and onClick to attributes */}
        <div className={recName}>{stationId}</div>
        <div className="station-name">{stationName}</div>
      </div>
      <div id={lineId} className={lineName}></div> {/* you should add both id to attributes */}
    </div>
  )
}

export default Station
