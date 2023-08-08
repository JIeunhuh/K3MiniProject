import { useState } from 'react';
import style from '../Food.module.css';
import FoodInfo from './FoodInfo';

const SearchList = ({ searchRes }) => {
    const itemsPerPage = 10;
    const pagesPerGroup = 5; // 한 그룹에 보여줄 페이지 수
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [rvLists, setRvLists] = useState([]);

    const totalItems = searchRes.length;
    const totalGroups = Math.ceil(totalItems / (itemsPerPage * pagesPerGroup));
    const currentGroup = Math.ceil(currentPage / pagesPerGroup);

    const startPage = (currentGroup - 1) * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalGroups * pagesPerGroup);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = searchRes.slice(indexOfFirstItem, indexOfLastItem);

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
        );
    });

    const handleRestaurantClick = (restaurant) => {
        setSelectedRestaurant(restaurant);
        let url = 'http://10.125.121.176:8080/getReviewList/';
        url = url + restaurant.id;

        fetch(url)
            .then((resp) => resp.json())
            .then((data) => setRvLists(data))
            .catch((err) => console.log(err));

        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className={`${style.info}`}>
            {currentItems.length === 0 ? <div> 검색 결과가 없습니다.</div> :
                <table border='1px solid'>
                    <th>Restaurant</th>
                    <th>Food</th>
                    <th>Address</th>
                    {foodTags}
                </table>
            }
            {searchRes.length > itemsPerPage && (
                <div className={`${style.pagination}`}>
                    {startPage > 1 && (
                        <button onClick={() => paginate(startPage - 1)} className={`${style.pageLink}`}>이전</button>
                    )}
                    {Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage).map((number) => (
                        <button
                            key={number}
                            onClick={() => paginate(number)}
                            className={`${style.pageLink} ${currentPage === number ? style.active : ''}`}
                        >
                            {number}
                        </button>
                    ))}
                    {endPage < totalGroups * pagesPerGroup && (
                        <button onClick={() => paginate(endPage + 1)} className={`${style.pageLink}`}>다음</button>
                    )}
                </div>
            )}
            <FoodInfo isOpen={showModal} onClose={closeModal} restaurant={selectedRestaurant} rvLists={rvLists} />
        </div>
    );
};

export default SearchList;