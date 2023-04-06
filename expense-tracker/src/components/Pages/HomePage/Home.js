import './Home.css'
import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppContext } from '../../Contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import ExpenseForm from './ExpenseForm/ExpenseForm';
import ExpenseList from './Expenses/ExpensesList';
import { useEffect } from 'react';

const addNewExpense = async (idToken, userID, newData) => {
    try {
      const response = await fetch(
        `https://user-login-signup-330a7-default-rtdb.firebaseio.com/users/${userID}/expenses.json?auth=${idToken}`,
        {
          method: 'POST',
          body: JSON.stringify(newData),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      const data = await response.json();

      
    //   console.log(newExpense);
  
      if (!response.ok) {
        throw new Error(data.error);
      }
      return data.name;
  
    } catch (error) {
      console.error(error);
    }
  };

  const getUserData = async (idToken , userID) => {
    try {
      const response = await fetch(
        `https://user-login-signup-330a7-default-rtdb.firebaseio.com/users/${userID}/expenses.json?auth=${idToken}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }
      console.log(data)
      return data;
    } catch (error) {
      console.error(error);
    }
  };  
  
const Home = ()=>{
    const ctx = useContext(AppContext);
    const [expenseList , setExpenseList] = useState({})
    const params = useParams();
    const navTo = useNavigate()
  
 getUserData(ctx.idToken,ctx.userID).then((data)=>setExpenseList(data))
   

    if (params.idToken !== ctx.idToken){
        return <p> Page Not Founnd !</p>
    }
    const logoutHandler = ()=>{
        localStorage.setItem('idToken' , '');
        ctx.setIsLoggedIn(false);
        ctx.setidToken(null);
        navTo('/');
    }
    const formSubmitHandler = (obj)=>{
        // setExpenseList((prevList)=>[obj,...prevList]);
        addNewExpense(ctx.idToken,ctx.userID, obj).then(data=>setExpenseList((preData) =>
        
        {    const newexpense = {}
             newexpense[data] = obj;
            // preData[data] = obj 
            return ({...newexpense,...preData})
        }

        ))
    }

   
    return (
        <>
        <div>
            <div className="welcome">
              <p>Welcome To Expense Tracker !!! </p>
              <button className='button-logout' onClick={logoutHandler} >Logout</button>
              <button className='login-card' onClick={()=>navTo(`/profile/${ctx.idToken}`)}>  Your Profile Is Incomplete ! Complete Now </button>
            </div>    
        </div>
        <ExpenseForm onSubmit={formSubmitHandler}></ExpenseForm>
        <ExpenseList data ={expenseList}></ExpenseList>
        </>
    )
}
export default Home ;