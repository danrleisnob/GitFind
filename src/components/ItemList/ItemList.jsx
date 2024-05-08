/* eslint-disable react/prop-types */
import './ItemList.css';

export default function ItemList({title, description}){
    
    return(
        <div className='item-list'>
            <h1>{title}</h1>
            <p>{description}</p>
            <hr />
        </div>
    )
}