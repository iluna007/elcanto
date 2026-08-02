import MapView from '../components/MapView'
import MapLegend from '../components/MapLegend'
import MapHelp from '../components/MapHelp'
import '../styles/map-sidebar.css'

function MapPage() {
  return (
    <div className="map-page">
      <MapView />
      <div className="map-sidebar">
        <MapHelp />
        <MapLegend />
      </div>
    </div>
  )
}

export default MapPage
