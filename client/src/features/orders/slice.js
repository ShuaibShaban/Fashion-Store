import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchOrders = createAsyncThunk(
//   "orders/fetchOrder",
//   async () => {
//     const response = await fetch("https://fashion-store-deployed.onrender.com/orders");
//     if (!response.ok) {
//       throw new Error("Failed to fetch orders");
//     }
//     return response.json();
//   }
// );
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrder",
  () => {
    const token = localStorage.getItem("token");
    return fetch("https://fashion-store-deployed.onrender.com/user_roles", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch Orders");
      }
      console.log(res.json)
      return res.json();
    });
  }
);

export const addOrder = createAsyncThunk(
  "orders/addOrder",
  (order) => {
    return fetch("https://fashion-store-deployed.onrender.com/user_roles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to add order");
      }
      return res.json();
    });
  }
);

export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  (order) => {
    return fetch(`https://fashion-store-deployed.onrender.com/user_roles/${order.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update order");
      }
      return res.json();
    });
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  (id) => {
    return fetch(`https://fashion-store-deployed.onrender.com/user_roles/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete order");
      }
      return id;
    });
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "success";
        state.list = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.list.findIndex((order) => order.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        const index = state.list.findIndex((order) => order.id === action.payload);
        if (index !== -1) {
          state.list.splice(index, 1);
        }
      });
  },
});

export default ordersSlice.reducer;