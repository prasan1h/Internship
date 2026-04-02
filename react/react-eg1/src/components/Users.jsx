import React from 'react'

const Users = () => {

    let names = ["akash", "basu", "chandru", "darshan", "eshwar", "ganesh"];


  return (
    <>
        {
            names.map((name,i) => (
                <div key={(i)}>{name}</div>
            ))
        }
    </>
  )
}

export default Users