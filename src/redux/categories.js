import { createSlice } from "@reduxjs/toolkit";
import { getAllCategories } from "../Service/CategoriesService";

const initialState = {
  categories: [],
};
export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    getAllCategories: async (state, action) => {
      try {
        const res = await getAllCategories();
        if (res && res.status === 200 && res.data.success === true) {
          state.categories = res.data.categories;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
});
export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
