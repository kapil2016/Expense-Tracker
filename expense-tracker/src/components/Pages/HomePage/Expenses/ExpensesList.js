import React from 'react';
import ExpensesCard from './ExpensesCard';


const ExpenseList = (props) => {
    const expenses =props.data ;
    const ExpensesList =[];
    for(let key in expenses){
        const date = new Date(expenses[key].date);
        const day = date.getDate()
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();
        ExpensesList.push( <ExpensesCard
            key={key}
            description={expenses[key].description}
            amount={expenses[key].amount}
            day={day}
            month={month}
            year={year}
          />)
    }
  return (
    <div>
        {ExpensesList}
    </div>
  );
};

export default ExpenseList;
