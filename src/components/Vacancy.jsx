import React, { useState } from 'react';
import bgimg from '../assets/common/bg-img.png';
import Footer from './Footer';
import { db } from '../../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Vacancy = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    designation: '',
    jobDescription: '',
    jobType: '',
    location: '',
    salary: '',
    hrEmail: '',
    hrContact: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'vacancies'), {
        ...formData,
        timestamp: new Date()
      });
      console.log('Vacancy added:', formData);
      navigate('/nav/home');

      setFormData({
        companyName: '',
        designation: '',
        jobDescription: '',
        jobType: '',
        location: '',
        salary: '',
        hrEmail: '',
        hrContact: ''
      });
    } catch (error) {
      console.error('Error adding vacancy:', error);
    }
  };

  return (
    <>
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-no-repeat bg-opacity-50 py-5"
        style={{ backgroundImage: `url(${bgimg})`, backgroundSize: 'cover' }}
      >
        <div className="bg-[#B7B597] p-8 mx-4 sm:mx-8 md:mx-16 rounded-lg shadow-2xl w-full max-w-2xl bg-opacity-50">
          <h1 className="text-2xl font-bold mb-4 uppercase text-center">Add a Vacancy</h1>
          <hr className="mb-4" />
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-black font-medium mb-2" htmlFor="companyName">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-black font-medium mb-2" htmlFor="designation">
                Designation
              </label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-black font-medium mb-2" htmlFor="jobType">
                Job Type
              </label>
              <select
                id="jobType"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select job type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-black font-medium mb-2" htmlFor="jobDescription">
                Job Description
              </label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                maxLength={50}
                value={formData.jobDescription}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
                required
              />
            </div>
            <div className="mb-4 md:flex md:space-x-4">
              <div className="w-full mb-4 md:mb-0">
                <label className="block text-black font-medium mb-2" htmlFor="location">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="w-full">
                <label className="block text-black font-medium mb-2" htmlFor="salary">
                  Expected Salary
                </label>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>
            <div className="mb-4 md:flex md:space-x-4">
              <div className="w-full mb-4 md:mb-0">
                <label className="block text-black font-medium mb-2" htmlFor="hrEmail">
                  HR Email
                </label>
                <input
                  type="email"
                  id="hrEmail"
                  name="hrEmail"
                  value={formData.hrEmail}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="w-full">
                <label className="block text-black font-medium mb-2" htmlFor="hrContact">
                  HR Contact
                </label>
                <input
                  type="text"
                  id="hrContact"
                  name="hrContact"
                  value={formData.hrContact}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="w-1/2 font-bold py-2 px-4 rounded-lg border text-black bg-transparent hover:bg-[#0f271c] hover:text-white"
              >
                Submit
              </button>
              <button
                type="reset"
                className="w-1/2 hover:bg-[#0f271c] rounded-lg border hover:text-white py-2 px-4 font-bold text-black bg-transparent"
                onClick={() => setFormData({
                  companyName: '',
                  designation: '',
                  jobDescription: '',
                  jobType: '',
                  location: '',
                  salary: '',
                  hrEmail: '',
                  hrContact: ''
                })}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Vacancy;
