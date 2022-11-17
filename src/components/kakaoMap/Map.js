/* global kakao */
import React, { useState, useEffect, useRef } from "react"
import {MapClass, gps_check} from "../../service/mapFunction"


const Map = (props) => {
    const { kakao } = window;
    const {location, setLocation} = props
    const {error, setError} = useState()

    const mapRef = useRef(null)

    const handleSuccess = (pos) => {
        const { latitude, longitude } = pos.coords;
    
        setLocation({
            latitude,
            longitude,
        });
    };

    const handleError = (error) => {
        setError(error.message);
        setLocation()
    };

    let map;
    useEffect(()=>{
        const { geolocation } = navigator;
        

        // 사용된 브라우저에서 지리적 위치(Geolocation)가 정의되지 않은 경우 오류로 처리합니다.
        if (!geolocation) {
            setError("Geolocation is not supported.");
        }

        geolocation.getCurrentPosition(handleSuccess, handleError);
    },[])

    useEffect(()=>{
        const docMap = mapRef.current 
        map = new MapClass(docMap, location)
        map.search()
    },[location])
    


    return (
        <div className="mapArea">
            <div id="map" ref={mapRef} className="mapContain"></div>
        </div>
    )
}

export default Map