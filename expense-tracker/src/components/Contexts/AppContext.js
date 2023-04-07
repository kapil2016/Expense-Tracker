import React from "react";
import { useState ,useEffect } from "react";
const getUserData = async (idToken, userID) => {
  try {
    const response = await fetch(
      `https://user-login-signup-330a7-default-rtdb.firebaseio.com/users/${userID}/expenses.json?auth=${idToken}`
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const AppContext = React.createContext({
  idToken: "",
  isLoggedIn: false,
  email: "",
  displayName: "",
  displayImage: "",
  isEmailVerified: false,
  userID: "",
  expenseList: [],
  setExpenseList: () => {},
  setUserID: () => {},
  setIsEmailVerified: () => {},
  setEmail: () => {},
  setDisplayName: () => {},
  setDisplayImage: () => {},
  setidToken: () => {},
  setIsLoggedIn: () => {},
});

const ContextProvider = (props) => {
  const useridToken = localStorage.getItem("idToken")
    ? localStorage.getItem("idToken")
    : "";
  const userLocalID = localStorage.getItem("userID")
    ? localStorage.getItem("userID")
    : "";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [idToken, setidToken] = useState(useridToken);
  const [email, setEmail] = useState("youremail@email.com");
  const [displayName, setDisplayName] = useState("Display Name");
  const [displayImage, setDisplayImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKo76YVrnnPieB27rFfO4k43aaWCgI0o4Dr3WC8TNVvU4wDS-s7c1vcXk6CpO5S9zOtuA&usqp=CAU"
  );
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [userID, setUserID] = useState(userLocalID);
  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    getUserData(idToken, userID).then((data) => setExpenseList(data));
  }, [idToken, userID]);

  const ctxObj = {
    idToken: idToken,
    isLoggedIn: isLoggedIn,
    setidToken: setidToken,
    setIsLoggedIn: setIsLoggedIn,
    userID: userID,
    setUserID: setUserID,
    expenseList: expenseList,
    setExpenseList: setExpenseList,
    email: email,
    displayName: displayName,
    displayImage: displayImage,
    isEmailVerified: isEmailVerified,
    setIsEmailVerified: setIsEmailVerified,
    setEmail: setEmail,
    setDisplayName: setDisplayName,
    setDisplayImage: setDisplayImage,
  };

  return (
    <AppContext.Provider value={ctxObj}>{props.children}</AppContext.Provider>
  );
};

export default ContextProvider;
