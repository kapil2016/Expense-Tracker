import { createSlice } from "@reduxjs/toolkit";

const initialState = {expenseList :{}}
const expenseSlice = createSlice({
    name:'expense' ,
    initialState ,
    reducers:{
        addNewExpense(state, action){
           state.expenseList[action.payload.key] = action.payload.value ;
        },
        setExpenseList(state , action){
            state.expenseList = action.payload
        },
        deleteExpense(state , action){
            delete state.expenseList[action.payload]
        },

    }
})

const expenseReducer = expenseSlice.reducer ;
export const expenseStates = expenseSlice.actions;
export default expenseReducer ;
