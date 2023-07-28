// 라우트 지정
import { Route, Routes, BrowserRouter } from "react-router-dom";
import FoodMain from "./FoodMain";
import FoodFind from "./FoodFind";
import FoodComm from "./FoodComm";
import FoodNav from "./FoodNav";
import {useState} from 'react';

const FoodSearch = () => {

    return (
        <BrowserRouter>
            <main className="container">
                {/* 상단의 navigation */}
                <FoodNav />
                <Routes>
                    {/* main page */}
                    <Route path='/' element={<FoodMain />} />
                    {/* search page */}
                    {<Route path='/find' element={<FoodFind />} /> }
                    {/* community page */}
                    <Route path='/comm' element={<FoodComm />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
};

export default FoodSearch;