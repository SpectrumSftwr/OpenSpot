import React from "react";

export const PrivacyPolicy = () => {
 return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-6">Privacy Policy for OpenSpot</h1>

      <p className="mb-4 text-sm text-gray-600">Effective Date: <strong>January 18th, 2024</strong></p>

      <p className="mb-4">
        At OpenSpot ("we," "our," "us"), your privacy is important to us. This Privacy Policy explains how we collect,
        use, share, and protect your information when you use our platform and services. By using OpenSpot, you consent
        to the practices described in this Privacy Policy.
      </p>

      <hr className="my-6 border-gray-300" />

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
        <p>We collect the following types of information:</p>
        <ul className="list-disc list-inside mt-4">
          <li>
            <strong>Personal Information:</strong> Name, email address, phone number, and payment information (when
            applicable).
          </li>
          <li>
            <strong>Non-Personal Information:</strong> Browser type and version, IP address, device information, and
            usage data.
          </li>
          <li>
            <strong>Information You Provide:</strong> Content uploaded to the platform and communication with us (e.g.,
            customer support inquiries).
          </li>
          <li>
            <strong>Information Collected Automatically:</strong> Cookies, log files, and analytics tools.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside">
          <li>Provide and improve our services</li>
          <li>Process bookings and payments</li>
          <li>Communicate with you about your account, bookings, or updates</li>
          <li>Ensure platform security and prevent fraud</li>
          <li>Comply with legal obligations</li>
          <li>Send marketing and promotional materials (with your consent)</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">3. Sharing Your Information</h2>
        <p>We may share your information with:</p>
        <ul className="list-disc list-inside">
          <li>
            <strong>Service Providers:</strong> Third-party vendors that assist with payment processing, hosting,
            customer support, and analytics.
          </li>
          <li>
            <strong>Legal Authorities:</strong> When required to comply with legal obligations or respond to lawful
            requests.
          </li>
          <li>
            <strong>Other Users:</strong> Limited information shared to facilitate bookings (e.g., name or business
            name).
          </li>
        </ul>
        <p className="mt-4">We do not sell your personal information to third parties.</p>
      </section>

      {/* Repeat similar structure for other sections */}

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
        <p>
          If you have questions or concerns about this Privacy Policy, please contact us:
        </p>
        <ul className="list-none mt-4">
          <li>Email: <a href="mailto:Jmejia1999@gmail.com" className="text-blue-500 underline">Jmejia1999@gmail.com</a></li>
        </ul>
      </section>

      <footer className="mt-12 text-center text-sm text-gray-500">
        Thank you for trusting OpenSpot. Your privacy is our priority.
      </footer>
    </div>
  );
}
