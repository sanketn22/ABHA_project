import { useEffect, useState, useContext } from 'react';
import { FetchContext } from '../../context/FetchContext';
import { AuthContext } from '../../context/AuthContext';

const Dependent = () => {
    const auth = useContext(AuthContext);
    const fetchContext = useContext(FetchContext);
    const [dep, depData] = useState({});

    useEffect(() => {
        if (auth.isEmployee()) {
                try {
                    fetchContext.authAxios.post('/dashboard/e/add-dependent', dep, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                } catch (e) {
                    console.log(e);
                }
        }
        
        if (auth.isStudent()) {
                try {
                    fetchContext.authAxios.post('/dashboard/add-dependent', dep, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
                } catch (e) {
                    console.log(e);
                }
        }
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        const form = document.getElementById('dep')
        const formData = new FormData(form);
        depData(Object.fromEntries(formData));
    }

    return (<section className="mx-2">
        <form id='dep' className="container border border-2 rounded my-5 mx-auto p-3" method="post" encType="multipart/form-data">
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
                <label className="form-label">ID:</label>
                <input className="form-control" type="text" name="id" />
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
                <label className="form-label">Relation:</label>
                <input className="form-control" type="text" name="relation" />
            </div>
            <div className="mb-3">
                <label className="form-label">Image:</label>
                <input className="form-control" type="file" name="image" />
            </div>
            <div className="mb-3">
                <input className="btn btn-primary" type="submit" value="Submit" onChange={e => handleSubmit()} />
            </div>
        </form>
    </section>)
}

export default Dependent