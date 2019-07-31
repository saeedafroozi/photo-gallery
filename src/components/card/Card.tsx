import React from 'react'
interface CardProps {
    image: Image;
}
const Card = ({ image }: CardProps) => {
    return (
        <div className="card">
            <img src={image.url}
            />
        </div>
    )
}
export default Card;