import React from 'react'
import Station from './station'

function RouteGraph(props) {
  const data = props.route_data
  const stations = []

  for (let i = 0; i < data.length; i++) {
    stations.push(
      <Station
        stationId={data[i].station_id}
      />
    )
  }

  return (
    <div className="route-graph-container">
      {
        // generate many stations
        // use <Station /> with your own customized parameters
        // coding here ...
        stations
      }
    </div>
  )
}

export default RouteGraph
