import React, { useEffect, useState } from "react";
import AddStudents from "../components/AddStudents";
import DelStudent from "../components/DelStudent";
import EditStudents from "../components/EditStudents";
import EditStudentComp from "../components/EditStudentComp";

const Students = () => {
  let [data, setData] = useState([]);
  let [deleted, setDeleted] = useState();

  let [edit, setEdit] = useState(null);

  let [id, setId] = useState();
  let [name, setName] = useState("");
  let [age, setAge] = useState();

  const url = "http://localhost:8080";

  function fetchData() {
    fetch(`${url}/all`)
      .then((res) => res.json())
      .then((data) => {
        console.log("data : ", data);
        setData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function showEdit(data) {
    setEdit(true);
    setId(data.id);
    setName(data.name);
    setAge(data.age);
  }

  // function handleEdit(id) {
  //   let payload = {
  //     name: name,
  //     age: age,
  //   };

  //   try {
  //     fetch(`${url}/put/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     })
  //       .then((res) => {
  //         if (!res.ok) {
  //           alert("failed to update");
  //           return;
  //         }
  //         res.json();
  //         setName("");
  //         setAge("");
  //         setEdit(false);
  //         fetchData();
  //       })
  //       .catch((e) => console.log("error: ", e));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    fetchData();
    console.log("data", data);
  }, [deleted]);

  return (
    <>
      <div>
        <table className="border-2 border-black">
          <thead className="border-2 border-black">
            <tr>
              <td className="border-2 border-black">Name</td>
              <td className="border-2 border-black">Age</td>
            </tr>
          </thead>
          <tbody>
            {data.map((std, index) => (
              <tr key={std.id}>
                <td className="border-2 border-black">{std.name}</td>
                <td className="border-2 border-black">{std.age}</td>
                <td className="border-2 border-black">
                  <DelStudent id={std.id} fetchData={fetchData} />
                </td>
                <td className="border-2 border-black">
                  {/* <EditStudents showEdit={showEdit} std={std}/> */}
                  <button
                    className="bg-red-500"
                    onClick={() => {
                      showEdit(std);
                    }}
                  >
                    edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <br />

      {edit && (
        // <div className="flex flex-col max-w-xl p-6">
        //   <h1>update form</h1>
        //   <label htmlFor="name"> name</label>
        //   <input
        //     type="text"
        //     value={name}
        //     name="name"
        //     onChange={(e) => setName(e.target.value)}
        //     className="border-2 border-black"
        //   />
        //   <label htmlFor="age"> age</label>
        //   <input
        //     type="text"
        //     value={age}
        //     name="age"
        //     onChange={(e) => setAge(e.target.value)}
        //     className="border-2 border-black"
        //   />

        //   <button
        //     type="submit"
        //     onClick={() => {
        //       handleEdit(id);
        //     }}
        //     className="bg-amber-600 py-2 px-4 cursor-pointer text-white mt-4"
        //   >
        //     save
        //   </button>
        // </div>

        <EditStudentComp id={id} name={name} age={age} setName={setName} setAge={setAge} setId={setId} setEdit={setEdit} fetchData={fetchData} url={url}/>
      )}
      <br />
      <br />
      <br />
      <hr />
      <br />
      <br />
      <br />
      <AddStudents fetchData={fetchData}/>
    </>
  );
};

export default Students;
