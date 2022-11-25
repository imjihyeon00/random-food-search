import React, { useEffect } from "react";

const FoodListModal = ({modalShow, setModalShow, randomStore})=>{

    // useEffect(() => {
    //     document.body.style.cssText = `
    //         position: fixed; 
    //         top: -${window.scrollY}px;
    //         overflow-y: scroll;
    //         width: 100%;`;
    //     return () => {
    //         const scrollY = document.body.style.top;
    //         document.body.style.cssText = '';
    //         window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    //     };
    // }, []);
    useEffect(()=>{
        if(modalShow){
            document.body.style.cssText = `
            position: fixed; 
            top: -${window.scrollY}px;
            overflow-y: scroll;
            width: 100%;`;
        } else {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        }
    },[modalShow])

    return (
        <>
            {modalShow ? 
                <div className="foodModal">
                    <div className="modalBox">
                        <button type="button"
                            onClick={()=>{setModalShow(false)}}
                        >
                            Close
                        </button>
                        <h1>오늘의 음식은?!</h1>
                        <a href={randomStore?.place_url} target="_blank"><h2><span>{randomStore?.category_name}</span>{randomStore?.place_name}</h2></a>
                        <span>음식점 이름을 클릭하면 Kakao Map으로 이동합니다.</span>
                    </div>
                </div>
                : null
            }
        </>
    )
}

export default FoodListModal