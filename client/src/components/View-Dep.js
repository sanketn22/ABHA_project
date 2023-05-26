import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { FetchContext } from "../context/FetchContext"
import { AuthContext } from "../context/AuthContext"
import axios from "axios"
import { publicFetch } from "../util/fetch"

const Table = ({tableData}) => {
    
    return(
        <table>
                                <thead>
                                    <tr>
                                        <th>Abha ID</th>
                                        <th>Abha Username</th>
                                        <th>Name</th>
                                        <th>Gender</th>
                                    </tr>
                                    {
                                        tableData.map((item) => {
                                            return (
                                                <tr key={item.ids}>
                                                <td>{item.abha_Id}</td>
                                                <td>{item.abha_username}</td>
                                                <td>{item.fName + " " + item.mName + " " + item.lName}</td>
                                                <td>{item.gender}</td>
                                        
                                            </tr>
                                            )
                                            
                                        })
                                    }
                                </thead>
                            </table>
    )
}

const View_Dep = () => {
    const [data, setData] = useState([])
    const auth = useContext(AuthContext);

    useEffect(async () => {
        document.title = "Dashboard"
        if (auth.isEmployee()) {
            await publicFetch.get('/dashboard/e/get-all').then((res) => {
                console.log(res.data)
                setData(res.data)
            })
        }
        if (auth.isStudent()) {
            await publicFetch.get('/dashboard/get-all').then((res) => {
                console.log(res.data)
                setData(res.data)
            })
        }
    }, [])


    if (auth.isStudent()) {
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
                                <Link className="nav-link active" to={`/dashboard/view-dep`}>View family members</Link>
                            </li>
                            <li className="nav-item mb-3">
                                <Link className="nav-link" to={`/dashboard/insurance`}>Insurance</Link>
                            </li>
                            <li className="nav-item mb-3">
                                <Link className="nav-link" to={`/dashboard/view-ins`}>View Insurance</Link>
                            </li>
                            <li className="nav-item mb-3">
                                <Link className="nav-link" to={`/dashboard/view-medical`}>View Medical Records</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="col-9">
                    <div className="container">
                        <div className="row">
                            <Table tableData={data} />
                        </div>
                    </div>
                </div>


            </div>
        </>)
    } else if (auth.isEmployee()) {
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
                                <Link className="nav-link active" to={`/dashboard/e/view-dep`}>View family members</Link>
                            </li>
                            <li className="nav-item mb-3 m-3">
                                <Link className="nav-link" to={`/dashboard/e/insurance`}>Insurance</Link>
                            </li>
                            <li className="nav-item mb-3 m-3">
                                <Link className="nav-link" to={`/dashboard/e/view-ins`}>View Insurance</Link>
                            </li>
                            <li className="nav-item mb-3 m-3">
                                <Link className="nav-link" to={`/dashboard/e/medical`}>View Medical Records</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="col-9">
                    <div className="container">
                        <div className="row">
                        <Table tableData={data} />
                        </div>
                    </div>
                </div>


            </div>

        </>)
    }
}

export default View_Dep