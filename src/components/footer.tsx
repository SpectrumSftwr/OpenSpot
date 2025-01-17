import React from "react";

// Footer Component
export const Footer = () => {
  return (
    <div className="sticky md:absolute lg:absolute bottom-0 w-full flex flex-col items-center justify-center p-5 bg-brand-800 text-white text-center mt-12">
      <div className="mb-2">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline mx-2">Facebook</a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline mx-2">Twitter</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline mx-2">Instagram</a>
      </div>
      <div className="mb-2">
        <a href="https://openspot.com/termsconditions" target="_blank" rel="noopener noreferrer" className="hover:underline mx-2">Terms & Services</a>
        <a href="https://openspot.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:underline mx-2">Privacy Policy</a>
      </div>
      <div className="text-sm">
        <p className="my-1">© {new Date().getFullYear()} OpenSpot LLC</p>
      </div>
    </div>
  );
};
