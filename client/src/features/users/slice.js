import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  () => {
    const token = localStorage.getItem("token");
    return fetch("https://fashion-store-deployed.onrender.com/users", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch Users");
      }
      console.log(res.json)
      return res.json();
    });
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  (user) => {
  //  const token = localStorage.getItem("token");
    return fetch("https://fashion-store-deployed.onrender.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(user),
    }).then((res) => {
      if (!res.ok) {
        console.log(res)
        throw new Error("Failed to add User");
      }
      return res.json();
    });
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  (user) => {
    const token = localStorage.getItem("token");
    return fetch(`https://fashion-store-deployed.onrender.com/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(user),
    }).then((res) => {
      if (!res.ok) {
        console.log(res)
        throw new Error("Failed to update User");
      }
      return res.json();
    });
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`https://fashion-store-deployed.onrender.com/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      console.log(response)
      throw new Error("Failed to delete User");
    }
    
    // Update state with the deleted user id
    return userId;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users.push(action.payload);

      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
         const deletedUserId = action.payload;
        // Filter out the deleted user from the users array
        state.users = state.users.filter(user => user.id !== deletedUserId);
      });
  },
});


export default usersSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchUsers = createAsyncThunk(
//   "users/fetchUsers",
//   async () => {
//     const response = await fetch("https://fashion-store-deployed.onrender.com/users");
//     if (!response.ok) {
//       throw new Error("Failed to fetch users");
//     }
//     return response.json();
//   }
// );

// export const addUser = createAsyncThunk(
//   "users/addUser",
//   (user) => {
//     return fetch("https://fashion-store-deployed.onrender.com/users", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(user),
//     }).then((res) => {
//       if (!res.ok) {
//         throw new Error("Failed to add User");
//       }
//       return res.json();
//     });
//   }
// );

// export const updateUser = createAsyncThunk(
//   "users/updateUser",
//   (user) => {
//     return fetch(`https://fashion-store-deployed.onrender.com/users/${user.id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(user),
//     }).then((res) => {
//       if (!res.ok) {
//         throw new Error("Failed to update User");
//       }
//       return res.json();
//     });
//   }
// );

// export const deleteUser = createAsyncThunk(
//   "users/deleteUser",
//   (id) => {
//     return fetch(`https://fashion-store-deployed.onrender.com/users/${id}`, {
//       method: "DELETE",
//     }).then((res) => {
//       if (!res.ok) {
//         throw new Error("Failed to delete User");
//       }
//       return id;
//     });
//   }
// );

// const userSlice = createSlice({
//   name: "users",
//   initialState: {
//     users: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUsers.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchUsers.fulfilled, (state, action) => {
//         state.status = "success";
//         state.users = action.payload;
//       })
//       .addCase(fetchUsers.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       })
//       .addCase(addUser.fulfilled, (state, action) => {
//         state.users.push(action.payload);
//       })
//       .addCase(updateUser.fulfilled, (state, action) => {
//         const index = state.users.findIndex((user) => user.id === action.payload.id);
//         if (index !== -1) {
//           state.users[index] = action.payload;
//         }
//       })
//       .addCase(deleteUser.fulfilled, (state, action) => {
//         const index = state.users.findIndex((user) => user.id === action.payload);
//         if (index !== -1) {
//           state.users.splice(index, 1);
//         }
//       });
//   },
// });

// export default userSlice.reducer;