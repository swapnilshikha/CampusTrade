import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ListCard from '../components/ListCard'
import { API } from '../util/constants'
import { useAuth } from '../context/AuthContext'

const MyItems = () => {
    const { token } = useAuth()
    const [ lists, setLists ] = useState([])

    const getLists = async() => {
      try {
          let data = await axios.get(`${API}/listings/user`,{
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          })
          console.log(data.data);
          setLists(data.data)
      } catch (error) {
          console.log(error);
      }
  }
  useEffect(()=>{
      getLists()
  }, [])

  return (
    <div className='row g-2'>
        {
            lists.map(list => (
                <div className="col-md-4" key={list._id}>
                    <ListCard item={list} />
                </div>
            ))
        }
    </div>
  )
}

export default MyItems
