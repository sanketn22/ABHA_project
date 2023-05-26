import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { publicFetch } from "../util/fetch";

const DoctorDashboard = () => {
  const [data, setData] = useState({});


  useEffect(() => {
    async function fetchData() {
        const res = await publicFetch.get('auth/doctor/login')
        setData(res.data);
    }

    fetchData()

}, []);

  return (
    <>
      <div className="row">
        <div className="col-3">
          <nav className="navbar bg-light">
            <ul className="nav navbar-nav ml-3">
              <li className="nav-item">
                <span> Dashboard </span>
              </li>
              <li className="nav-item mb-3">
                <Link className="nav-link" to={`/doctor/view-records`}>
                  View Records
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link className="nav-link" to={`/doctor/add-records`}>
                  Add Medical Records
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="col-9">
          <div className="container">
            <div className="row">
            <table>
                                <thead>
                                    <tr>
                                        <th>Abha ID</th>
                                        <th>Abha Username</th>
                                        <th>Name</th>
                                        <th>Gender</th>
                                         {/* <th>Insurance Policy</th>  */}
                                    </tr>
                                    {
                                        data.map((item) => {
                                            return (
                                                <tr key={item.ids}>
                                                <td>{item.abha_Id}</td>
                                                <td>{item.abha_username}</td>
                                                <td>{item.fName + " " + item.mName + " " + item.lName}</td>
                                                <td>{item.gender}</td>
                                                {/* <td key={index}>{item.insurancePolicyPolicyNo}</td> */}
                                            </tr>
                                            )
                                            
                                        })
                                    }
                                </thead>
                            </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DoctorDashboard;
