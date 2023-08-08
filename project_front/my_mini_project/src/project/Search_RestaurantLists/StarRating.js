// 별점 매기기
import { FaStar } from 'react-icons/fa';

const StarRating = ({ review, onStarClick, hoverRating, onStarHover }) => {
    const starRange = [...Array(5).keys()]; // 0부터 4까지의 배열

    return (
        <div>
            {starRange.map((index) => (
                <FaStar
                    key={index}
                    className={`star ${hoverRating >= index + 1 ? 'hovered' : ''}`}
                    onClick={() => onStarClick(index + 1)}
                    onMouseEnter={() => onStarHover(index + 1)}
                    onMouseLeave={() => onStarHover(0)}
                />
            ))}
        </div>
    );
};
export default StarRating;