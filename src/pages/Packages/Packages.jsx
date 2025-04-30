import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Packages.css';

const Packages = () => {
  const navigate = useNavigate();
  const USD_TO_INR = 83;

  // Default packages (only added once if not present)
  const defaultPackages = [
    {
      id: 1,
      name: "Paris Getaway",
      location: "Paris",
      image: "https://img.static-af.com/transform/45cb9a13-b167-4842-8ea8-05d0cc7a4d04/",
      priceUSD: 1500,
      description: "5 nights in the City of Lights."
    },
    {
      id: 2,
      name: "Maldives Retreat",
      location: "Maldives",
      image: "https://www.travelandleisure.com/thmb/N_r_xMvHfYjCHgZE-9bAWNiVAwU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-conrad-maldives-rangali-island-MALDIVESHOTELS1024-6dfdeac00fec4f69893e7576b5896da9.jpg",
      priceUSD: 3000,
      description: "7 nights luxury beach resort."
    },
    {
      id: 3,
      name: "Tokyo Explorer",
      location: "Tokyo",
      image: "https://t4.ftcdn.net/jpg/02/51/12/11/360_F_251121174_5xQyUCqSrkswyLHbM9Ne8DQ8Qb0o1HGw.jpg",
      priceUSD: 2000,
      description: "Explore the heart of Japan in 6 days."
    },
    {
      id: 4,
      name: "Swiss Alps Adventure",
      location: "Switzerland",
      image: "https://orbisways.com/wp-content/uploads/2020/10/Lago-Bachalpsee-rodeado-por-los-Alpes-berneses-1.jpg",
      priceUSD: 2500,
      description: "Ski and relax in Swiss mountains."
    },
    {
      id: 5,
      name: "Dubai Luxury Trip",
      location: "Dubai",
      image: "https://static.independent.co.uk/2023/07/04/09/iStock-1193239486.jpg?width=1200",
      priceUSD: 1800,
      description: "5 days in luxurious Dubai."
    }
  ];

  // Save default packages once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const saved = localStorage.getItem('packages');
    if (!saved) {
      const withINR = defaultPackages.map(pkg => ({
        ...pkg,
        priceINR: pkg.priceUSD * USD_TO_INR
      }));
      localStorage.setItem('packages', JSON.stringify(withINR));
    }
  }, []);

  const [search, setSearch] = useState('');
  const [filterPlace, setFilterPlace] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [packages, setPackages] = useState([]);

  // Load packages from localStorage & filter/sort
  useEffect(() => {
    const storedPackages = JSON.parse(localStorage.getItem('packages')) || [];

    let filtered = [...storedPackages];

    if (search) {
      filtered = filtered.filter(pkg =>
        pkg.name.toLowerCase().includes(search.toLowerCase()) ||
        pkg.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filterPlace) {
      filtered = filtered.filter(pkg => pkg.location === filterPlace);
    }

    if (sortOrder === 'lowToHigh') {
      filtered.sort((a, b) => a.priceINR - b.priceINR);
    } else if (sortOrder === 'highToLow') {
      filtered.sort((a, b) => b.priceINR - a.priceINR);
    }

    setPackages(filtered);
  }, [search, filterPlace, sortOrder]);

  const handleViewDetails = (pkg) => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      toast.error("Please log in to view package details.");
      // Store the selected package and redirect path
      localStorage.setItem('selectedPackage', JSON.stringify(pkg));
      navigate('/login', { state: { from: `/package-details` } });
    } else {
      localStorage.setItem('selectedPackage', JSON.stringify(pkg));
      navigate('/package-details');
    }
  };
  
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this package?");
    if (confirmDelete) {
      const updated = allPackages.filter(pkg => pkg.id !== id);
      localStorage.setItem('packages', JSON.stringify(updated));
      setPackages(prev => prev.filter(pkg => pkg.id !== id));
    }
  };
  
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const isAdmin = loggedInUser?.username === 'admin'; // You should have a role for admin
  

  const allPackages = JSON.parse(localStorage.getItem('packages')) || [];
  const uniquePlaces = [...new Set(allPackages.map(pkg => pkg.location))];

  return (
    <div>
      {/* Filters */}
      <div className="container mb-4" style={{ padding: '20px', borderRadius: '5px', marginTop: '20px' }}>
        <div className="row g-3 align-items-center">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by location or package name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <select className="form-select" value={filterPlace} onChange={(e) => setFilterPlace(e.target.value)}>
              <option value="">All Places</option>
              {uniquePlaces.map(place => (
                <option key={place} value={place}>{place}</option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <select className="form-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
              <option value="">Sort By</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Packages List */}
      <div className="container">
        <div className="row">
          {packages.length > 0 ? (
            packages.map(pkg => (
              <div className="col-md-4 mb-4" key={pkg.id}>
                <div className="card h-100 shadow-sm package-card">
                  <img
                    src={pkg.image}
                    className="card-img-top"
                    alt={pkg.name}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{pkg.name}</h5>
                    <p className="card-text">{pkg.description}</p>
                    <p className="card-text"><strong>Location:</strong> {pkg.location}</p>
                    <p className="card-text"><strong>Price:</strong> ₹{pkg.priceINR.toLocaleString()}</p>
                    <div className="d-flex gap-2 mt-auto">
                      <button className="btn btn-primary" onClick={() => handleViewDetails(pkg)}>
                        View Details
                      </button>
                      {isAdmin && (
                        <button className="btn btn-danger" onClick={() => handleDelete(pkg.id)}>
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h4 className="text-center">No Packages Found</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default Packages;
