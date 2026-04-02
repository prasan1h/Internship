import React, { useEffect, useState } from "react";

const AddStudents = ({fetchData}) => {
  let [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const url = "http://localhost:8080/save";

  function submitData() {
    console.log("func called");
    // e.preventDefault();

    let payload = {
      name: name,
      age: age,
    };

    try {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) {
            console.log("not OK, try again");
            alert("not OK, try again");
            return;
          }
          res.json();
          setName("");
          setAge("");
          fetchData();
        //   window.location.reload();
        })
        .then((data) => {
          console.log("response :", data);
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>
        <input
          type="text"
          name="name"
          placeholder="ur name ?"
          className="border-2 border-black"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type="text"
          name="age"
          placeholder="ur age ?"
          className="border-2 border-black"
          onChange={(e) => setAge(e.target.value)}
        />
        {/* <br /> */}
        <button
          onClick={() => {
            submitData();
            console.log("clicked");
          }}
          className="border-2 border-black"
        >
          submit
        </button>
        <br /> {name} and {age}
      </div>
    </>
  );
};

export default AddStudents;
