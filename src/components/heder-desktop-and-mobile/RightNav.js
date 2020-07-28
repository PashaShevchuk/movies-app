import React from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';
import {SearchField} from "../search-field/SearchField";
import {links} from "../../constants";

const Ul = styled.ul`
  list-style: none;
  margin: 1px;
  padding: 0;
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  
  @media (max-width: 992px) {
    z-index: 19;
    flex-flow: column nowrap;
    background-color: #032541;
    position: fixed;
    transform: ${({open}) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
  }
`;

const RightNav = (props) => {
    const {handleSubmit, handleChange, toFoundMovies, open, onLinkClick} = props;

    return (
        <Ul open={open}>
            {
                links.map(item => {
                    return (
                        <li className="nav-item" key={item.url}>
                            <Link to={item.url} onClick={onLinkClick}
                                  className="header-links-wrapper-link nav-link">{item.name}</Link>
                        </li>
                    );
                })
            }
            <SearchField handleSubmit={handleSubmit}
                         handleChange={handleChange}
                         toFoundMovies={toFoundMovies}
            />

        </Ul>
    )
};

export default RightNav;
