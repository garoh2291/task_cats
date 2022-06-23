import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_IMAGES_URL, BACKEND_URL } from "../../const";

export const setCategoriesThunk = createAsyncThunk(
  "categories/setCategoriesThunk",
  function (_, { dispatch, rejectWithValue }) {
    fetch(BACKEND_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error.message);
        }
        dispatch(setCategories(data));
      })
      .catch((err) => {
        rejectWithValue(err);
      });
  }
);

export const addCategoryDetailsThunk = createAsyncThunk(
  "categories/addCategoryDetailsThunk",
  function ({ isCategory, countPage }, { dispatch, rejectWithValue }) {
    fetch(
      `${BACKEND_IMAGES_URL}/search?limit=10&page=${countPage}&category_ids=${isCategory}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error.message);
        }
        dispatch(setCategoryDetails({ data, countPage }));
      })
      .catch((err) => {
        rejectWithValue(err);
      });
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    selectedCategory: null,
    categories: null,
    items: [],
    error: null,
    status: null,
  },
  reducers: {
    setCategories(state, action) {
      const categories = action.payload;
      return {
        ...state,
        categories,
      };
    },
    setCategoryDetails(state, action) {
      const { data, countPage } = action.payload;
      if (countPage === 1) {
        return {
          ...state,
          items: [...data],
        };
      } else {
        const items = [...state.items, ...data];
        const newArray = Array.from(
          new Set(items.map((el) => JSON.stringify(el)))
        ).map((el) => JSON.parse(el));

        return {
          ...state,
          items: newArray,
        };
      }
    },
    setSelectedCategory(state, action) {
      const selectedCategory = action.payload.id;
      return {
        ...state,
        selectedCategory,
      };
    },
  },
  extraReducers: {
    [setCategoriesThunk.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [setCategoriesThunk.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [setCategoriesThunk.fulfilled]: (state, action) => {
      state.status = "completed";
      state.error = null;
    },
    [addCategoryDetailsThunk.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [addCategoryDetailsThunk.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [addCategoryDetailsThunk.fulfilled]: (state, action) => {
      state.status = "completed";
      state.error = null;
    },
  },
});

export const { setCategories, setCategoryDetails, setSelectedCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
