import axios from "axios";

const EmpData_std = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get(`/employee/${id}`);
            setData(response.data);
            setLoading(false);
        } catch (e) {
            setError(e);
        }
        };
        fetchData();
    }, []);
    
    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error</div>
            ) : (
                <div>
                    {data.map((item) => (
                        <div key={item.id}>
                            <div>{item.name}</div>

                            <div>{item.email}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default EmpData_std;