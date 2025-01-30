import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PersonalDetailsContextDto } from "./dtos/personalDetailsContext.dto";
import { BookingContext } from "./layouts/bookingslayout";

export const PersonalInformation = () => {
  const navigate = useNavigate();
  const {user} = useParams()
  const bookingContext = useContext(BookingContext);
  const [personalInformation, setPersonalInformation] = bookingContext.personalDetails;

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    comments: false,
  })

  const [formData, setFormData] = useState<PersonalDetailsContextDto>(personalInformation);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    const newErrors = {
      firstName: false,
      lastName: false, 
      email: false,
      phone: false,
      comments: false,
    }

    // Check if form is valid
    if (!formData.firstName) newErrors.firstName = true;
    if (!formData.lastName) newErrors.lastName = true;
    if (!formData.email) newErrors.email = true;
    if (!formData.phone) newErrors.phone = true;

    if (Object.keys(newErrors).map((key) => newErrors[key]).filter((val) => val).length > 0) {
      setErrors(newErrors); 
      return
    }

    setPersonalInformation(formData);
    navigate(`/myspot/${user}/bookings/review`)
  }

  return (
    <div className="h-screen w-screen">
      <div className="flex flex-row justify-center text-gray-700 font-semibold mt-4">
        Personal Details
      </div>
      <div className="flex flex-col h-full items-center w-full">
        <form onSubmit={handleSubmit} className="pl-8 pr-8 max-w-96">
          <div className="mb-4 mt-4">
            <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-80 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 
focus:ring-blue-500 focus:border-blue-500
${errors.firstName ? "border-red-600 " : ""}`}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-80 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 
                          focus:ring-blue-500 focus:border-blue-500
                          ${errors.lastName ? "border-red-600 " : ""}`}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-80 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 
                          focus:ring-blue-500 focus:border-blue-500
                          ${errors.email ? "border-red-600 " : ""}`}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-80 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 
                        focus:ring-blue-500 focus:border-blue-500
                        ${errors.phone ? "border-red-600 " : ""}`}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Preferred Method of Contact
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="preferredContact"
                  value="email"
                  checked={formData.preferredContact === "email"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Email
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="preferredContact"
                  value="phone"
                  checked={formData.preferredContact === "phone"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Phone
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="comments" className="block text-gray-700 font-medium mb-2">
              Comments or Requests
            </label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className={`w-80 px-4 resize-none py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 
                          focus:ring-blue-500 focus:border-blue-500
                          ${errors.comments ? "border-red-600 " : ""}`}
              placeholder="Enter any additional details here..."
              rows={4}
            />
          </div>
        </form>
        <div className="relative flex justify-around mt-2 space-x-2 w-full">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-brand-800 text-white rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Next
          </button>
        </div>        
      </div>
    </div>
  )
}
