/* global kakao */
import React, { useEffect } from "react"

const { kakao } = window;

const Map = () => {
    useEffect(()=>{
        const mapContainer = document.getElementById('map')
        const mapOption = { 
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

        const map = new kakao.maps.Map(mapContainer, mapOption)
    },[])

    return (
        <div className="mapArea">
            <div id="map" className="mapContain"></div>
        </div>
    )
}

export default Map