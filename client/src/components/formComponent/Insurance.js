import { useEffect, useState, useContext } from 'react';
import { FetchContext } from '../../context/FetchContext'
import { AuthContext } from '../../context/AuthContext'
import { publicFetch } from '../../util/fetch';

const Insurance = () => {
    const auth = useContext(AuthContext);
    const fetchContext = useContext(FetchContext);
    const [data, setData] = useState({});

    useEffect(() => {
        if (auth.isEmployee()) {
            const fetchData = async () => {
                try {
                    await publicFetch.post('/insurance/dashboard/e/add-insurance', data);
                } catch (e) {
                    console.log(e);
                }
            };
            fetchData();
        }
        
        if (auth.isStudent()) {
            const fetchData = async () => {
                try {
                    await publicFetch.post('/insurance/dashboard/add-insurance', data);
                } catch (e) {
                    console.log(e);
                }
            };
            fetchData();
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = document.getElementById('ins')
        const formData = new FormData(form);
        setData(Object.fromEntries(formData));
    }

    return <section className="mx-2">
        <form id="ins" className="container border border-2 rounded my-5 mx-auto p-3" method="post">
            <div className="mb-3">
                <label className="form-label">Policy No:</label>
                <input className="form-control" type="text" name="policy_no" />
            </div>
            <div className="mb-3">
                <label className="form-label">Insurance Type:</label>
                <input className="form-control" type="text" name="ins_type" />
            </div>
            <div className="mb-3">
                <label className="form-label">Insurance Provider:</label>
                <input className="form-control" type="text" name="ins_provider" />
            </div>
            <div className="mb-3">
                <label className="form-label">Abha ID:</label>
                <input className="form-control" type="text" name="abha_id" />
            </div>
            <div className="mb-3">
                <label className="form-label">End Date:</label>
                <input className="form-control" type="date" name="end_date" />
            </div>
            <div className="mb-3">
                <label className="form-label">Start Date:</label>
                <input className="form-control" type="date" name="start_date" />
            </div>
            <div className="mb-3">
                <input className="btn btn-primary" type="submit" value="Submit" onChange={e => handleSubmit()} />
            </div>
        </form>
    </section>
}

export default Insurance