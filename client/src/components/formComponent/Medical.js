import { useEffect, useState, useContext } from "react";
import { FetchContext } from "../../context/FetchContext";
import { AuthContext } from "../../context/AuthContext";

const Medical = () => {
  const fetchContext = useContext(FetchContext);
  const auth = useContext(AuthContext);
  const [data, setData] = useState({});

  useEffect(() => {
    if (auth.isEmployee()) {
      const fetchData = async () => {
        try {
          await fetchContext.authAxios.post("medical", data);
        } catch (e) {
          console.log(e);
        }
      };
      fetchData();
    }
    
    if (auth.isStudent()) {
      const fetchData = async () => {
        try {
          await fetchContext.authAxios.post("medical", data);
        } catch (e) {
          console.log(e);
        }
      };
      fetchData();
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = document.getElementById("med");
    const formData = new FormData(form);
    setData(Object.fromEntries(formData));
  };

  return (
    <section className="mx-2">
      <form
        id="med"
        className="container border border-2 rounded my-5 mx-auto p-3"
        method="post"
      >
        <div className="mb-3">
          <label className="form-label">Record ID:</label>
          <input className="form-control" type="text" name="reccord_id" />
        </div>
        <div className="mb-3">
          <label className="form-label">Abha ID:</label>
          <input className="form-control" type="text" name="abha_id" />
        </div>
        <div className="mb-3">
          <label className="form-label">Presciption:</label>
          <input className="form-control" type="text" name="prescription" />
        </div>
        <div className="mb-3">
          <label className="form-label">Diagnosis:</label>
          <input className="form-control" type="text" name="diagnosis" />
        </div>
        <div className="mb-3">
          <label className="form-label">Doctor Reports:</label>
          <input className="form-control" type="text" name="d_reports" />
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Visits:</label>
          <input className="form-control" type="text" name="date_of_visits" />
        </div>
        <div className="mb-3">
          <label className="form-label">Lab Reports:</label>
          <input className="form-control" type="text" name="lab_reports" />
        </div>
        <div className="mb-3">
          <input
            className="btn btn-primary"
            type="submit"
            value="Submit"
            onChange={(e) => handleSubmit()}
          />
        </div>
      </form>
    </section>
  );
};

export default Medical;
