import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { API } from '../utils/constants'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom' 

const UpdateItem = () => {

  const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const { token } = useAuth()
    const navigate = useNavigate()
    const { id } = useParams()
    const [ item, setItem ] = useState({})

    const itemNameRef = useRef()
    const itemImageRef = useRef()
    const categoryRef = useRef()
    const descriptionRef = useRef()
    const conditionRef = useRef()
    const priceRef = useRef()
    const statusRef = useRef()

    const getItemDetails = async() => {
      try {
          let data = await axios.get(`${API}/listings/${id}`)
          setItem(data.data)
          let event = data.data
          itemNameRef.current.value = event.itemName
          itemImageRef.current.files[0] = event.itemImage
          categoryRef.current.value = event.category
          descriptionRef.current.value = event.description
          conditionRef.current.value = event.condition
          priceRef.current.value = event.price
          statusRef.current.value = event.status

      } catch (error) {
          console.log(error);
          if(error.status === 400){
              alert("Invalid Id")
          }
          navigate("/")
      }
  }

  useEffect(()=>{
    getItemDetails()
}, [id])

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
  
      let itemData = {itemName, itemImage, category, description, condition, price, status }  

      console.log(itemData)
      try{
        let data = await axios.put(`${API}/listings/${item._id}`, itemData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        console.log(data)
        setMessage("Item Updated")
        } catch(error){
          console.log(error)
          setMessage("Item not updated")
        }
          setLoading(false)
        }

  return (
    <>
      <div className='row'>
        <div className="col-md-6 mx-auto">
            <div className="card">
                <div className="card-header">
                    <h3>Update Item</h3>
                    <p>{message}</p>
                </div>
                <div className="card-body">
                    <form method="post"  onSubmit={handleSubmit}>
                        Item Name
                        <input ref={itemNameRef} type='text' className='form-control mb-2' required />
                        Item Image  
                        <input ref={itemImageRef} type='file' className='form-control mb-2' required />
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
                            !loading && <input type='submit' value="Update Item" className='btn btn-primary' />
                        }
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default UpdateItem
