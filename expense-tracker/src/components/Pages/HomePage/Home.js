import "./Home.css";
import { useParams } from "react-router-dom";
import { useContext} from "react";
import { AppContext } from "../../Contexts/AppContext";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "./ExpenseForm/ExpenseForm";
import ExpenseList from "./Expenses/ExpensesList";


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


const Home = () => {
  const ctx = useContext(AppContext);
  const params = useParams();
  const navTo = useNavigate();


  if (params.idToken !== ctx.idToken) {
    return <p> Page Not Founnd !</p>;
  }
  const logoutHandler = () => {
    localStorage.setItem("idToken", "");
    ctx.setIsLoggedIn(false);
    ctx.setidToken(null);
    navTo("/");
  };
  const formSubmitHandler = (obj) => {
    // setExpenseList((prevList)=>[obj,...prevList]);
    addNewExpense(ctx.idToken, ctx.userID, obj).then((data) =>
      ctx.setExpenseList((preData) => {
        const newexpense = {};
        newexpense[data] = obj;
        // preData[data] = obj
        return { ...newexpense, ...preData };
      })
    );
  };

  return (
    <>
      <div>
        <div className="welcome">
          <p>Welcome To Expense Tracker !!! </p>
          <button className="button-logout" onClick={logoutHandler}>
            Logout
          </button>
          <button
            className="login-card"
            onClick={() => navTo(`/profile/${ctx.idToken}`)}
          >
            {" "}
            Your Profile Is Incomplete ! Complete Now{" "}
          </button>
        </div>
      </div>
      <ExpenseForm onSubmit={formSubmitHandler}></ExpenseForm>
      <ExpenseList data={ctx.expenseList}></ExpenseList>
    </>
  );
};
export default Home;
