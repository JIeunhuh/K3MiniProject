// 라우트 지정
import { Route, Routes, BrowserRouter } from "react-router-dom";
import FoodMain from "./FoodMain";
import FoodFind from "./FoodFind";
import FoodComm from "./FoodComm";
import FoodNav from "./FoodNav";

const FoodSearch = () => {
    return (
        <BrowserRouter>
            <main className="container">
            <FoodNav />
                <Routes>
                    <Route path='/' element={<FoodMain />} />
                    <Route path='/find/:city/:gu/:kw' element={<FoodFind />} />
                    <Route path='/comm' element={<FoodComm />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
};

export default FoodSearch;