import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { token, name, logout } = useAuth()
  const handleLogout = () => {
    logout()
  }
  return (
    <nav className="navbar navbar-expand-lg bg-dark text-light" data-bs-theme="dark">
    <div className="container-fluid">
    <a className="navbar-brand fs-2" href="#">CampusTrade</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link fs-4 mx-5" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link fs-4 mx-2" to="/search">Search</Link>
        </li>
        {
          token ? (
            <>
            <li className="nav-item">
              <Link className="nav-link" to="/additem">Add List</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/myitems">My Events</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleLogout}>Logout</Link>
            </li>
            <li className="nav-item">
              <span className="nav-link">Welcome, {name}</span>
            </li>
            </>
          ) : (
            <>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">Sign Up</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signin">Sign In</Link>
            </li>
            </>
          )
        }
      </ul>
    </div>
    </div>
    </nav>
  )
}

export default Navbar
