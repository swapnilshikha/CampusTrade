import axios from 'axios';
import { useRef, useState } from 'react'
import ListCard from '../components/ListCard';
import { API } from '../utils/constants';

const Search = () => {
    const searchRef = useRef()
    const [items, setItems ] = useState([])
    const [error, setError ] = useState("")

    const handleSubmit = async(e) => {
        setError("")
        e.preventDefault();
        let key = searchRef.current.value
        console.log(key)
        try{
            console.log("API:", API);
            let data = await axios.get(`${API}/listings/search?title=${key}`)
            console.log("Searching for: ", data)
            setItems(data.data)
        }catch(error){
            console.log(error)
            setError("No Items Found")
        }
    }
  return (
    <>
        <div className='row'>
            <div className="col-md-6 mx-auto">
                <form method="post" onSubmit={handleSubmit}>
                    <div className="row g-1">
                        <div className="col-10 ">
                            <input ref={searchRef} className='form-control fs-4 ' type="text" placeholder='Search Item' required />
                        </div>
                        <div className="col-2">
                            <input className='btn btn-primary fs-4' type='submit' value="Search" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div className='row g-2 mt-4'>
        {
            error.length > 0? (
                <p className='text-danger fs-4'>No Items Found</p>
            ) : (
                items.map(item => (
                    <div className="col-md-4" key={item._id}>
                        <ListCard item={item} />
                    </div>
                ))
            )
        }
        </div>
    </>
  )
}

export default Search