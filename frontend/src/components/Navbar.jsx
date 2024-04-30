import React from "react";
import { Link , useNavigate} from "react-router-dom";


const Navbar = ({authState, onLogout }) => {
  const navigate = useNavigate(); // Get navigate function

  // Function to handle logout
  const handleLogout = () => {
    onLogout(); // Call onLogout function
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <h3 className="navbar-brand" href="#">
          MERN
        </h3>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/create" className="nav-link" aria-current="page">
                Create Post
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/read" className="nav-link active" aria-current="page">
                All Post
              </Link>
            </li>
            {/* Conditional rendering of Logout link */}
            {authState.isLoggedIn && (
              <li className="nav-item">
                <button className="btn nav-link" onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;