import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser, updateUser, deleteUser } from "./slice";
import './userTable.css'
function UserTable() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const status = useSelector(state => state.users.status)

 
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [modal, setModal] = useState(false)
  console.log(users)

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  
  if (status === 'loading') {
    return (
  <>
  <div
  className="Loader_gigy"
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }}
>
  <img
    src="https://media2.giphy.com/media/jAYUbVXgESSti/200w.webp?cid=ecf05e47e77f8k4szj7dhh7j2prpzucfr61eohkhiffsccd1&ep=v1_gifs_search&rid=200w.webp&ct=g"
    alt="Image"
  />
</div>

  </>
    );
  }

      // Set background color when component mounts
     
  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (editing) {
      dispatch(updateUser(formData));
      setEditing(false);
    } else {
      dispatch(addUser(formData));
      
    }
    setFormData({});
    setModal(false);
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEditUser = (id) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      setFormData(user);
      setEditing(true);
      setModal(true)
    }
  };

  return (
    <div className="admin_table">
            <main className="main ">
       
  
        
        <section className={modal ? "table-form" : "table_body"}>
        <h1>Customers Table</h1>
       
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td className="table-action-btn">
                <button onClick={() => handleDeleteUser(user.id)} className="fas fa-trash-alt"></button>
                <button onClick={() => handleEditUser(user.id)} className="fas fa-edit"></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </section>
      </main>
      {modal && (
        <>
        <div className="modal">
      <div className="userForm">
      <h1>Table</h1>
    
      <form onSubmit={handleFormSubmit}>
      <label htmlFor="">Username</label>
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleFormChange}
        />
        <label htmlFor="">Email</label>
        <input
          type="text"
          name="email"
          value={formData.email || ""}
          onChange={handleFormChange}
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password || ""}
          onChange={handleFormChange}
        />
        <button type="submit">{editing ? "Update User" : "Add User"}</button>
      </form>
      </div>
      </div>
      </>
)}

    </div>
  );
}

export default UserTable;