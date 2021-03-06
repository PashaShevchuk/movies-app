import React from "react";
import {Link} from "react-router-dom";
import {DarkThemeSwitcher} from "../dark-theme-switcher/DarkThemeSwitcher";
import facebookIcon from '../../assets/facebook-icon.png';
import twitterIcon from '../../assets/twitter-icon.png';
import githubIcon from '../../assets/github-icon.png';
import linkedinIcon from '../../assets/lindin-icon.png';
import mapmarkerIcon from '../../assets/map-marker-icon.png';
import phoneIcon from '../../assets/phone-icon.png';
import evenlopIcon from '../../assets/envelope-icon.png';
import './Footer.scss'

export const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <h6>About</h6>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam atque beatae cumque
                            dignissimos hic, inventore labore, nesciunt nisi quam, reiciendis rem repellat
                            voluptatem! Consectetur, et, placeat. Accusamus aliquid delectus maxime. Lorem ipsum
                            dolor sit amet, consectetur adipisicing elit. Delectus, dolorum.
                        </p>
                    </div>

                    <div className="col-xs-6 col-md-3 quick-links">
                        <h6>Quick Links</h6>
                        <ul className="footer-links" onClick={() => window.scrollTo(0, 0)}>
                            <li><Link to="/movies">Movies</Link></li>
                            <li><Link to="/tv-shows">TV Shows</Link></li>
                            <li><Link to="/watchlist">Watchlist</Link></li>
                            <li><Link to="/about-us">About Us</Link></li>
                        </ul>
                    </div>

                    <div className="col-xs-6 col-md-3 central-icon">
                        <div className="d-flex icon-container">
                            <div><img src={mapmarkerIcon} className="icons-contact" alt="facebookIcon"/></div>
                            <div>Shevchenka street 12, Lviv, Ukraine</div>
                        </div>
                        <div className="d-flex icon-container">
                            <div><img src={phoneIcon} className="icons-contact" alt="facebookIcon"/></div>
                            <div>+380-012-34-56, (032)239-01-23</div>
                        </div>
                        <div className="d-flex">
                            <div><img src={evenlopIcon} className="icons-contact" alt="facebookIcon"/></div>
                            <div>movie@movie.com</div>
                        </div>
                    </div>

                </div>

                <DarkThemeSwitcher/>

                <hr/>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-sm-6 col-xs-12">
                        <p className="copyright-text">Copyright &copy; 2020 All Rights Reserved by Lorem ipsum
                        </p>
                    </div>

                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <ul className="social-icons">
                            <li>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a className="facebook">
                                    <img src={facebookIcon} className="icons" alt="facebookIcon"/>
                                </a>
                            </li>
                            <li>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a className="twitter">
                                    <img src={twitterIcon} className="icons" alt="twitterIcon"/>
                                </a>
                            </li>
                            <li>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a className="dribbble">
                                    <img src={githubIcon} className="icons" alt="githubIcon"/>
                                </a>
                            </li>
                            <li>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a className="linkedin">
                                    <img src={linkedinIcon} className="icons" alt="linkedinIcon"/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
};
