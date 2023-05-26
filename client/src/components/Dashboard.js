import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { FetchContext } from "../context/FetchContext"
import { AuthContext } from "../context/AuthContext"

const Dashboard = () => {
    const [data, setData] = useState({})
    const auth = useContext(AuthContext);
    const fetchContext = useContext(FetchContext);

    const userInfo = localStorage.getItem('userInfo');
    const user = JSON.parse(userInfo);

    useEffect(async () => {
        document.title = "Dashboard"
        if (auth.isEmployee()) {
            const emp = await fetchContext.authAxios.get(`/employee/${user.empNo}`)
            setData(emp.data)
        }
        if (auth.isStudent()) {
            const std = await fetchContext.authAxios.get(`/student/${user.prNo}`)
            setData(std.data)
        }
    }, [])


    if (auth.isAuthenticated() && auth.isStudent()) {
        return (<>
            <div className="row">
                <div className="col-3">
                    <nav className="navbar bg-light">
                        <ul className="nav navbar-nav ml-3">
                            <li className="nav-item">
                                <span> Dashboard </span>
                            </li>
                            <li className="nav-item mb-3">
                                <Link className="nav-link" to={`/dashboard/add-dependent`}>Add family members</Link>
                            </li>
                            <li className="nav-item mb-3">
                                <Link className="nav-link" to={`/dashboard/get-all`}>View family members</Link>
                            </li>
                            {/* <li className="nav-item mb-3">
                                <Link className="nav-link" to={`/dashboard/add-insurance`}>Insurance</Link>
                            </li>
                            <li className="nav-item mb-3">
                                <Link className="nav-link" to={`/dashboard/view-ins`}>View Insurance</Link>
                            </li>
                            <li className="nav-item mb-3">
                                <Link className="nav-link" to={`/dashboard/view-medical`}>View Medical Records</Link>
                            </li> */}
                            <li className="nav-item mb-3 m-3">
                                <Link className="nav-link" to={`/dashboard/insurance`}>Insurance</Link>
                            </li>
                            <li className="nav-item mb-3 m-3">
                                <Link className="nav-link" to={`/dashboard/view-insurance`}>View Insurance</Link>
                            </li>
                            <li className="nav-item mb-3 m-3">
                                <Link className="nav-link" to={`/dashboard/view-medical`}>View Medical Records</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="col-9">
                    <div className="container">
                        <div className="row">
                        <section className="mx-2">
                                <form className="container border border-2 rounded my-5 mx-auto p-3">
                                    <div className="mb-3">
                                        <label className="form-label">First Name:</label>
                                        <input className="form-control" type="text" value={data.fName} name="fname" readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Middle Name:</label>
                                        <input className="form-control" type="text" value={data.mName} name="mname" readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Last Name:</label>
                                        <input className="form-control" type="text" value={data.lName} name="lname" readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Abha ID:</label>
                                        <input className="form-control" type="text" value={data.abha_Id} name="abha_id" readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Abha Usename:</label>
                                        <input className="form-control" type="text" value={data.abha_username} name="abha_user" readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Pr No:</label>
                                        <input className="form-control" type="text" value={data.prNo} name="empno" readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Gender:</label>
                                        <select className="form-select" name="gender" value={data.gender} disabled="true">
                                            <option defaultValue={""}></option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </form>
                            </section>

                        </div>
                    </div>
                </div>


            </div>
        </>)
    } else if (auth.isAuthenticated() && auth.isEmployee()) {
        return (<>
            <div className="row">
                <div className="col-3">
                    <nav className="navbar bg-light">
                        <ul className="nav navbar-nav">
                            <li className="nav-item m-3 mb-3">
                                <span> Dashboard </span>
                            </li>
                            <li className="nav-item mb-3 m-3">
                                <Link className="nav-link" to={`/dashboard/e/add-dependent`}>Add family members</Link>
                            </li>
                            <li className="nav-item mb-3 m-3">
                                <Link className="nav-link" to={`/dashboard/e/get-all`}>View family members</Link>
                            </li>
                            <li className="nav-item mb-3 m-3">
                                <Link className="nav-link" to={`/dashboard/e/insurance`}>Insurance</Link>
                            </li>
                            <li className="nav-item mb-3 m-3">
                                <Link className="nav-link" to={`/dashboard/e/view-insurance`}>View Insurance</Link>
                            </li>
                            <li className="nav-item mb-3 m-3">
                                <Link className="nav-link" to={`/dashboard/e/view-medical`}>View Medical Records</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="col-9">
                    <div className="container">
                        <div className="row">
                            <section className="mx-2">
                                <form className="container border border-2 rounded my-5 mx-auto p-3">
                                    <div className="mb-3">
                                        <label className="form-label">First Name:</label>
                                        <input className="form-control" type="text" value={data.fName} name="fname" readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Middle Name:</label>
                                        <input className="form-control" type="text" value={data.mName} name="mname" readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Last Name:</label>
                                        <input className="form-control" type="text" value={data.lName} name="lname" readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Abha ID:</label>
                                        <input className="form-control" type="text" value={data.abha_Id} name="abha_id" readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Abha Usename:</label>
                                        <input className="form-control" type="text" value={data.abha_username} name="abha_user" readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Emp No:</label>
                                        <input className="form-control" type="text" value={data.empNo} name="empno" readOnly />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Gender:</label>
                                        <select className="form-select" name="gender" value={data.gender} disabled="true">
                                            <option defaultValue={""}></option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>


            </div>

        </>)
    }
}

export default Dashboard