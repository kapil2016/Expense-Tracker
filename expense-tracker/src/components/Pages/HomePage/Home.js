import styles from './Home.module.css'
import { useParams ,useNavigate } from "react-router-dom";
import ExpenseForm from "./ExpenseForm/ExpenseForm";
import ExpenseList from "./Expenses/ExpensesList";
import { useSelector, useDispatch } from 'react-redux';
import { authStates } from "../../States/Reducers/auth-reducer";
import { expenseStates } from "../../States/Reducers/expense-reducer";
import { useEffect ,useCallback } from "react";
import PremiumCard from "./Premium/PremiumCard";


const addNewExpense = async (idToken, userID, newData) => {
  try {
    const response = await fetch(
      `https://user-login-signup-330a7-default-rtdb.firebaseio.com/users/${userID}/expenses.json?auth=${idToken}`,
      {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json",
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

const getUserData = async (idToken, userID) => {
  try {
    const response = await fetch(
      `https://user-login-signup-330a7-default-rtdb.firebaseio.com/users/${userID}/expenses.json?auth=${idToken}`
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
  
    return data;
  } catch (error) {
    console.error(error);
  }
};

const totalExpenseAmount = (expenseList)=>{
  let totalAmount = 0 ;
        for(let key in expenseList){
          totalAmount += parseInt(expenseList[key].amount)
        }
        return totalAmount
}


const Home = () => {
  const params = useParams();
  const navTo = useNavigate();
  const idToken = useSelector(state=>state.auth.idToken)
  const userID = useSelector(state=>state.auth.userID)
  const expenseList = useSelector(state => state.expense.expenseList)
  const isDarkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  const fetchUserData = useCallback(async () => {
    const data = await getUserData(idToken, userID);
    dispatch(expenseStates.setExpenseList(data));
  }, [idToken, userID, dispatch]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);


  if (params.idToken !== idToken) {
    return <p> Page Not Founnd !</p>;
  }
  const logoutHandler = () => {
    localStorage.setItem("idToken", "");
    dispatch(authStates.setLogin(false));
    dispatch(authStates.setIdToken(''))
    dispatch(authStates.setUserID(''))
    navTo("/");
  };
  const formSubmitHandler = (obj) => {
    addNewExpense(idToken,userID, obj).then((data) =>{
         dispatch(expenseStates.addNewExpense({key:data , value:obj}))
    }
    )
  };
   const totalAmount = totalExpenseAmount(expenseList);
 
  return (
    <>
    <div className={[styles.card, isDarkMode ? styles.dark : ''].join(' ')} >
        <div className={styles.welcome}>
          <p>Welcome To Expense Tracker !!! </p>
          <button className={styles['button-logout']} onClick={logoutHandler}>
            Logout
          </button>
          <button
            onClick={() => navTo(`/profile/${idToken}`)}
          >
            <div>Your Profile Is Incomplete ! Complete Now</div>
        
          </button>
        </div>
      
     {totalAmount>10000 && <PremiumCard></PremiumCard>}
      <ExpenseForm onSubmit={formSubmitHandler}></ExpenseForm>
      <ExpenseList data={expenseList}></ExpenseList>
      </div>
    </>
  );
};
export default Home;
