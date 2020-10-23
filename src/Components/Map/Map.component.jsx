import React from 'react'
import './map.css'
import {Map as LeafletMap,TileLayer} from 'react-leaflet'
import {showDataOnMap} from '../../Utils/utils'
import { useStateValue } from '../../Hooks/state'

const MapInfo = () => {

    const [{mapCenter,mapData,caseType}] = useStateValue();

    return(
        <div className="map">
            <LeafletMap center={mapCenter.center} zoom={mapCenter.zoom}>
                <TileLayer  
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                 {showDataOnMap(mapData,caseType)}
            </LeafletMap>

            {/* loop throught the countries and draw the circles */}
           
        </div>
    )
}

export default MapInfo