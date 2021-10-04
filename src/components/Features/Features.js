import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import "./Features.css"
// import { useState } from 'react/cjs/react.development';
import Rating from 'react-rating';
const Features = (props) => {
    const { star, features } = props;
    const rating = []
    for (let i = 0; i < star; i++) {
        // <i className="fas color-star fa-star"></i>
        rating.push(<FontAwesomeIcon key={"fas" + i} className="color-star" icon={fasStar} />)
    }
    for (let i = 0; i < (5 - star); i++) {
        // <i className="far fa-star"></i>
        rating.push(<FontAwesomeIcon key={"far" + i} className="color-star" icon={farStar} />)
    }
    return (
        <div className="features">
            
            <div className="rating">
                {rating}
                {/* <Rating emptySymbol="fa fa-star-o color-star"
                fullSymbol="fa fa-star color-star" initialRating={star}
                readonly/> */}
            </div>
            <div>
                <h3>Features</h3>
                <ul>
                    {
                        features.map(feature => <li key={feature.description}>
                            {feature.description}: {feature.value}
                        </li>)
                    }
                </ul>
            </div>
        </div>
    );
};

export default Features;