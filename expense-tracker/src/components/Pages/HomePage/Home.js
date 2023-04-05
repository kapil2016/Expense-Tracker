import './Home.css'
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../Contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const Home = ()=>{
    const ctx = useContext(AppContext)
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
   
    return (
        <div>
            <div className="welcome">
              <p>Welcome To Expense Tracker !!! </p>
              <button className='button-logout' onClick={logoutHandler} >Logout</button>
              <button className='login-card' onClick={()=>navTo(`/profile/${ctx.idToken}`)}>  Your Profile Is Incomplete ! Complete Now </button>
            </div>
            
        </div>
    )
}
export default Home ;