import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./Reducers/expense-reducer";
import authReducer from "./Reducers/auth-reducer";
const store = configureStore({
    reducer:{auth: authReducer , expense: expenseReducer}
})

export default store ;