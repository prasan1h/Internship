import React from "react";

const DelStudent = ({id,fetchData}) => {
    const url = "http://localhost:8080";
  function handleDelete(id) {
    try {
      fetch(`${url}/del/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) {
            alert("error deleting the student, please try again later");
            return;
          }
          fetchData();
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <button className="bg-red-500" onClick={() => handleDelete(id)}>
        delete
      </button>
    </>
  );
};

export default DelStudent;
