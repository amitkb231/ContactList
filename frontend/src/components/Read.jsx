import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  async function handleDelete(id) {
    const response = await fetch(`http://localhost:5000/api/contacts/${id}`, {
      method: "DELETE",
      headers:{Authorization : `Bearer ${localStorage.getItem("token")}`}
     
    });

    const result1 = await response.json();
    if (!response.ok) {
      setError(result1.error);
    }
    if (response.ok) {
      console.log("deleted", response.ok);
      setError("Deleted Successfully");
      setTimeout(() => {
        setError("");
        getData();
      }, 1000);
    }
  }
  

  async function getData() {
    const response = await fetch("http://localhost:5000/api/contacts", { headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`  // Include token in authorization header
    }});
    
    const result = await response.json();
    console.log("result..", result);
    if (!response.ok) {
      setError(result.error);
    }

    if (response.ok) {
      setData(result);
      setError("");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-2">
      {error && <div class="alert alert-danger"> {error} </div>}
      <div className="row">
        {data?.map((ele) => (
          <div key={ele._id} className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{ele.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                <p className="text-mute">{ele.phone}</p>
                <Link to={`/${ele._id}`} class="card-link">Edit</Link>

                <a href="#" class="card-link" onClick={() => handleDelete(ele._id)}>Delete</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;