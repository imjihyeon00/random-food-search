/* global kakao */
import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom";
import {MapClass, gps_check} from "../../service/mapFunction"
import FoodListModal from "../modal/FoodListModal";

const { kakao } = window;

const Map2 = (props) => {
    const {location, setLocation} = props

    const mapRef = useRef(null)
    const [map, setMap] = useState()
    const [searchList, setSearchList] = useState([])
    const [modalShow, setModalShow] = useState(false)
    let markers = []
    // let randomStore = {}
    const [randomStore, setRandomStore] = useState()

    const search = () => {

        removeMarker()
        setSearchList([])
        setRandomStore()


        if(gps_check){
            const ps = new kakao.maps.services.Places(map)
            map.setLevel(4)
            map.setCenter(new kakao.maps.LatLng(location.latitude, location.longitude));  
            for(let i=1 ; i<=3 ; i++){
                ps.categorySearch('FD6', placesSearchCB, {useMapBounds:true, location: new kakao.maps.LatLng(location.latitude, location.longitude), radius: 500, page:i, size: 15})
            }
            // ps.categorySearch('FD6', placesSearchCB, {useMapBounds:true, location: new kakao.maps.LatLng(map.getCenter().getLat(), map.getCenter().getLng()), radius: 100})
            
        }
        
        
    }

    useEffect(()=>{
        // console.log(searchList.length);
        // randomStore = searchList[Math.floor(Math.random() * searchList.length)];
        setRandomStore(searchList[Math.floor(Math.random() * searchList.length)]);
    },[searchList])
    useEffect(()=>{
        console.log(randomStore);
        if(randomStore !== undefined) setModalShow(true)
    },[randomStore])

    const placesSearchCB = (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
            for (let i=0; i<data.length; i++) {
                displayMarker(data[i]);    
                setSearchList(searchList => [...searchList, data[i]])
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
        // console.log(place);
    
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
        alert('현재 위치를 가져 올 수 없습니다.\n크롬 브라우저를 이용해 주시거나, 현재 위치를 허용해 주세요.\n혹은 직접 현재 위치를 선택하실 수 있습니다.')
    }

    const removeMarker = () => {
        for ( let i = 0; i < markers.length; i++ ) {
            markers[i].setMap(null);
        }   
        markers = [];
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
            level: 4 // 지도의 확대 레벨
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
                <div className="contArea">
                    <div className="tit">
                        <h2>목록</h2>
                        <button type="button" onClick={search}>오늘 뭐 먹지?</button>
                    </div>

                    <ul className="searchList">
                        {searchList ?
                            searchList.map((list, idx)=>(
                                <li key={idx}>
                                    <a href={list.place_url} target="_blank">
                                        <h3>{list.place_name} <span>{list.category_name}</span></h3>
                                        <p>{list.road_address_name}</p>
                                    </a>
                                </li>
                            ))
                        : '123'
                        }
                        
                    </ul>
                </div>
            </div>
            
            <FoodListModal
                modalShow={modalShow}
                setModalShow={setModalShow}
                randomStore={randomStore}
            />
        </>
    )
}

export default Map2