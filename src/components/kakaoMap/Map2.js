/* global kakao */
import React, { useState, useEffect, useRef } from "react"
import {MapClass, gps_check} from "../../service/mapFunction"

const { kakao } = window;

const Map2 = (props) => {
    const {location, setLocation} = props

    const mapRef = useRef(null)
    
    const [info, setInfo] = useState()
    const [map, setMap] = useState()
    // const [markers, setMarkers] = useState([])
    const searchInfo = new kakao.maps.InfoWindow({zIndex:1});
    const markers = []

    const search = () => {
        if(gps_check){
            const ps = new kakao.maps.services.Places(map)
            for(let i=1 ; i<=3 ; i++){
                ps.categorySearch('FD6', placesSearchCB, {useMapBounds:true, location: new kakao.maps.LatLng(location.latitude, location.longitude), radius: 500, page:i, size: 15})
            }
            // ps.categorySearch('FD6', placesSearchCB, {useMapBounds:true, location: new kakao.maps.LatLng(map.getCenter().getLat(), map.getCenter().getLng()), radius: 100})
        }
    }
    // map.center().getLat() center.getLng()

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

        markers.push(marker)
    
        // 마커에 클릭이벤트를 등록합니다
        // kakao.maps.event.addListener(marker, 'click', function() {
        //     // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        //     infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        //     infowindow.open(map, marker);
        // });
    }

    const locationLoadSuccess = (pos) => {
        setLocation({latitude:pos.coords.latitude,longitude:pos.coords.longitude})
    }
    const locationLoadError = () => {
        alert('현재 위치를 가져 올 수 없습니다.\n크롬 브라우저를 이용해 주시거나, 현재 위치를 허용해 주세요.')
    }

    const locationMarker = () => {

    }

    // 현재 위치 가져오기
    useEffect(()=>{
        if(gps_check){
            navigator.geolocation.getCurrentPosition(locationLoadSuccess,locationLoadError);
        }
    },[])

    useEffect(() => {
        const docMap = mapRef.current 
        
        const mapOption = { 
            center: new kakao.maps.LatLng(location.latitude, location.longitude), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        }

        setMap(new kakao.maps.Map(docMap, mapOption))
        
    }, [location])

    // 현재 위치에 표출할 마커입니다
    const markerImage = new kakao.maps.MarkerImage("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", new kakao.maps.Size(24, 35))
    const lmarker = new kakao.maps.Marker({ 
        // 지도 중심좌표에 마커를 생성합니다 
        position: new kakao.maps.LatLng(location.latitude, location.longitude),
        map: map,
        image: markerImage
    }); 

    // 현재 위치의 인포윈도우를 생성합니다
    const infowindow = new kakao.maps.InfoWindow({
        content : '<div style="padding:5px;">현재 여기에 계신가요?<br/>계신곳을 클릭해 주세요</div>',
        removable : true
    });

    function test() {
        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
            // 클릭한 위도, 경도 정보를 가져옵니다 
            const latlng = mouseEvent.latLng; 
            
            // 마커 위치를 클릭한 위치로 옮깁니다
            lmarker.setPosition(latlng);
            infowindow.open(map, lmarker);
            
            let message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
            message += '경도는 ' + latlng.getLng() + ' 입니다';
            setLocation({latitude:latlng.getLat(),longitude:latlng.getLng()})

            
            // var resultDiv = document.getElementById('clickLatlng'); 
            // resultDiv.innerHTML = message;
            
        });
   }
    useEffect(()=>{        
        // 인포윈도우를 마커위에 표시합니다 
        infowindow.open(map, lmarker);

        lmarker.setMap(map)
        
        if(map){
            test()
        }
                
    }, [map])



    return (
        <>
            <div className="mapArea">
                <div id="map" ref={mapRef} className="mapContain"></div>
                <button type="button" onClick={search}>현재 위치 검색</button>
                <ul className="searchList">

                </ul>
            </div>
        </>
    )
}

export default Map2