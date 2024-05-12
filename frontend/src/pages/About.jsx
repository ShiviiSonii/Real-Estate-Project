import React from 'react';
import Header from '../components/Header';
import backgroundImage from '../../public/home.jpg';


export default function About() {
  return (
    <>
      <Header />
      <div className="relative h-screen">
        <div className="absolute inset-0 z-0">
          <img src={backgroundImage} alt="Background" className="object-cover w-full h-full" />
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
        <div className="relative z-10 py-20 px-2 sm:px-4 max-w-6xl mx-auto text-white">
          <h1 className="text-3xl font-bold mb-6">About RealEstate</h1>
          <p className="mb-8 text-md sm:text-lg">
             RealEstate is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.
          </p>
          <p className="mb-8 text-md sm:text-lg">
            Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell, or rent a property, we are here to help you every step of the way.
          </p>
          <p className="mb-8 text-md sm:text-lg">
            With a wealth of experience and knowledge in the real estate industry, our team of agents is committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.
          </p>
        </div>
      </div>
    </>
  );
}
