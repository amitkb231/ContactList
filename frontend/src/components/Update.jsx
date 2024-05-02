import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);

  const [error, setError] = useState();
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  //receving single user data
  const getSingleData = async () => {
    const response = await fetch(`https://localhost:5000/api/contacts/${id}` ,{
      headers:{Authorization : `Bearer ${localStorage.getItem("token")}`}
    });
    const result = await response.json();

    if (response.ok) {
      setName(result.name);
      setEmail(result.email);
      setPhone(result.phone);
    }
  };

  //passing edited data to backend
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = { name, email, phone };
    console.log(updatedUser);
    const response = await fetch(`https://localhost:5000/api/contacts/edit/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(updatedUser),
    });
    const result = await response.json();
    if (response.ok) {
      console.log("updated result..", result);
      setError("");
      navigate("/read");

      
    }
    if (!response.ok) {
      console.log(response.error);
      setError(response.error);
    }
  };

  useEffect(() => {
    getSingleData();
  }, []);

  return (
    <div class="container my-2">
      <h1 class="h1 text-center">Edit Data</h1>
      {error && <div class="alert alert-danger"> {error} </div>}
      <form className="form" onSubmit={handleUpdate}>
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Email address</label>
          <input
            type="email"
            class="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Phone number</label>
          <input
            type="number"
            class="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button type="submit" class="btn btn-info">
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;