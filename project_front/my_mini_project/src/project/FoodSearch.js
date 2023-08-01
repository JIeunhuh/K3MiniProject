// 라우트 지정
import { Route, Routes, BrowserRouter } from "react-router-dom";
import FoodMain from "./FoodMain";
import FoodFind from "./FoodFind";
import FoodComm from "./FoodComm";
import FoodNav from "./FoodNav";
import { useState, useEffect } from 'react';
import Joinus from "./Joinus";
import Login from "./Login";

const FoodSearch = () => {

    // useState 사용
    // props할 url : FoodFind
    const [locations, setLocations] = useState([]);
    
    useEffect(() => {//data fetch
        const getData = (event) => {
            // event.preventDefault();
            let url = 'http://10.125.121.176:8080/cities';

            //fetch()
            fetch(url)
                .then((resp) => resp.json())
                .then((data) => setLocations(data))
                .catch((err) => console.log(err));
        }
        getData();
    }, []);

    return (
        <BrowserRouter>
            <main className="container">
                {/* 상단의 navigation */}
                <FoodNav />
                <Routes>
                    {/* main page */}
                    <Route path='/' element={<FoodMain />} />
                    {/* search page */}
                    {/* probs 이용해서 FoodFind component로 useState 변수 locations 보내기 */}
                    <Route path='/find' element={locations && <FoodFind locations = {locations} />} />
                    {/* community page */}
                    <Route path='/comm' element={<FoodComm />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/join' element={<Joinus />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
};

export default FoodSearch;