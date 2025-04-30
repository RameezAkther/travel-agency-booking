import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const VerifyCode = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    if (code === '1234') { // Hardcoded verification code
      navigate('/reset-password');
    } else {
      toast.error('Invalid code.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Verify Code</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleVerify}>
            <div className="mb-3">
              <label>Enter the verification code (1234)</label>
              <input
                type="text"
                className="form-control"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Verify</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
