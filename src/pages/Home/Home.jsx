import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroImages = [
    'https://www.hilton.com/im/en/NoHotel/19361896/shutterstock-667925704.jpg?impolicy=crop&cw=3800&ch=2533&gravity=NorthWest&xposition=0&yposition=1&rw=1280&rh=856',
    'https://www.traveltrendstoday.in/wp-content/uploads/2024/11/shutterstock_1116483092-scaled.jpg',
    'https://acko-cms.ackoassets.com/places_to_visit_in_egypt_2_46151d1196.png',
    'https://www.realhawaiitours.com/wp-content/uploads/2023/08/Oahu-Hawaii.jpg',
    'https://cdn.britannica.com/31/255531-050-B7E07090/eiffel-tower-paris-france-champ-de-mars-view.jpg'
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  // Auto-slide every 10 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-slider" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {heroImages.map((img, index) => (
            <div 
              key={img}
              className="hero-slide"
              style={{ backgroundImage: `url(${img})` }}
            />
          ))}
        </div>
        <div className="hero-content">
          <h1 className="display-4 fw-bold">Explore The World With Us</h1>
          <p className="lead mt-3">Your dream destination is just a few clicks away. Book your perfect trip today!</p>
          <Link to="/packages" className="btn btn-primary btn-lg mt-4">View Travel Packages</Link>
        </div>
        <button className="hero-nav left" onClick={prevSlide}>&#10094;</button>
        <button className="hero-nav right" onClick={nextSlide}>&#10095;</button>
      </div>

      {/* Rest of your existing content... */}
      <div className="container mb-5">
        <h2 className="mb-4 text-center">Why Choose Us?</h2>
        <p className="text-center">We are a trusted travel agency offering best-in-class travel packages, personalized experiences, and 24/7 customer support. Whether you're looking for a peaceful getaway or an adventurous journey, we are here to make your trip unforgettable!</p>
      </div>

      <div className="container mb-5">
        <h2 className="mb-4 text-center">Popular Destinations</h2>
        <div className="row">
          {[
            { title: 'Paris', desc: 'Experience the City of Lights with our exclusive Paris packages.', img: 'https://img.static-af.com/transform/45cb9a13-b167-4842-8ea8-05d0cc7a4d04/' },
            { title: 'Maldives', desc: 'Relax on pristine beaches and stay at luxury resorts in the Maldives.', img: 'https://media-cdn.tripadvisor.com/media/photo-s/29/7c/95/78/overwater-villas.jpg' },
            { title: 'Tokyo', desc: 'Discover the perfect blend of tradition and technology in Tokyo.', img: 'https://www.holidaymonk.com/wp-content/uploads/2024/05/Tokyo-Tour-Package-1024x683.webp' }
          ].map((place, idx) => (
            <div className="col-md-4 mb-4" key={idx}>
              <div className="card h-100 shadow-sm destination-card">
                <img src={`${place.img}`} className="card-img-top" alt={place.title} />
                <div className="card-body">
                  <h5 className="card-title">{place.title}</h5>
                  <p className="card-text">{place.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 text-center gradient-cta text-white rounded-4">
        <h2 className="fw-bold">Ready for your next adventure?</h2>
        <p className="lead mt-3">Browse our amazing travel packages and start planning today!</p>
        <Link to="/packages" className="btn btn-light btn-lg mt-4">See Packages</Link>
      </div>
      
    </div>
  );
};

export default Home;