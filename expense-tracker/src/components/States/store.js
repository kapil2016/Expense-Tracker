import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./Reducers/expense-reducer";
import authReducer from "./Reducers/auth-reducer";
import themeReducer from "./Reducers/theme-reducer";
const store = configureStore({
    reducer:{auth: authReducer , expense: expenseReducer ,theme : themeReducer}
})

export default store ;