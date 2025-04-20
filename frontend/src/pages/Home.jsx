import { useState, useEffect } from 'react'
import axios from 'axios'
import ListCard from '../components/ListCard'
import { API } from '../utils/constants'

const Home = () => {
    const [ lists, setLists ] = useState([])
    const getLists = async() => {
        try {
            let data = await axios.get(`${API}/listings`)
            // console.log(data.data);
            setLists(data.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getLists()
    }, [])
    console.log(lists)
  return (
    <div className='row g-2'>
        {
            lists.length > 0 ? (
                lists.map(item => (
                    <div className="col-md-4" key={item._id}>
                        <ListCard item={item} />
                    </div>
                ))
            ) : (
                <p>No Product Available</p>
            )
        }
    </div>
  )
}

export default Home