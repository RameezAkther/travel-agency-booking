import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    const email = localStorage.getItem('resetEmail');
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const updatedUsers = users.map(user => {
      if (user.email === email) {
        return { ...user, password: newPassword };
      }
      return user;
    });

    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.removeItem('resetEmail');

    toast.success('Password reset successfully!');
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Reset Password</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleReset}>
            <div className="mb-3">
              <label>New Password</label>
              <input
                type="password"
                className="form-control"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-success w-100">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
