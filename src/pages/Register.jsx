import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    letter: false,
    number: false,
    specialChar: false
  });
  const navigate = useNavigate();

  const validatePassword = (pwd) => {
    const requirements = {
      length: pwd.length >= 8,
      letter: /[A-Za-z]/.test(pwd),
      number: /\d/.test(pwd),
      specialChar: /[@$!%*#?&]/.test(pwd)
    };
    setPasswordRequirements(requirements);
    return Object.values(requirements).every(Boolean);
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    validatePassword(pwd);
    setPasswordError('');
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      setPasswordError('Password does not meet all requirements.');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user => user.email === email)) {
      toast.error('Email already registered.');
      return;
    }

    const newUser = {
      username,
      email,
      password,
      age,
      sex,
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInUser', JSON.stringify(newUser));
    localStorage.setItem('isLoggedIn', 'true');
    window.dispatchEvent(new Event('loginStatusChanged'));

    toast.success('Registered successfully!');
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

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
                onChange={handlePasswordChange}
              />
              <div className="password-requirements mt-2">
                <small>Password must contain:</small>
                <ul className="list-unstyled">
                  <li className={passwordRequirements.length ? 'text-success' : 'text-danger'}>
                    {passwordRequirements.length ? '✓' : '✗'} At least 8 characters
                  </li>
                  <li className={passwordRequirements.letter ? 'text-success' : 'text-danger'}>
                    {passwordRequirements.letter ? '✓' : '✗'} At least one letter
                  </li>
                  <li className={passwordRequirements.number ? 'text-success' : 'text-danger'}>
                    {passwordRequirements.number ? '✓' : '✗'} At least one number
                  </li>
                  <li className={passwordRequirements.specialChar ? 'text-success' : 'text-danger'}>
                    {passwordRequirements.specialChar ? '✓' : '✗'} At least one special character (@$!%*#?&)
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-3">
              <label>Re-enter Password</label>
              <input
                type="password"
                className="form-control"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {passwordError && (
              <div className="alert alert-danger">{passwordError}</div>
            )}

            <div className="mb-3">
              <label>Age</label>
              <input
                type="number"
                className="form-control"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Sex</label>
              <select
                className="form-select"
                required
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button type="submit" className="btn btn-success w-100">Register</button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Register;