import { useEffect, useState, useContext } from 'react';
import { FetchContext } from '../../context/FetchContext'
import { publicFetch } from '../../util/fetch';

const Employee = () => {
    const fetchContext = useContext(FetchContext);
    const [message, setMessage] = useState({});
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await publicFetch.post('employee/register', data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                      }
                });
                setMessage(res.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = document.getElementById('emp')
        const formData = new FormData(form);
        setData(Object.fromEntries(formData));
    }

    return <>
    {message.message && <div className="alert alert-success">{message.message}</div>}
    <section className="mx-2">
        
        <form id="emp" className="container border border-2 rounded my-5 mx-auto p-3" method="post" encType="multipart/form-data" onSubmit={e => handleSubmit(e)}>
            <div className="mb-3">
                <label className="form-label">First Name:</label>
                <input className="form-control" type="text" name="fname" />
            </div>
            <div className="mb-3">
                <label className="form-label">Middle Name:</label>
                <input className="form-control" type="text" name="mname" />
            </div>
            <div className="mb-3">
                <label className="form-label">Last Name:</label>
                <input className="form-control" type="text" name="lname" />
            </div>
            <div className="mb-3">
                <label className="form-label">Abha ID:</label>
                <input className="form-control" type="text" name="abha_id" />
            </div>
            <div className="mb-3">
                <label className="form-label">Abha Usename:</label>
                <input className="form-control" type="text" name="abha_user" />
            </div>
            <div className="mb-3">
                <label className="form-label">Emp No:</label>
                <input className="form-control" type="text" name="empno" />
            </div>
            <div className="mb-3">
                <label className="form-label">Gender:</label>
                <select className="form-select" name="gender">
                    <option defaultValue={""}></option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Image:</label>
                <input className="form-control" type="file" name="image" />
            </div>
            <div className="mb-3">
                <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
        </form>
    </section>
    </>
}

export default Employee