import React, { useState } from 'react';
import styles from './ExpenseForm.module.css';
import { FaAngleDown,FaAngleRight} from 'react-icons/fa';

const categories = ['patrol', 'food', 'bills payments', 'other expense'];

const ExpenseForm = (props) => {
  const [money, setMoney] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send data to server or store locally
    const obj = {amount:money,description:description, category:category,date:date }
    props.onSubmit(obj)
    // console.log({ money, description, category, date });
    // Clear form inputs
    setMoney('');
    setDescription('');
    setCategory(categories[0]);
    setDate('');
  };

  return (
    <div className={styles.card}>
        <div onClick={() => setExpanded(!expanded)} style={{display:'flex' , justifyContent:'space-around',width:'100%' ,margin:'10px' ,justifyItems:'center' ,fontSize:'60px' ,color:'green'}}>
        <h2>Add Expense</h2>
        {expanded ? (
          <FaAngleDown />
        ) : (
          <FaAngleRight />
        )}
        </div>
        
     {expanded && <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="money">Money spent:</label>
          <input
            type="number"
            id="money"
            value={money}
            onChange={(event) => setMoney(event.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="date">Date of expense:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>

        <button type="submit">Add expense</button>
      </form>}
    </div>
  );
};

export default ExpenseForm;
