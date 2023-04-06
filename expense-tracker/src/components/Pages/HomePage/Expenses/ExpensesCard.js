import React from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import styles from './ExpenseCard.module.css';

function ExpenseCard({ day, month, year, description, amount }) {

  return (
    <div className={styles.card}>
      <div className={styles.date}>
        <div className={styles.day}>{day}</div>
        <div className={styles.month}>{month}</div>
        <div className={styles.year}>{year}</div>
      </div>
      <div className={styles.description}>{description}</div>
      <div className={styles.amount}>${amount}</div>
      <div className={styles.buttons}>
        <button className={styles.editButton}>
         <FaPencilAlt /> {`  Edit`} 
        </button>
        <button className={styles.deleteButton}>
         {`delete  `} <FaTrashAlt />
        </button>
      </div>
    </div>
  );
}

export default ExpenseCard;
