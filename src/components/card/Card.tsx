import React from 'react'
import img from '../../resources/icons/noimage.png'
import { useState } from 'react'
interface CardProps {
    image: Image;
}
const Card = ({ image }: CardProps) => {
    const [showNoImage, SetshowNoImage] = useState(false)
    function handleError() {
        SetshowNoImage(true);
    }
    return (
        <div className="card">
            <img
                src={!showNoImage ? image.url : img}
                alt="cate"
                onError={handleError}
            />
        </div>
    )
}
export default Card;