import React from 'react'
import { Link } from 'react-router-dom'

const ListCard = ({ item }) => {

    if (!item) return null;
    let { _id, itemName, price , itemImage, status } = item
    // console.log(item);
  return (
    <>
    <div className="card" >
      <img src={`${itemImage}`} className="card-img-top" alt="..." style={{height: '95%', width: '80%'}} />
        <div className="card-body">
            <h5 className="card-title">{itemName}</h5>
            <h4 className="card-title">Rs. {price}</h4>
            <h6 className="card-title">{status}</h6>
            <Link to={`/${_id}`} className="btn btn-primary">Read More</Link>
        </div>
    </div>
    </>
  )
}

export default ListCard
