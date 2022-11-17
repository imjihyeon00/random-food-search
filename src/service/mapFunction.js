/* global kakao */

const { kakao } = window;
export class MapClass {
    constructor(mapContainer, location){
        this.infowindow = new kakao.maps.InfoWindow({zIndex:1});
        // console.log(loactionLoadYN);
        this.mapContainer = mapContainer
        this.mapLatitude = location.latitude
        this.mapLongitude = location.longitude
        this.marker = new kakao.maps.Marker()

        this.mapOption = { 
            center: new kakao.maps.LatLng(this.mapLatitude, this.mapLongitude), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        }

        this.map = new kakao.maps.Map(this.mapContainer, this.mapOption)
        this.ps = new kakao.maps.services.Places(this.map); 

        this.showMaker()
    }

    showMaker(){
        // 지도를 클릭한 위치에 표출할 마커입니다
        const marker = new kakao.maps.Marker({ 
            // 지도 중심좌표에 마커를 생성합니다 
            position: this.map.getCenter() 
        }); 
        // 지도에 마커를 표시합니다
        marker.setMap(this.map);
    }

    search(){
        this.ps.categorySearch('BK9', this.placesSearchCB, {useMapBounds:true}); 
    }

    // 지도에 마커를 표시하는 함수입니다
    displayMarker(places) {
        console.log(111);
        this.removeMarker()
        const bounds = new kakao.maps.LatLngBounds()

        for ( var i=0; i<places.length; i++ ) {

            // 마커를 생성하고 지도에 표시합니다
            var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                marker = this.addMarker(placePosition, i)
    
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(placePosition);
        }

        this.marker.setMap(this.map);

        // 마커에 클릭이벤트를 등록합니다
        // kakao.maps.event.addListener(marker, 'click', function() {
        //     // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        //     this.infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
        //     this.infowindow.open(this.map, marker);
        // });
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    addMarker(position, idx, title) {
        var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
            imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
            imgOptions =  {
                spriteSize : new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                spriteOrigin : new kakao.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            },
            markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                marker = new kakao.maps.Marker({
                position: position, // 마커의 위치
                image: markerImage 
            });

        marker.setMap(this.map); // 지도 위에 마커를 표출합니다
        this.markers.push(marker);  // 배열에 생성된 마커를 추가합니다

        return marker;
    }

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    placesSearchCB (data, status, pagination) {
        console.log(data);
        if (status === kakao.maps.services.Status.OK) {
            this.displayMarker(data)
        }
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    removeMarker() {
        for ( var i = 0; i < this.markers.length; i++ ) {
            this.markers[i].setMap(null);
        }   
        this.markers = [];
    }
}

export function gps_check(){
    return navigator.geolocation ? true : false
}




// function locationLoadSuccess(pos){
//     // 현재 위치 받아오기
//     var currentPos = new kakao.maps.LatLng(pos.coords.latitude,pos.coords.longitude);

//     // 지도 이동(기존 위치와 가깝다면 부드럽게 이동)
//     map.panTo(currentPos);

//     // 마커 생성
//     var marker = new kakao.maps.Marker({
//         position: currentPos
//     });

//     // 기존에 마커가 있다면 제거
//     marker.setMap(null);
//     marker.setMap(map);
// };

// function locationLoadError(pos){
//     alert('위치 정보를 가져오는데 실패했습니다.');
// };

// // 위치 가져오기 버튼 클릭시
// function getCurrentPosBtn(){
//     navigator.geolocation.getCurrentPosition(locationLoadSuccess,locationLoadError);
// };