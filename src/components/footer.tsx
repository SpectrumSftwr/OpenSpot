import React from "react";

// Footer Component
export const Footer = () => {
  return (
    <div className="sticky bottom-0 w-full flex flex-col items-center justify-center p-5 bg-brand-800 
      text-white text-center mt-12 rounded-t-xl">
      <div className="mb-2">
        <a href="https://instagram.com/openspotapp" target="_blank" rel="noopener noreferrer" className="hover:underline mx-2">Instagram</a>
        <a href="https://twitter.com/openspotapp" target="_blank" rel="noopener noreferrer" className="hover:underline mx-2">Twitter</a>
      </div>
      <div className="mb-2">
        <a href="https://openspotapp.com//terms-and-conditions" target="_blank" rel="noopener noreferrer" className="hover:underline mx-2">
          Terms & Services
        </a>
        <a href="https://openspotapp.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:underline mx-2">
          Privacy Policy
        </a>
      </div>
      <div className="text-sm">
        <p className="my-1">© {new Date().getFullYear()} OpenSpot LLC</p>
      </div>
    </div>
  );
};
