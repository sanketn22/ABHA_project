import { useEffect, useState } from 'react';
import { publicFetch } from '../../util/fetch';

const Student = () => {
    const [std, stdData] = useState({});
    const [message, setMessage] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await publicFetch.post('student/register', std, {
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
    }, [std]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = document.getElementById('std')
        const formData = new FormData(form);
        stdData(Object.fromEntries(formData));
    }

    return (
    <>
    {message.message && <div className="alert alert-success">{message.message}</div>}
    <section className="mx-2">
    <form id="std" className="container border border-2 rounded my-5 mx-auto p-3" method="post" encType="multipart/form-data" onSubmit={e => handleSubmit(e)}>
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
                <label className="form-label">Abha Usename</label>
                <input className="form-control" type="text" name="abha_user" />
            </div>
            <div className="mb-3">
                <label className="form-label">Pr No:</label>
                <input className="form-control" type="text" name="prno" />
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
                <label className="form-label">Year:</label>
                <input className="form-control" type="date" name="year" />
            </div>
            <div className="mb-3">
                <label className="form-label">Program:</label>
                <input className="form-control" type="text" name="program" />
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
    </>)
}

export default Student