import React from 'react'
interface CardProps {
    image: Image;
}
const Card = ({image}:CardProps) => {
    return (
        <div className="card">
            <img  src={image.url} 
             style={{width:'100%'}}
             />
             {/* <div>
                 <p>asdfasdfs adf asdf asdf asdf asdfffffffffffffffffffffffffffffffffffffffffff</p>
             </div> */}
        </div>
    )
}
export default Card;