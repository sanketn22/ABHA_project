import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { publicFetch } from '../util/fetch'
import { Navigate } from 'react-router-dom'
import axios from 'axios'

const Admin = () => {
    const authContext = useContext(AuthContext)
    const [data, setData] = useState({});
    const [redirectOnLogin, setNavigateOnLogin] = useState({
        auth: false,
        path: null
    }
    );

    useEffect(() => {
        async function fetchData() {
            const res = await publicFetch.post('auth/admin', data)
            if (res.status === 200) {
                authContext.setAuthState(res.data);
                setNavigateOnLogin({
                    auth: true,
                    path: 'admin'
                });
            }
        }

        fetchData()

    }, [data]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = document.getElementById('admin')
        const formData = new FormData(form);
        setData(Object.fromEntries(formData));
    }

    return (
        <>
            {redirectOnLogin.auth && redirectOnLogin.path === "admin" && <Navigate to="/admin/add-data" />}
                    <div>
                        <form id="admin" method='post' onSubmit={handleSubmit}>

                            <div className="m-3">
                                <label className="form-label">Email Id</label>
                                <input type="text" name="emailid" />
                            </div>
                            <div className="m-3">
                                <label className="form-label">password</label>
                                <input type="password" name="pass" />
                            </div>
                            <div className="m-3">
                                <input className="btn btn-primary" type="submit" value="Submit" />
                            </div>
                        </form>
                    </div>
        </>
    );
}

export default Admin