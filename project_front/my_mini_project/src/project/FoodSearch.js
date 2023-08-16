// 라우트 지정
import { Route, Routes, BrowserRouter } from "react-router-dom";
import FoodMain from "./FoodMain";
import FoodFind from "./Search_RestaurantLists/FoodFind";
import FoodComm from "./Community(SignUp&In)/FoodComm";
import Joinus from './Community(SignUp&In)/Joinus';
import Login from "./Community(SignUp&In)/Login";
import { useState, useEffect } from 'react';
import Write from "./Community(SignUp&In)/Write";
import PostDetail from "./Community(SignUp&In)/PostDetail";



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
            <main>
                <Routes>
                    {/* main page */}
                    <Route path='/' element={<FoodMain />} />
                    {/* search page */}
                    {/* probs 이용해서 FoodFind component로 useState 변수 locations 보내기 */}
                    <Route path='/find' element={locations && <FoodFind locations={locations} />} />
                    {/* community page */}
                    <Route path='/comm' element={<FoodComm />} />
                    <Route path="/write" element={<Write />} />
                    <Route path="/post/:id" element={<PostDetail />} />
                </Routes>
            </main>
            <Routes>
                <Route path="/joinus" element={<Joinus />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default FoodSearch;