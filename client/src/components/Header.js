import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Component = () => {
  const auth = useContext(AuthContext);

  return (
    <>
      <li className="nav-item">
        {auth.isEmployee() && (
          <Link className="nav-link" to="/dashboard/e">
            Dashboard
          </Link>
        )}
        {auth.isStudent() && (
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        )}
      </li>
      {/* {auth.isAuthenicated() && (
            <li className="nav-item">
                <Link className="nav-link" to="">Logout</Link>
            </li>
        )} */}
    </>
  );
};

const Header = () => {
  const auth = useContext(AuthContext);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid ">
          <span className="navbar-brand p-3 font-weight-bold">ABHA</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse p-3" id="navbarScroll">
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/student">
                  Student
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/employee">
                  Employee
                </Link>
              </li>
              {auth.isAuthenticated() ? <Component /> : <></>}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
