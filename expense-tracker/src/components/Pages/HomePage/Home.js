import './Home.css'
import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppContext } from '../../Contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import ExpenseForm from './ExpenseForm/ExpenseForm';
import ExpenseList from './Expenses/ExpensesList';

const Home = ()=>{
    const ctx = useContext(AppContext);
    const [expenseList , setExpenseList] = useState([])
    const params = useParams();
    const navTo = useNavigate()
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
        setExpenseList((prevList)=>[obj,...prevList]);
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