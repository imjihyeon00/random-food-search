/* global kakao */
const { kakao } = window;

export class MapClass {
    constructor(mapContainer, location){
        // console.log(loactionLoadYN);
        this.mapContainer = mapContainer
        console.log(location);
        this.mapLatitude = location.latitude
        this.mapLongitude = location.longitude
         

        this.mapOption = { 
            center: new kakao.maps.LatLng(this.mapLatitude, this.mapLongitude), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        }

        this.map = new kakao.maps.Map(this.mapContainer, this.mapOption)
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