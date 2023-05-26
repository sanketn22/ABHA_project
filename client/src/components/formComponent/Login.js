import { useEffect, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { publicFetch } from '../../util/fetch'

const Login = () => {
    const authContext = useContext(AuthContext);
    const [selectedValue, setSelectedValue] = useState(null);
    const [stdData, setStdData] = useState({});
    const [empData, setEmpData] = useState({});
    const [redirectOnLogin, setNavigateOnLogin] = useState({
        auth: false,
        path: null
    }
    );

    useEffect(() => {
        async function fetchData() {
            const res = await publicFetch.post('auth/login', stdData)
            if (res.status === 200) {
                authContext.setAuthState(res.data);
                setNavigateOnLogin({
                    auth: true,
                    path: 'student'
                });
            }

        }

        fetchData()

    }, [stdData]);

    useEffect(() => {
        async function fetchData() {
            const res = await publicFetch.post('auth/login', empData,{
                withCredentials: true
            })
            if (res.status === 200) {
                authContext.setAuthState(res.data);
                setNavigateOnLogin({
                    auth: true,
                    path: 'employee'
                });
            }
        }

        fetchData()

    }, [empData]);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }

    const handleSubmits = (e) => {
        e.preventDefault();
        const form = document.getElementById('std')
        const formData = new FormData(form);
        console.log(Object.fromEntries(formData));
        setStdData(Object.assign({}, Object.fromEntries(formData), { type: 'student' }));
    }

    const handleFormEmp = (e) => {
        e.preventDefault();
        const form = document.getElementById('emp')
        const formData = new FormData(form);
        setEmpData(Object.assign({}, Object.fromEntries(formData), { type: 'employee' }));
    }

    return (
        <>
            {redirectOnLogin.auth && redirectOnLogin.path === "student" && <Navigate to="/dashboard" />}
            {redirectOnLogin.auth && redirectOnLogin.path === "employee" && <Navigate to="/dashboard/e" />}
            <div>
                <div className="mb-3">
                    <label className="form-label test">Type</label>
                    <div className="m-3">
                        <label for="student">
                            <input type="radio" value="stdform" id="student" checked={selectedValue === 'stdform'} onChange={handleChange} />
                            Student
                        </label>
                    </div>
                    <div className="m-3">
                        <label for="employee">
                            <input type="radio" value="empform" id="employee" checked={selectedValue === 'empform'} onChange={handleChange} />
                            Employee
                        </label>
                    </div>
                </div>

                {selectedValue === 'stdform' && (
                    <div>
                        <form id="std" method='post' onSubmit={handleSubmits}>
                            <div className="m-3">
                                <label className="form-label">ABHA ID</label>
                                <input type="text" name="abha_Id" />
                            </div>
                            <div className="m-3">
                                <label className="form-label">Student ID</label>
                                <input type="text" name="p_id" />
                            </div>
                            <div className="m-3">
                                <input className="btn btn-primary" type="submit" value="Submit" />
                            </div>
                        </form>
                    </div>
                )}

                {selectedValue === 'empform' && (
                    <div>
                        <form id="emp" method='post' onSubmit={handleFormEmp}>

                            <div className="m-3">
                                <label className="form-label">ABHA ID</label>
                                <input type="text" name="abha_Id" />
                            </div>
                            <div className="m-3">
                                <label className="form-label">Employee ID</label>
                                <input type="text" name="p_id" />
                            </div>
                            <div className="m-3">
                                <input className="btn btn-primary" type="submit" value="Submit" />
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}

export default Login;