import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async () => {
    const response = await fetch("https://fashion-store-deployed.onrender.com/reviews");
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    console.log(response)
    return response.json();
  }
);

export const addReview = createAsyncThunk(
  "reviews/addReview",
  (review) => {
    return fetch("https://fashion-store-deployed.onrender.com/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to add review");
      }
      return res.json();
    });
  }
);

export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  (review) => {
    return fetch(`https://fashion-store-deployed.onrender.com/reviews/${review.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update review");
      }
      return res.json();
    });
  }
);

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  (id) => {
    return fetch(`https://fashion-store-deployed.onrender.com/reviews/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to delete review");
      }
      return id;
    });
  }
);

export const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = "success";
        state.list = action.payload;
        console.log(state.list)
      })
  
      .addCase(addReview.fulfilled, (state, action) => {
        state.status = "success";
        state.list.push(action.payload);
      })


      .addCase(updateReview.fulfilled, (state, action) => {
        state.status = "success";
        const index = state.list.findIndex(
          (review) => review.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
    
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.status = "success";
        const index = state.list.findIndex(
          (review) => review.id === action.payload
        );
        if (index !== -1) {
          state.list.splice(index, 1);
        }
      })

  },
});

export default reviewSlice.reducer;