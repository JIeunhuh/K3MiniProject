import { useState } from 'react';
import style from './Food.module.css';

const SearchList = ({ searchRes }) => {
    // 페이징 관련 상태
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

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

    return (
        <div className={`${style.info}`}>
            {currentItems.length === 0 ? <div> 검색 결과가 없습니다.</div> : currentItems.map((result, index) => (
                <div key={index}>
                    <p>식당 이름: {result.rname}, 식당 주소: {result.city_gu} </p>
                </div>
            ))}
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
        </div>
    );
}

export default SearchList;