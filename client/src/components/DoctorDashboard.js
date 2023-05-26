import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { publicFetch } from "../util/fetch";


const DoctorDashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
        const res = await publicFetch.post('auth/doctor/login')
        setData(res.data);
    }

    fetchData()

}, [data]);

const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById('doc')
    const formData = new FormData(form);
    setData(Object.fromEntries(formData));
}


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
              <section className="mx-2">
                <form id="doc" className="container border border-2 rounded my-5 mx-auto p-3" method="post" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Record Id:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="record_id"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Abha Id:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="abha_id"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Prescription:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="prescription"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Diagnosis:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="diagnosis"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Doctor ID:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="doctor_id"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Lab Reports:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="lab_reports"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Date of Visits:</label>
                    <input
                      className="form-control"
                      type="text"
                      name="date_of_visits"
                    />
                  </div>
                  <div className="mb-3">
                <input className="btn btn-primary" type="submit" value="Submit" onChange={e => handleSubmit()} />
            </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DoctorDashboard;
