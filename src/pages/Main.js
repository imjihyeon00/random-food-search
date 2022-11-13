import React, {useState} from 'react'
import Header from '../components/header/Header'
import Map from '../components/kakaoMap/Map'


const Main = () => {
    const [location, setLocation]=useState({latitude:33.450701,longitude:126.570667})
    return (
        <>
            <Header 
                setLocation={setLocation}
            />
            <Map 
                setLocation={setLocation}
                location={location}
            /> 
        </>
    )
}

export default Main