import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { API } from '../utils/constants';

const ItemDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [lists, setLists] = useState({});

    const getItemDetails = async () => {
        try {
            const { data } = await axios.get(`${API}/listings/${id}`);
            setLists(data);
        } catch (error) {
            console.error(error);
            if (error.response?.status === 400) {
                alert("Invalid ID");
            }
            navigate("/");
        }
    };

    useEffect(() => {
        getItemDetails();
    }, [id]);

    return (
        <div className='row g-3'>
            <div className="col-md-6">
                <img
                    src={`${API}/uploads/${lists.itemImage}`}
                    alt={lists.itemName}
                    className='img-fluid w-100'
                />
            </div>
            <div className="col-md-6">
                <h4>{lists.itemName}</h4>
                <h5 className='my-0'><span className='fw-semibold'>Price: </span> ₹{lists.price}</h5><br />
                <p>{lists.category}</p>
                <p>{lists.description}</p>
                <p><strong>Condition:</strong> {lists.condition}</p>
                <p><strong>Status:</strong> {lists.status}</p>
                {lists.user && (
                    <div className="card">
                        <div className="card-body">
                            <p className="lead fw-bold">Coordinator Details</p>
                            <span className='d-block fw-semibold'>{lists.user.name}</span>
                            <span className='d-block'>{lists.user.mobile}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemDetails;
