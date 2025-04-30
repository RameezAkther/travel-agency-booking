import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const YourBookings = () => {
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [cancelledBookings, setCancelledBookings] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser && loggedInUser.email) {
      const email = loggedInUser.email;
      setUserEmail(email);

      const storageKey = `bookings_${email}`;
      const cancelledKey = `cancelledBookings_${email}`;
      const storedBookings = JSON.parse(localStorage.getItem(storageKey)) || [];
      const storedCancelled = JSON.parse(localStorage.getItem(cancelledKey)) || [];

      const today = new Date();

      const upcoming = [];
      const past = [];

      storedBookings.forEach((booking) => {
        const travelDate = new Date(booking.travelDate);
        if (travelDate >= today) {
          upcoming.push(booking);
        } else {
          past.push(booking);
        }
      });

      setUpcomingBookings(upcoming);
      setPastBookings(past);
      setCancelledBookings(storedCancelled);
    }
  }, []);

  const cancelBooking = (index) => {
    if (!userEmail) return;

    const storageKey = `bookings_${userEmail}`;
    const cancelledKey = `cancelledBookings_${userEmail}`;

    const updatedBookings = [...upcomingBookings];
    const cancelledBooking = updatedBookings.splice(index, 1)[0];

    const updatedCancelled = [...cancelledBookings, {
      ...cancelledBooking,
      cancelledAt: new Date().toLocaleString(),
    }];

    localStorage.setItem(storageKey, JSON.stringify([...pastBookings, ...updatedBookings]));
    localStorage.setItem(cancelledKey, JSON.stringify(updatedCancelled));

    setUpcomingBookings(updatedBookings);
    setCancelledBookings(updatedCancelled);
    toast.success('Booking canceled successfully.');
  };

  const renderBookings = (bookings, allowCancel = false) => (
    bookings.map((booking, index) => (
      <div key={index} className="card mb-4 shadow-sm">
        <div className="card-body">
          <h4 className="card-title">{booking.package.name}</h4>
          <p><strong>Location:</strong> {booking.package.location}</p>
          <p><strong>Price:</strong> ₹{booking.package.priceINR}</p>
          <p><strong>Travel Date:</strong> {booking.travelDate}</p>
          <p><strong>Booking Created On:</strong> {booking.bookingDate}</p>
          {booking.cancelledAt && (
            <p className="text-danger"><strong>Cancelled At:</strong> {booking.cancelledAt}</p>
          )}
          <h5 className="mt-3">Traveler Details:</h5>
          <ul className="list-group mb-3">
            {booking.persons.map((person, idx) => (
              <li key={idx} className="list-group-item">
                {person.name} | Age: {person.age} | Gender: {person.gender}
              </li>
            ))}
          </ul>

          {allowCancel && (
            <button className="btn btn-danger" onClick={() => cancelBooking(index)}>
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    ))
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Your Bookings</h2>

      {!userEmail ? (
        <p className="text-danger">Please log in to view your bookings.</p>
      ) : (
        <>
          {/* Upcoming Bookings */}
          <h4 className="text-primary">Upcoming Bookings</h4>
          {upcomingBookings.length === 0 ? (
            <p>No upcoming bookings found.</p>
          ) : (
            renderBookings(upcomingBookings, true)
          )}

          {/* Past Bookings */}
          <h4 className="text-secondary mt-5">Past Bookings</h4>
          {pastBookings.length === 0 ? (
            <p>No past bookings found.</p>
          ) : (
            renderBookings(pastBookings)
          )}

          {/* Cancelled Bookings */}
          <h4 className="text-danger mt-5">Cancelled Bookings</h4>
          {cancelledBookings.length === 0 ? (
            <p>No cancelled bookings found.</p>
          ) : (
            renderBookings(cancelledBookings)
          )}
        </>
      )}
    </div>
  );
};

export default YourBookings;
