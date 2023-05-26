import { useState } from "react"
import { useEffect, useContext } from 'react';
import { publicFetch } from "../util/fetch";


const AdminDashboard = () => {
const [data, setData] = useState({});


    useEffect(() => {
        async function fetchData() {
            try{
                const res = await publicFetch.post('doctor/add-data', data)
            }
            catch(e){
                console.log(e);
            }
        }

        fetchData()

    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = document.getElementById('doc')
        const formData = new FormData(form);
        setData(Object.fromEntries(formData));
    }


    return (<>
        <div className="row">
            <div className="col-3">
                <nav className="navbar bg-light">
                    <ul className="nav navbar-nav ml-3">
                        <li className="nav-item">
                            <span> Admin Dashboard </span>
                        </li>
                        <li className="nav-item mb-3">
                            <h1>Add Doctors</h1>
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
                <label className="form-label">Doctor ID:</label>
                <input className="form-control" type="text" name="doctor_id" />
            </div>
            <div className="mb-3">
                <label className="form-label">Name:</label>
                <input className="form-control" type="text" name="doctor_name" />
            </div>
            <div className="mb-3">
                <label className="form-label">Contact No:</label>
                <input className="form-control" type="text" name="contact_no" />
            </div>
            <div className="mb-3">
                <label className="form-label">Gender:</label>
                <input className="form-control" type="text" name="gender" />
            </div>
            <div className="mb-3">
                <label className="form-label">Address:</label>
                <input className="form-control" type="text" name="address" />
            </div>
            <div className="mb-3">
                <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
        </form>
    </section>
                    </div>
                </div>
            </div>


        </div>
    </>)

}

export default AdminDashboard