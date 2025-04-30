import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PackageDetails.css'; // Create this for custom styles

const PackageDetails = () => {
  const [pkg, setPkg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const selected = JSON.parse(localStorage.getItem('selectedPackage'));

    if (selected) {
      // If itinerary is not present, create and save one
      if (!selected.itinerary) {
        selected.itinerary = [
          { day: 1, from: 'Chennai', to: selected.location, time: '10:00 AM', transport: 'Flight' },
          { day: 2, from: selected.location, to: 'City Center Tour', time: '09:00 AM', transport: 'Bus' },
          { day: 3, from: selected.location, to: 'Museum & Local Market', time: '11:00 AM', transport: 'Cab' },
          { day: 4, from: selected.location, to: 'Beach or Park Visit', time: '03:00 PM', transport: 'Walk' },
          { day: 5, from: selected.location, to: 'Airport', time: '05:00 PM', transport: 'Flight back to Chennai' },
        ];
        localStorage.setItem('selectedPackage', JSON.stringify(selected));
      }

      setPkg(selected);
    }
  }, []);

  if (!pkg) {
    return <div className="text-center mt-5">No package selected.</div>;
  }

  return (
    <div className="package-details">
      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${pkg.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textShadow: '2px 2px 8px rgba(0,0,0,0.8)'
        }}
      >
        <h1 className="display-4 text-center">{pkg.name}</h1>
      </div>

      {/* Package Summary */}
      <div className="container mt-4">
        <div className="card p-4 shadow-sm">
          <h3>{pkg.name}</h3>
          <p>{pkg.description}</p>
          <p><strong>Location:</strong> {pkg.location}</p>
          <p><strong>Price:</strong> ₹{(pkg.priceINR || pkg.price).toLocaleString()}</p>
        </div>

        {/* Itinerary Section */}
        <div className="mt-5">
          <h4 className="mb-3">Itinerary</h4>
          <ul className="list-group">
            {pkg.itinerary.map((item, idx) => (
              <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>Day {item.day}</strong>: {item.from} ➝ {item.to}
                </div>
                <span>{item.time} - {item.transport}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Book Now Button */}
        <div className="text-center mt-4">
          <button className="btn btn-success px-4 py-2" onClick={() => navigate('/booking')}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
