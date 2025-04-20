import React from 'react'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { API } from '../utils/constants'
import { useAuth } from '../context/AuthContext'

const AddItem = () => {
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const { token } = useAuth()

    const itemNameRef = useRef()
    const itemImageRef = useRef()
    const categoryRef = useRef()
    const descriptionRef = useRef()
    const conditionRef = useRef()
    const priceRef = useRef()
    const statusRef = useRef()
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        setMessage("")
        setLoading(true)

        let itemName = itemNameRef.current.value
        let itemImage = itemImageRef.current.files[0]
        let category = categoryRef.current.value
        let description = descriptionRef.current.value
        let condition = conditionRef.current.value
        let price = priceRef.current.value
        let status = statusRef.current.value
        
        const itemData = new FormData()
        itemData.append('itemName', itemName)
        itemData.append('itemImage', itemImage)
        itemData.append('category', category)
        itemData.append('description', description)
        itemData.append('condition', condition)
        itemData.append('price', price)
        itemData.append('status', status)

        console.log(itemData)
        try{
            let data = await axios.post(`${API}/listings`, itemData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(data)
            setMessage("Iteem Added")

            itemName.current.value = ""
            itemImageRef.current.files[0] = "" //error
            categoryRef.current.value = ""
            descriptionRef.current.value = ""
            conditionRef.current.value = ""
            priceRef.current.value = ""
            statusRef.current.value = ""

        } catch(error){
            console.log(error)
            setMessage("Item not added")
        }
        setLoading(false)
    }

  return (
    <>
      <div className='row'>
        <div className="col-md-6 mx-auto">
            <div className="card">
                <div className="card-header">
                    <h3>Add Item</h3>
                    <p>{message}</p>
                </div>
                <div className="card-body">
                    <form method="post"  onSubmit={handleSubmit}>
                        Item Name
                        <input ref={itemImageRef} type='text' className='form-control mb-2' required />
                        Item Image
                        <input ref={itemNameRef} type='file' className='form-control mb-2' required />
                        Category
                        <select ref={categoryRef} className='form-select mb-2' required>
                            <option value="">Select Category</option>
                            <option value="Books">Books</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Engineering Equipments">Engineering Equipments</option>
                            <option value="Stationary">Stationary</option>
                            <option value="Sports Equipments">Sports Equipments</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Others">Others</option>
                        </select>
                        Description
                        <textarea ref={descriptionRef} rows={5} className='form-control mb-2' required></textarea>
                        Condition
                        <select ref={conditionRef} className='form-select mb-2' required>   
                            <option value="">Select Condition</option>
                            <option value="New">New</option>   
                            <option value="Good">Good</option>
                            <option value="Poor">Poor</option>
                        </select>
                        Price
                        <input ref={priceRef} type='number' className='form-control mb-2' required />
                        Status
                        <select ref={statusRef} className='form-select mb-2' required>   
                            <option value="">Select Status</option>
                            <option value="Available">Available</option>   
                            <option value="Sold">Sold</option>
                        </select>
                    
                        <br />
                        {
                            !loading  && <input type='submit' value="Add Item" className='btn btn-primary' />
                        }
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default AddItem
