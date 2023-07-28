import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, addOrder, updateOrder, deleteOrder } from "./slice";
import Preloader from "../../components/main/Preloader";

function OrdersTable() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.list);
  const status = useSelector(state => state.orders.status)
  console.log(orders)
  const [formData, setFormData] = useState({
    role: { name: "" }, // set a default value for the name field
  });
  const [editing, setEditing] = useState(false);
  const [modal, setModal] = useState(false)
 
console.log(orders)
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => {
      if (name.startsWith("role.")) {
        return {
          ...prevData,
          role: {
            ...prevData.role,
            [name.substring(5)]: value,
          },
          role_id: prevData.role.id
        };
      } else if (name.startsWith("user.")) {
        return {
          ...prevData,
          user: {
            ...prevData.user,
            [name.substring(5)]: value,
          },
          user_id: prevData.user.id
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };
  

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (editing) {
      const data = {
        id: formData.id,
        user_id: formData.user_id,
        role_id: formData.role_id
      };
  
      dispatch(updateOrder(data));
      setEditing(false);
    } else {
      const data = {
        user_id: formData.user_id,
        role_id: formData.role_id
      };
  
     dispatch(addOrder(data));
    }
  
    setFormData({});
    setModal(false);
  };
  
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
  const handleDeleteOrder = (id) => {
    dispatch(deleteOrder(id));
  };

  const handleEditOrder = (id) => {
    const order = orders.find((order) => order.id === id);
    if (order) {
      setFormData({
        id: order.id,
        user: order.user,
        role: {
          ...order.role
        },
      });
      setEditing(true);
      setModal(true);
    }
  };
  
  

  return (
    <div className="admin_table">
      <main className="main">
     
        <section className={modal ? "table-form" : "table_body"}>
        <h1>User Roles Table</h1>
        <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.role.name}</td>
              <td>{order.user.username}</td>
              <td>{order.user.email}
              
              </td>
              <td>
                <button onClick={() => handleDeleteOrder(order.id)} className="fas fa-trash-alt"></button>
                <button onClick={() => handleEditOrder(order.id)} className="fas fa-edit"></button>
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
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="">Enter user id</label>
        <input
  type="text"
  name="user_id"
  value={formData.user_id || ""}
  onChange={handleFormChange}
/>
    <label htmlFor="">Enter role id</label>
<input
  type="text"
  name="role_id"
  value={formData.role_id || ""}
  onChange={handleFormChange}
/>


    
        <button type="submit">{editing ? "Update Order" : "Add Order"}</button>
      </form>
      </div>
      </div>
      </>
      )}
    </div>

  );
}

export default OrdersTable;
