import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { BiShowAlt } from "react-icons/bi";
import { db } from "../../firebase/firebaseConfig";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import Footer from "./Footer";
import Bgimage from '../assets/common/bg-img.png';

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // State to manage the current page
  const candidatesPerPage = 6; // Define the number of candidates per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "candidates"));
        const candidateData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setCandidates(candidateData);
      } catch (error) {
        console.error("Error fetching candidates: ", error);
      }
    };

    fetchData();
  }, []);

  const handleEditClick = (id) => {
    navigate(`/nav/edit-candidate/${id}`);
  };

  const handleShowClick = (id) => {
    navigate(`/nav/show-candidate/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      try {
        await deleteDoc(doc(db, "candidates", id));
        setCandidates(candidates.filter(candidate => candidate.id !== id));
      } catch (error) {
        console.error("Error deleting candidate: ", error);
      }
    }
  };

  // Pagination logic
  const filteredCandidates = candidates.filter(candidate =>
    candidate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = filteredCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate);

  const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  return (
    <>
      <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${Bgimage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div> {/* Optional: Adds a semi-transparent overlay for better text contrast */}
        <div className="container mx-auto py-6 px-4 relative z-10">
          <div className="w-full max-w-6xl bg-white bg-opacity-25 p-4 rounded-2xl shadow-lg mx-auto">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by name or title..."
                className="w-full p-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="overflow-x-auto rounded ">
              <table className="min-w-full divide-y divide-gray-200 mx-auto">
                <thead className="bg-[#254336] bg-opacity-90">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-50 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-50 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-50 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-50 uppercase tracking-wider">Job Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-50 uppercase tracking-wider">Salary Exp.</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-50 uppercase tracking-wider">Resume</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-green-50 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-[#6B8A7A] divide-y divide-[#B7B597]">
                  {currentCandidates.map((candidate, index) => (
                    <tr key={candidate.id} className={index % 2 === 0 ? 'bg-[#6B8A7A]' : 'bg-[#B7B597]'}>
                      <td className="px-6 py-4 whitespace-nowrap text-green-950 font-medium">{candidate.firstName} {candidate.lastName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-green-950 font-medium">{candidate.specialization}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-green-950 font-medium">{candidate.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-green-950 font-medium">{candidate.job_location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-green-950 font-medium">{candidate.salaryExpectation}</td>
                      <td className="px-6 py-4 whitespace-nowrap underline text-black font-medium">
                        <a target="_blank" href={candidate.cv} download={`${candidate.firstName}-${candidate.lastName}-Resume.pdf`}>View</a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-black cursor-pointer flex text-xl">
                        <FaUserEdit
                          className="hover:text-indigo-900"
                          onClick={() => handleEditClick(candidate.id)}
                        />&nbsp;&nbsp;
                        <MdDeleteForever
                          className="hover:text-indigo-900"
                          onClick={() => handleDelete(candidate.id)}
                        />&nbsp;&nbsp;
                        <BiShowAlt
                          className="hover:text-indigo-900"
                          onClick={() => handleShowClick(candidate.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#254336] text-white hover:bg-[#2e5440]'}`}
              >
                Previous
              </button>
              <span className="text-green-950 font-medium">Page {currentPage} of {totalPages}</span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#254336] text-white hover:bg-[#2e5440]'}`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CandidateList;
