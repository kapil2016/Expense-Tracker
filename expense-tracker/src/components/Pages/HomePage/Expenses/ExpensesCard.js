import React, { useRef, useState } from 'react';
import { FaPencilAlt, FaTrashAlt ,FaSave } from 'react-icons/fa';
import styles from './ExpenseCard.module.css';
import { AppContext } from '../../../Contexts/AppContext';
import { useContext } from 'react';


const deleteExpense = async (idToken, userID, id) => {
  try {
    const response = await fetch(
      `https://user-login-signup-330a7-default-rtdb.firebaseio.com/users/${userID}/expenses/${id}.json?auth=${idToken}`,
      {
        method: "DELETE",
        headers: {},
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }else{
      return true ;
    }
  } catch (error) {
    console.log(error);
  }
};

const editExpense = async (idToken, userID, id ,editedData) => {
  try {
    const response = await fetch(
      `https://user-login-signup-330a7-default-rtdb.firebaseio.com/users/${userID}/expenses/${id}.json?auth=${idToken}`,
      {
        method: 'PATCH',
        headers: {
      'Content-Type': 'application/json'
       },
        body: JSON.stringify(editedData)
      }
    );
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error(data.error);
    }else{
      return data ;
    }
  } catch (error) {
    console.log(error);
  }
};

function ExpenseCard({ day, month, year, description, amount, id}) {
  const ctx = useContext(AppContext);
  const[editCard ,setEditCard] = useState(false);
  const editDate = useRef();
  const editDescription = useRef();
  const editAmount = useRef();


  const editExpenseHandler =()=>{
    const editedData = {amount:editAmount.current , description : editDescription.current , date:editDate.current}
     if(editCard){
      editExpense(ctx.idToken, ctx.userID , id , editedData).then(res=>{
        if(res){
          ctx.expenseList[id] = res ;
          ctx.setExpenseList(pre=>{
           return {...pre}
          })
          setEditCard(false);
         }
      })
     }else{
      setEditCard(true);
     }
     
  }
  const deleteExpenseHandler =()=>{
     deleteExpense(ctx.idToken , ctx.userID , id).then((res)=>{
      if(res){
       delete ctx.expenseList[id];
       ctx.setExpenseList(pre=>{
        return {...pre}
       })
      }
     })
  }
  return (
    <div className={styles.card}>
      <div className={styles.date}>
        {!editCard?
       <><div className={styles.day}>{day}</div>
        <div className={styles.month}>{month}</div>
        <div className={styles.year}>{year}</div></>:
        <input type='date' onChange={(e)=>{editDate.current = e.target.value}}/>
        }
      </div>
      <div className={styles.description}>
        {!editCard ?
        <>{description}</> :<input type='text'value={editDescription.current} placeholder='Add Description' onChange={(e)=>{editDescription.current = e.target.value}}/>
        }
        
        </div>
      <div className={styles.amount}>
        {!editCard?
       <> ${amount}</> :
        <input type='number'value={editAmount.current} placeholder='Add Amount'onChange={(e)=>{editAmount.current = e.target.value}}/>
        }
        
        </div>
      <div className={styles.buttons}>
        <button className={styles.editButton} onClick={editExpenseHandler}>
          {!editCard?<> {<FaPencilAlt />} Edit </>:<> {<FaSave />} Save </>}
         
        </button>
        <button className={styles.deleteButton} onClick={deleteExpenseHandler}>
         {`delete  `} <FaTrashAlt />
        </button>
      </div>
    </div>
  );
}

export default ExpenseCard;
