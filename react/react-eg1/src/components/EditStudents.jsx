
import React, { useState } from "react";

const EditStudents = ({ showEdit, std, data, setEdit }) => {
  let [id, setId] = useState();
  let [name, setName] = useState("");
  let [age, setAge] = useState();

  function showEdit(data) {
    setEdit(true);
    setId(data.id);
    setName(data.name);
    setAge(data.age);
  }

//   function handleEdit(id) {
//     let payload = {
//       name: name,
//       age: age,
//     };

//     try {
//       fetch(`${url}/put/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       })
//         .then((res) => {
//           if (!res.ok) {
//             alert("failed to update");
//             return;
//           }
//           res.json();
//           setName("");
//           setAge("");
//           setEdit(false);
//           fetchData();
//         })
//         .catch((e) => console.log("error: ", e));
//     } catch (error) {
//       console.log(error);
//     }
//   }

  return (
    <>
      <button
        className="bg-red-500"
        onClick={() => {
          showEdit(std);
        }}
      >
        edit
      </button>
    </>
  );
};

export default EditStudents;
