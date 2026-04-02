import React, { useEffect, useState } from "react";

const EditStudentComp = ({id,name,age,setName,setAge,setId,setEdit,fetchData,url}) => {
//   let [id, setId] = useState();
//   let [id, setId] = useState();
//   let [name, setName] = useState("");
//   let [age, setAge] = useState();

  function showEdit(data) {
    setEdit(true);
    setId(data.id);
    setName(data.name);
    setAge(data.age);
  }

  function handleEdit(id) {
    let payload = {
      name: name,
      age: age,
    };

    try {
      fetch(`${url}/put/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) {
            alert("failed to update");
            return;
          }
          res.json();
          setName("");
          setAge("");
          setEdit(false);
          fetchData();
        })
        .catch((e) => console.log("error: ", e));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex flex-col max-w-xl p-6">
        <h1>update form</h1>
        <label htmlFor="name"> name</label>
        <input
          type="text"
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-black"
        />
        <label htmlFor="age"> age</label>
        <input
          type="text"
          value={age}
          name="age"
          onChange={(e) => setAge(e.target.value)}
          className="border-2 border-black"
        />

        <button
          type="submit"
          onClick={() => {
            handleEdit(id);
          }}
          className="bg-amber-600 py-2 px-4 cursor-pointer text-white mt-4"
        >
          save
        </button>
      </div>
    </>
  );
};

export default EditStudentComp;
