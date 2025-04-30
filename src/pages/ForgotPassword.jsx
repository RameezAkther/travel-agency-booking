import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email);

    if (user) {
      localStorage.setItem('resetEmail', email);
      toast.success('Verification code sent to your email (fake)');
      navigate('/verify-code');
    } else {
      toast.error('Email not found!');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Forgot Password</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Enter your registered email address</label>
              <input
                type="email"
                className="form-control"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Send Verification Code</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
