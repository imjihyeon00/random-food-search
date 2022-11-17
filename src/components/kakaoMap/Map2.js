/* global kakao */
import React, { useState, useEffect, useRef } from "react"
import {MapClass, gps_check} from "../../service/mapFunction"


const Map2 = (props) => {
    const { kakao } = window;
    const {location, setLocation, setMap, map} = props

    const mapRef = useRef(null)
    
    const [info, setInfo] = useState()
    const [markers, setMarkers] = useState([])
    const infowindow = new kakao.maps.InfoWindow({zIndex:1});

    const search = () => {
        if(gps_check){
            const ps = new kakao.maps.services.Places(map)
            ps.categorySearch('BK9', placesSearchCB, {useMapBounds:true})
        }
    }

    const placesSearchCB = (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
            for (let i=0; i<data.length; i++) {
                displayMarker(data[i]);    
            }       
        }
    }

    const displayMarker = (place) => {
        // removeMarker()
        const marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x) 
        });
    
        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindow.open(map, marker);
        });
    }
    
    
    useEffect(() => {
        const docMap = mapRef.current 
        
        // {latitude:33.450701,longitude:126.570667}
        
        const mapOption = { 
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        }
        
        setMap(new kakao.maps.Map(docMap, mapOption))

    }, [])


    return (
        <div className="mapArea">
            <div id="map" ref={mapRef} className="mapContain"></div>
            <button type="button" onClick={search}> gpggpgp</button>
        </div>
    )
}

export default Map2