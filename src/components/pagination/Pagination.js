import React from 'react';
import './Pagination.scss';

export const Pagination = (props) => {
    const [currentPage, setCurrentPage] = React.useState(props.currentPage);

    let items = [];
    let maxPages = props.pages;
    let leftSide = currentPage - 2;
    if (leftSide <= 0) leftSide = 1;

    let rightSide = currentPage + 2;
    if (rightSide > maxPages) rightSide = maxPages;

    for (let i = leftSide; i <= rightSide; i++) {
        items.push(
            <div
                key={i}
                className={(i === currentPage ? 'round-effect active' : 'round-effect')}
                onClick={() => {setCurrentPage(i); props.nextPage(i);}}>
                {i}
            </div>
        );
    }

    const nextPage = () => {
        if (currentPage < maxPages) {
            setCurrentPage(currentPage + 1)
            props.nextPage(currentPage + 1)
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            props.nextPage(currentPage - 1)
        }
    }

    return (
        <div className="flex-container">
            <div className="paginate-ctn">
                <div className="round-effect" onClick={prevPage}> &#10094; </div>
                {items}
                <div className="round-effect" onClick={nextPage}> &#10095; </div>
            </div>
        </div>
    );
};
