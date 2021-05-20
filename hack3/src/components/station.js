import React from 'react'

function Station(props) {
  const stationId = props.stationId
  const stationName = props.stationName
  const stationType = props.stationType
  const stationOrder = props.stationOrder

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

  var last = false
  if (stationOrder === 1) {
    recName += ' end'
  } 
  else if (stationOrder === 10 && stationType === "R") {
    recName += ' end' 
    last = true
  }
  else if (stationOrder === 11 && stationType === "G") {
    recName += ' end'
    last = true
  }
     
  const line = last ? "":<div id={lineId} className={lineName}></div> 

  return (
    <div className="station-line-container">
      <div id={nameId} className="station-and-name" > {/* you should add both id and onClick to attributes */}
        <div className={recName}>{stationId}</div>
        <div className="station-name">{stationName}</div>
      </div>
      {line}
    </div>
  )
}

export default Station
