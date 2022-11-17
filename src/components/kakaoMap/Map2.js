/* global kakao */
import React, { useState, useEffect, useRef } from "react"
import {MapClass, gps_check} from "../../service/mapFunction"


const Map2 = (props) => {
    const { kakao } = window;
    const {location, setLocation, setMap, map} = props

    const mapRef = useRef(null)
    
    const [info, setInfo] = useState()
    const [markers, setMarkers] = useState([])
    
    
    useEffect(() => {
        const docMap = mapRef.current 
        
        const mapOption = { 
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        }

        setMap(new kakao.maps.Map(docMap, mapOption))
    }, [])


    return (
        <div className="mapArea">
            <div id="map" ref={mapRef} className="mapContain"></div>
        </div>
    )
}

export default Map2