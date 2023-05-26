// import { useEffect, useState, useContext } from 'react';
// import { FetchContext } from '../../context/FetchContext'
// import { AuthContext } from '../../context/AuthContext'

// const Doctor = () => {
//     const auth = useContext(AuthContext);
//     const fetchContext = useContext(FetchContext);
//     const [data, setData] = useState({});

//     useEffect(() => {
//             const fetchData = async () => {
//                 try {
//                     await fetchContext.authAxios.post('dashboard/e/ins-register', data);
//                 } catch (e) {
//                     console.log(e);
//                 }
//             };
//             fetchData();
//     }, []);

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const form = document.getElementById('doc')
//         const formData = new FormData(form);
//         setData(Object.fromEntries(formData));
//     }

//     return 
// }

// export default Doctor