import { createSlice } from "@reduxjs/toolkit";


export const sightSlice = createSlice({
	name: "sights",
	initialState: [],
	reducers: {
		getSights: (state, action) => {
			return [...action.payload]
		},
	},
});

export const { getSights } = sightSlice.actions;

export default sightSlice.reducer;
