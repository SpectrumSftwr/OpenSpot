import React from "react";

export const TermsAndConditions = () => {
  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-6">Terms and Conditions for OpenSpot</h1>

      <p className="mb-4 text-sm text-gray-600">Effective Date: <strong>January 18th, 2024</strong></p>

      <p className="mb-4">
        Welcome to OpenSpot ("we," "our," "us"). By using our platform and services, you ("user," "you") agree to the
        following terms and conditions. Please read them carefully. If you do not agree, you may not use our services.
      </p>

      <hr className="my-6 border-gray-300" />

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p>
          OpenSpot provides a platform for entertainment service providers ("Providers") to showcase their availability,
          receive bookings, and manage their business operations. By accessing or using OpenSpot, you agree to comply
          with these Terms and Conditions.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
        <ul className="list-disc list-inside">
          <li>
            <strong>"Service":</strong> The OpenSpot platform, including its website, mobile application, and related features.
          </li>
          <li>
            <strong>"Provider":</strong> An entertainment service provider using OpenSpot to manage their business.
          </li>
          <li>
            <strong>"Client":</strong> A user booking services through OpenSpot.
          </li>
          <li>
            <strong>"Content":</strong> Any information, data, text, graphics, photos, or other materials uploaded to the platform
            by users.
          </li>
        </ul>
      </section>

      {/* Repeat similar structure for all other sections */}

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">16. Contact Information</h2>
        <p>
          For questions or concerns about these Terms, please contact us at:
        </p>
        <ul className="list-none mt-4">
          <li>Email: <a href="mailto:Jmejia1999@gmail.com" className="text-blue-500 underline">Jmejia1999@gmail.com</a></li>
          <li>Address: None</li>
        </ul>
      </section>

      <footer className="mt-12 text-center text-sm text-gray-500">
        Thank you for choosing OpenSpot. We’re excited to help you manage and grow your entertainment service business!
      </footer>
    </div>
  );
}
