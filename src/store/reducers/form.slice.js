import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  emailError: false,
  name: "",
  nameError: false,
  phone: "",
  phoneError: false,
  description: "",
  descriptionError: false,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(state.email)
        ? (state.emailError = false)
        : (state.emailError = true);
    },
    setName: (state, action) => {
      state.name = action.payload;
      /^[a-zA-Zа-яА-Я]+$/iu.test(state.name)
        ? (state.nameError = false)
        : (state.nameError = true);
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
      /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(state.phone)
        ? (state.phoneError = false)
        : (state.phoneError = true);
    },
    setDescription: (state, action) => {
      state.description = action.payload;
      state.description.trim() !== "" && state.description.length > 15
        ? (state.descriptionError = false)
        : (state.descriptionError = true);
    },
    deleteState: () => initialState,
  },
});

export const { setEmail, setName, setPhone, setDescription, deleteState } =
  formSlice.actions;

export default formSlice.reducer;
