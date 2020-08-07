import React from 'react';
import './Pagination.scss';

export const Pagination = (props) => {
    const {pages, nextP, currentPage} = props;

    let items = [];
    let maxPages = pages;
    let leftSide = currentPage - 2;
    if (leftSide <= 0) leftSide = 1;

    let rightSide = currentPage + 2;
    if (rightSide > maxPages) rightSide = maxPages;

    for (let i = leftSide; i <= rightSide; i++) {
        items.push(
            <div
                key={i}
                className={(i === currentPage ? 'round-effect active' : 'round-effect')}
                onClick={() => {

                    nextP(i);
                }}>
                {i}
            </div>
        );
    }

    const nextPage = () => {
        if (currentPage < maxPages) {

            nextP(currentPage + 1)
        }
    }

    const prevPage = () => {
        if (currentPage > 1) {

            nextP(currentPage - 1)
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
