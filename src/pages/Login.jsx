import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true');
      toast.success('Login successful!');
      window.dispatchEvent(new Event('loginStatusChanged'));
      
      // Check if there's a redirect path in state
      const from = location.state?.from || '/';
      navigate(from);
    } else {
      toast.error('Invalid email or password.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-3 text-end">
              <Link to="/forgot-password" className="text-decoration-none">Forgot Password?</Link>
            </div>

            <button type="submit" className="btn btn-primary w-100">Login</button>

            <p className="text-center mt-3">
              No account? <Link to="/register" className="text-decoration-none">Register Now</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;