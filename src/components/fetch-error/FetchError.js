import React from "react";

export const FetchError = (props) => {
    return (
        <div className="alert alert-warning">
            <strong>Error!</strong> Status: {props.error}
        </div>
    )
};