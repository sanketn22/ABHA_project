import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { publicFetch } from '../util/fetch'
import { Navigate } from 'react-router-dom'

const Doctor = () => {
    const authContext = useContext(AuthContext)
    const [data, setData] = useState({});
    const [redirectOnLogin, setNavigateOnLogin] = useState({
        auth: false,
        path: null
    }
    );

    useEffect(() => {
        async function fetchData() {
            const res = await publicFetch.post('auth/doctor/login', data)
            if (res.status === 200) {
                authContext.setAuthState(res.data);
                setNavigateOnLogin({
                    auth: true,
                    path: 'doctor'
                });
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

    return (
        <>
            {redirectOnLogin.auth && redirectOnLogin.path === "doc" && <Navigate to="/doctor/dashboard" />}
                    <div>
                        <form id="doc" method='post' onSubmit={handleSubmit}>

                            <div className="m-3">
                                <label className="form-label">Id</label>
                                <input type="text" name="doctor_id" />
                            </div>
                            <div className="m-3">
                                <label className="form-label">Cntact No</label>
                                <input type="text" name="contact_no" />
                            </div>
                            <div className="m-3">
                                <input className="btn btn-primary" type="submit" value="Submit" />
                            </div>
                        </form>
                    </div>
        </>
    );
}

export default Doctor