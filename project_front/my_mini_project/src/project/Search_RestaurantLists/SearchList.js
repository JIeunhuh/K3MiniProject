// Food List
import { useState } from 'react';
import style from '../Food.module.css';
import FoodInfo from './FoodInfo';

const SearchList = ({ searchRes }) => {
    // 페이징 관련 상태
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    // modal 창 상태
    const [showModal, setShowModal] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    // 검색 결과를 페이징 기준으로 분할
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchRes.slice(indexOfFirstItem, indexOfLastItem);

    // 검색 결과의 총 개수를 구함
    const totalItems = searchRes.length;

    // 검색 결과를 페이징 기준으로 보여주는 함수
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    let foodTags = [];
    currentItems.map((result, idx) => {
        foodTags.push(
            <tr key={idx} onClick={() => handleRestaurantClick(result)}>
                <td>{result.rname}</td>
                <td>{result.food}</td>
                <td>{result.city + ' ' + result.city_gu + ' ' + result.city_dong}</td>
            </tr>
        )
    });
    const handleRestaurantClick = (restaurant) => {
        setSelectedRestaurant(restaurant);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className={`${style.info}`}>
            {currentItems.length === 0 ? <div> 검색 결과가 없습니다.</div> :
                <table border='1px; solid;'>
                    <th>Restaurant</th>
                    <th>Food</th>
                    <th>Address</th>
                    {foodTags}
                </table>
            }
            {/* paging */}
            {searchRes.length > itemsPerPage && (
                <ul className={`${style.pagination}`}>
                    {Array.from({ length: Math.ceil(totalItems / itemsPerPage) }, (_, i) => i + 1).map((number) => (
                        <button
                            onClick={() => paginate(number)}
                            className={`${style.pageLink}`}
                        >
                            {number}
                        </button>
                    ))}
                </ul>
            )}
            <FoodInfo isOpen={showModal} onClose={closeModal} restaurant={selectedRestaurant} />
        </div>
    );
}

export default SearchList;