import React, {useEffect, useState} from 'react'
import Header from '../components/header/Header'
import Map from '../components/kakaoMap/Map'
import Map2 from '../components/kakaoMap/Map2'


const Main = () => {
    const [location, setLocation]=useState({latitude:33.450701,longitude:126.570667})
    const [map, setMap] = useState()
    useEffect(()=>{
    },[location])
    return (
        <>
            <Header 
                setLocation={setLocation}
            />
            {/* <Map 
                setLocation={setLocation}
                location={location}
            />  */}
            <Map2 
                setLocation={setLocation}
                location={location}
                setMap={setMap}
                map={map}
            />
        </>
    )
}

export default Main