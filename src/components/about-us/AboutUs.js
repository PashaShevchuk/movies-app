import React, {useEffect} from "react";
import MovieDBLogo from '../../assets/movie-db-logo.png';
import './AboutUs.scss';

export const AboutUs = () => {
    useEffect(() => window.scrollTo(0, 0));

    return (
        <div className="about-container">
            <div className="container">
                <div className="row">

                    <div className="col-sm-12 col-md-6">
                        <h6>About US</h6>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequuntur et,
                            impedit iure libero maxime natus nobis odio officiis optio, quaerat quidem, quod reiciendis
                            rem soluta unde veniam voluptate voluptatum. Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Asperiores atque commodi consectetur corporis deserunt dignissimos et
                            excepturi fugit, itaque labore, minima minus, nam nemo omnis qui quo rem rerum voluptatum.
                        </p>
                    </div>

                    <div className="col-sm-12 col-md-6">
                        <h6>Some information</h6>
                        <div className="d-flex">
                            <div>This product uses the TMDb API but is not endorsed or certified by TMDb.</div>
                            <div><img src={MovieDBLogo} alt="Movie DB logo" className="movie-logo"/></div>
                        </div>
                        <p>
                            The Movie Database (TMDb) is a community built movie and TV database. Every piece of data
                            has been added by amazing community dating back to 2008. TMDb's strong international focus
                            and breadth of data is largely unmatched.
                        </p>
                    </div>

                    <div className="col-sm-12 col-md-6">
                        <h6>Lorem ipsum</h6>
                        <ol>
                            <li><span><div className="number">01</div></span>
                                <p className="paragraph-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Ducimus enim facere facilis harum ipsa libero maxime molestiae non, nostrum quaerat
                                    quibusdam quisquam quos reiciendis repudiandae sapiente sequi sunt voluptate?
                                    Ipsum?</p>
                            </li>

                            <li><span><div className="number">02</div></span>
                                <p className="paragraph-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Ducimus enim facere facilis harum ipsa libero maxime molestiae non, nostrum quaerat
                                    quibusdam quisquam quos reiciendis repudiandae sapiente sequi sunt voluptate?
                                    Ipsum?</p>
                            </li>

                            <li><span><div className="number">03</div></span>
                                <p className="paragraph-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Ducimus enim facere facilis harum ipsa libero maxime molestiae non, nostrum quaerat
                                    quibusdam quisquam quos reiciendis repudiandae sapiente sequi sunt voluptate?
                                    Ipsum?</p>
                            </li>

                            <li><span><div className="number">04</div></span>
                                <p className="paragraph-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Ducimus enim facere facilis harum ipsa libero maxime molestiae non, nostrum quaerat
                                    quibusdam quisquam quos reiciendis repudiandae sapiente sequi sunt voluptate?
                                    Ipsum?</p>
                            </li>

                            <li><span><div className="number">05</div></span>
                                <p className="paragraph-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Ducimus enim facere facilis harum ipsa libero maxime molestiae non, nostrum quaerat
                                    quibusdam quisquam quos reiciendis repudiandae sapiente sequi sunt voluptate?
                                    Ipsum?</p>
                            </li>
                        </ol>
                    </div>

                    <div className="col-sm-12 col-md-6">
                        <h6>dolor sit</h6>
                        <ol>
                            <li><span><div className="number">06</div></span>
                                <p className="paragraph-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Ducimus enim facere facilis harum ipsa libero maxime molestiae non, nostrum quaerat
                                    quibusdam quisquam quos reiciendis repudiandae sapiente sequi sunt voluptate?
                                    Ipsum?</p>
                            </li>

                            <li><span><div className="number">07</div></span>
                                <p className="paragraph-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Ducimus enim facere facilis harum ipsa libero maxime molestiae non, nostrum quaerat
                                    quibusdam quisquam quos reiciendis repudiandae sapiente sequi sunt voluptate?
                                    Ipsum?</p>
                            </li>

                            <li><span><div className="number">08</div></span>
                                <p className="paragraph-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Ducimus enim facere facilis harum ipsa libero maxime molestiae non, nostrum quaerat
                                    quibusdam quisquam quos reiciendis repudiandae sapiente sequi sunt voluptate?
                                    Ipsum?</p>
                            </li>

                            <li><span><div className="number">09</div></span>
                                <p className="paragraph-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Ducimus enim facere facilis harum ipsa libero maxime molestiae non, nostrum quaerat
                                    quibusdam quisquam quos reiciendis repudiandae sapiente sequi sunt voluptate?
                                    Ipsum?</p>
                            </li>

                            <li><span><div className="number">10</div></span>
                                <p className="paragraph-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Ducimus enim facere facilis harum ipsa libero maxime molestiae non, nostrum quaerat
                                    quibusdam quisquam quos reiciendis repudiandae sapiente sequi sunt voluptate?
                                    Ipsum?</p>
                            </li>
                        </ol>
                    </div>

                </div>
            </div>
        </div>
    )
};
