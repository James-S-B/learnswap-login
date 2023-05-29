import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import PostDataService from "../services/PostService";

const initialState = [];

export const createPost = createAsyncThunk(
  "posts/create",
  async ({ title, description }) => {
    const res = await PostDataService.create({ title, description });
    return res.data;
  }
);

export const retrievePosts = createAsyncThunk(
  "posts/retrieve",
  async () => {
    const res = await PostDataService.getAll();
    return res.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/update",
  async ({ id, data }) => {
    const res = await PostDataService.update(id, data);
    return res.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async ({ id }) => {
    await PostDataService.remove(id);
    return { id };
  }
);

export const deleteAllPosts = createAsyncThunk(
  "posts/deleteAll",
  async () => {
    const res = await PostDataService.removeAll();
    return res.data;
  }
);

export const findPostsByTitle = createAsyncThunk(
  "posts/findByTitle",
  async ({ title }) => {
    const res = await PostDataService.findByTitle(title);
    return res.data;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: {
    [createPost.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrievePosts.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [updatePost.fulfilled]: (state, action) => {
      const index = state.findIndex(post => post.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deletePost.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllPosts.fulfilled]: (state, action) => {
      return [];
    },
    [findPostsByTitle.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

const { reducer } = postSlice;
export default reducer;