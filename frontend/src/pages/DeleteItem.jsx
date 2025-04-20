import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API } from '../utils/constants'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteItem = () => {

    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    
    const { token } = useAuth()
    const { id } = useParams()
    const navigate = useNavigate()

    const handleDelete = async () => {
        setLoading(true)
        setMessage("")

        try {
            await axios.delete(`${API}/listings/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setMessage("Item deleted successfully")
            // Redirect after a short delay
            setTimeout(() => {
                navigate("/")
            }, 1000)
        } catch (error) {
            console.log(error)
            setMessage("Failed to delete item")
        }

        setLoading(false)
    }

    useEffect(() => {
        handleDelete()
    }, [])

  return (
        <div className="container text-center mt-5">
            {loading ? <p>Deleting item...</p> : <p>{message}</p>}
        </div>
    )
}

export default DeleteItem
