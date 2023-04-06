import React from 'react';
import ExpensesCard from './ExpensesCard';


const ExpenseList = (props) => {
    const expenses =props.data ;


  return (
    <div>
      {expenses.map(expense => {
        // Extract the day, month, and year from the date object
        const date = new Date(expense.date);
        const day = date.getDate()
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();

        // Pass the extracted date properties to the ExpenseCard component
        return (
          <ExpensesCard
            key={expense.id}
            description={expense.description}
            amount={expense.amount}
            day={day}
            month={month}
            year={year}
          />
        );
      })}
    </div>
  );
};

export default ExpenseList;
