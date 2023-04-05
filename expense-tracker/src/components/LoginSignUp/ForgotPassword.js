import { useState } from "react";
import './ForgotPassword.css'

async function sendPasswordResetEmail(email , success) {
    try {
      const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB7GCCKM_2dSth5NlthsSwreUly8H9D_-8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          requestType: 'PASSWORD_RESET',
          email: email
        })
      });
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        success('A password reset link has been sent to your email.Please check spam folder also')
      } else {
        throw new Error('Send password reset email failed');
      }
    } catch (error) {
        success(error)
    }
  }
  


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const handleResetPassword = async (event) => {
    event.preventDefault();
    sendPasswordResetEmail(email,setMessage)
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleResetPassword}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}
export default ForgotPassword;