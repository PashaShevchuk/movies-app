import React, {useState} from "react";
import styled from 'styled-components';
import RightNav from "./RightNav";
import {withRouter} from "react-router";

const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: ${({open}) => open ? 'fixed' : 'absolute'};
  top: 24px;
  right: 20px;
  z-index: 20;
  display: none;
  
  @media (max-width: 992px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({open}) => open ? '#ccc' : '#2472d3'};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({open}) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    &:nth-child(2) {
      transform: ${({open}) => open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${({open}) => open ? 0 : 1};
    }
    &:nth-child(3) {
      transform: ${({open}) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

const BurgerMenuComponent = (props) => {
    const {handleSubmit, handleChange, history, searchTerm} = props;
    const [open, setOpen] = useState(false);

    const onLinkClick = () => setOpen(!open);

    const toFoundMovies = () => {
        if (searchTerm === '') return;
        onLinkClick();
        history.push('/found-movies');
        window.scrollTo(0, 0);
    };

    return (
        <div>
            <StyledBurger open={open} onClick={() => setOpen(!open)}>
                <div/>
                <div/>
                <div/>
            </StyledBurger>
            <RightNav open={open}
                      handleSubmit={handleSubmit}
                      handleChange={handleChange}
                      toFoundMovies={toFoundMovies}
                      onLinkClick={onLinkClick}
            />
        </div>
    )
};

export const BurgerMenu = withRouter(BurgerMenuComponent);
