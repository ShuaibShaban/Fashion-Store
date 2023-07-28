import { useEffect, useState } from "react";
import '../main/SignUp.css'
import { useDispatch, useSelector } from 'react-redux';
import { loginAccount } from '../../features/users/userLogin';
import { useNavigate } from 'react-router-dom'
import { addNewUser } from "../../features/users/createUserSlice";

const SignUp = () => {
 
  const [username, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signuPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const navigate =   useNavigate()
  const redirect = useNavigate()
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user.user);
  const usersSignup = useSelector((state) => state.userSignup.users);
  const errorLogin = useSelector((state) => state.user.error);
  const errorSignup = useSelector((state) => state.userSignup.error);
  console.log(usersSignup)
  console.log(userLogin)
  console.log(errorSignup)

  useEffect(() => {
    if (userLogin) {
      navigate('/products');
    }
  }, [userLogin, navigate]);

  useEffect(() => {
    if (usersSignup) {
      redirect('/products')
    }
  }, [usersSignup, navigate]);


  const handleSignInSubmit = (event) => {
    event.preventDefault();
    dispatch(loginAccount({ email: signInEmail, password: signInPassword }));
 
  };

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    dispatch(addNewUser({ username: username, email: signupEmail, password: signuPassword }));
  };
  return (
    <div className="signup">
      <div className="login">
      <h1>Don't have an account?</h1>
      <h2>Sign up with your email and password</h2>
      <div >
        <form onSubmit={handleSignUpSubmit}>
          <div className="group">
           <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              required
            />
          </div>
          <div className="group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={signuPassword}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn" type="submit">Sign Up</button>
          {errorSignup}
        </form>
        </div>
        </div>
        <div className="sign-In">
          <h3>Already have an account?</h3>
          <h4>Sign in with your email and password</h4>
          <form onSubmit={handleSignInSubmit}>
            <div className="group">
              <label htmlFor="signInEmail">Email:</label>
              <input
                type="email"
                id="signInEmail"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                required
              />
            </div>
            <div className="group">
              <label htmlFor="signInPassword">Password:</label>
              <input
                type="password"
                id="signInPassword"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                required
              />
            </div>
            <button className="btnn" type="submit">Sign In</button>
            <button className="bt" type="submit">Reset Password</button>
           <p> {errorLogin}</p>
          </form>
        </div>
    </div>
  );
};
export default SignUp;


