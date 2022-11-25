const Header = () => {


    return (
        <header>
            <div>
                <h1>오늘 뭐 먹지?</h1>
                <button type="button" onClick={()=>{}}>
                    이용 방법
                    <div className="tooltip">
                        1. 현재 위치를 확인 합니다. 현재 있는 곳과 다르면 지도를 클릭해 현재 위치를 설정해 주세요.<br />
                        2. 오른쪽 아래 "오늘 뭐 먹지?" 버튼을 클릭해 주세요.<br />
                        3. 랜덤으로 현재 위치 근처의 음식점을 골라줍니다.<br />
                        4. 랜덤 음식이 마음에 들지 않는다면, 근처 음식점들의 목록을 확인해 주세요.
                    </div>      
                </button>
            </div>
            
        </header>
    )
}

export default Header