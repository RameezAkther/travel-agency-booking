import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">About Us</h2>

      <div className="row">
        <div className="col-md-6">
          <img
            src="https://media.istockphoto.com/id/1497396873/photo/ready-for-starting-my-beach-holiday.jpg?s=612x612&w=0&k=20&c=Rfb7IbYAZR1hNTF6KUDYq8CVu9Yr4wRgK2VLZIZyORY="
            alt="Travel"
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h4>Welcome to Wanderlust Travels!</h4>
          <p>
            At Wanderlust Travels, we believe that travel is not just about reaching a destination, but about creating unforgettable memories along the way. 
            We are passionate about helping you explore the world with ease, comfort, and excitement.
          </p>
          <p>
            Whether you are looking for a luxurious beach resort, an adventurous mountain trek, or a cultural city tour, we have packages that suit every traveler's dream.
          </p>
          <p>
            Our mission is to make travel accessible, affordable, and truly magical for everyone. 
            With years of experience and a dedicated team, we ensure your journey is smooth and full of joy!
          </p>
        </div>
      </div>

      <div className="mt-5">
        <h4 className="text-center">Why Choose Us?</h4>
        <div className="row text-center mt-4">
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm p-3">
              <h5>Expert Guides</h5>
              <p>Our experienced guides ensure that you experience the best every destination has to offer.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm p-3">
              <h5>Affordable Pricing</h5>
              <p>We offer competitive rates without compromising on quality and comfort.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm p-3">
              <h5>24/7 Support</h5>
              <p>Our customer support team is available round-the-clock to assist you anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
