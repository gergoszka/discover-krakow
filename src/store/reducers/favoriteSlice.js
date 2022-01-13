import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
	name: "favorites",
	initialState: [],
	reducers: {
		addFavorite: (state, action) => {
			state.push(action.payload);
		},
		removeFavorite: (state, action) => {
			return state.filter((landmark) => landmark._id !== action.payload);
		},
	},
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
