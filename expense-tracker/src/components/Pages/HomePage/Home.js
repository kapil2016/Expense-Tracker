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
   
    return (
        <div>
            <div className="welcome">
              Welcome To Expense Tracker !!! 
              <button className='login-card' onClick={()=>navTo(`/profile/${ctx.idToken}`)}>  Your Profile Is Incomplete ! Complete Now </button>
            </div>
            
        </div>
    )
}
export default Home ;