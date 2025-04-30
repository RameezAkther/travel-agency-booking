import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Booking = () => {
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(null);
  const [numPersons, setNumPersons] = useState(1);
  const [persons, setPersons] = useState([{ name: '', age: '', gender: '' }]);
  const [travelDate, setTravelDate] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const selected = JSON.parse(localStorage.getItem('selectedPackage'));
    setPackageData(selected);
  }, []);

  const handleNumPersonsChange = (e) => {
    const number = parseInt(e.target.value) || 1;
    setNumPersons(number);

    const newPersons = [];
    for (let i = 0; i < number; i++) {
      newPersons.push({ name: '', age: '', gender: '' });
    }
    setPersons(newPersons);
  };

  const handlePersonChange = (index, field, value) => {
    const updatedPersons = [...persons];
    updatedPersons[index][field] = value;
    setPersons(updatedPersons);
  };

  const handleBooking = () => {
    if (!userEmail || !travelDate) {
      toast.error("Please enter your email and select a travel date.");
      return;
    }

    const bookingData = {
      user: userEmail,
      package: packageData,
      travelDate: travelDate,
      persons: persons,
      bookingDate: new Date().toLocaleString(),
    };
    const storageKey = `bookings_${userEmail}`;
    const existingBookings = JSON.parse(localStorage.getItem(storageKey)) || [];
    existingBookings.push(bookingData);
    localStorage.setItem(storageKey, JSON.stringify(existingBookings));

    toast.success('Booking successful!');
    navigate('/your-bookings');
  };

  if (!packageData) {
    return <div className="text-center mt-5">No package selected for booking.</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Booking for: {packageData.name}</h2>

      <div className="mb-3">
        <label>Your Email (for saving bookings)</label>
        <input
          type="email"
          className="form-control"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Preferred Travel Date</label>
        <input
          type="date"
          className="form-control"
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Number of Persons</label>
        <input
          type="number"
          min="1"
          className="form-control"
          value={numPersons}
          onChange={handleNumPersonsChange}
        />
      </div>

      {persons.map((person, index) => (
        <div key={index} className="border p-3 mb-3 rounded">
          <h5>Person {index + 1}</h5>
          <div className="mb-2">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={person.name}
              onChange={(e) => handlePersonChange(index, 'name', e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label>Age</label>
            <input
              type="number"
              className="form-control"
              value={person.age}
              onChange={(e) => handlePersonChange(index, 'age', e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label>Gender</label>
            <select
              className="form-control"
              value={person.gender}
              onChange={(e) => handlePersonChange(index, 'gender', e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      ))}

      <button className="btn btn-success" onClick={handleBooking}>
        Confirm Booking
      </button>
    </div>
  );
};

export default Booking;
