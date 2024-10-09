import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import '../index.css';
import Footer from './Footer';
import Bgimage from '../assets/common/bg-img.png';
import { PiBuildingApartmentFill, PiCurrencyInrDuotone } from "react-icons/pi";
import { RiHandbagLine } from "react-icons/ri";
import { IoLocation } from "react-icons/io5";
import { MdContactMail, MdContactPhone } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
// import GuitarString from './GuitarString';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ value, onChange }) => (
  <div className="relative mt-4">
    <div className="flex justify-center">
      <div className="max-w-9xl w-full mx-6 sm:mx-6 md:mx-16 lg:mx-80">
        <div className="flex items-center bg-yellow-200 border rounded-full p-2 bg-opacity-0">
          <input
            type="text"
            placeholder="search for vacancies..."
            value={value}
            onChange={onChange}
            className="p-1 outline-none text-sm w-full bg-transparent text-black font-bol"
          />
          <span className="relative right-2 top-3 transform -translate-y-1/2 text-green-500 text-xl">&#x1F50D;</span>
        </div>
      </div>
    </div>
  </div>
);

const Card = ({ vacancy, onEdit, onDelete }) => (
  <div className="rounded-lg shadow-2xl p-4 md:p-6 lg:p-8 border bg-[#B7B597] w-full h-full bg-opacity-80">
    <div className="flex justify-end items-center mb-2">
      <a title='Edit' onClick={() => onEdit(vacancy)}><CiEdit className='text-3xl text-green-600 cursor-pointer' /></a>&nbsp;
      <a title='Delete' onClick={() => onDelete(vacancy.id)}><TiDelete className='text-3xl text-red-600 cursor-pointer' /></a>
    </div>
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold ">{vacancy.designation}</h2>
    </div>
    <p className="text-gray-600 flex items-center text-sm md:text-base mb-2"><PiBuildingApartmentFill />&nbsp;<span>{vacancy.companyName}</span></p>
    <p className="text-gray-800 md:text-base mb-2">
      <span className='text-sm block truncate'>{vacancy.jobDescription}</span>
    </p>
    <div className="items-center my-2">
      <div className="flex items-center mb-1">
        <MdContactPhone />&nbsp;<span>{vacancy.hrContact}</span>
      </div>
      <div className="flex items-center mb-1">
        <MdContactMail />&nbsp;<span>{vacancy.hrEmail}</span>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div className="flex items-center">
        <RiHandbagLine />
        <span className="ml-2">{vacancy.jobType}</span>
      </div>
      <div className="flex items-center">
        <PiCurrencyInrDuotone />
        <span className="ml-2">{vacancy.salary} P.A.</span>
      </div>
      <div className="flex items-center">
        <IoLocation />
        <span className="ml-2">{vacancy.location}</span>
      </div>
    </div>
  </div>
);

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    const fetchVacancies = async () => {
      const querySnapshot = await getDocs(collection(db, 'vacancies'));
      const fetchedVacancies = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Sort vacancies by timestamp in descending order
      fetchedVacancies.sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate());

      setVacancies(fetchedVacancies);
    };

    fetchVacancies();
  }, []);

  const filteredVacancies = vacancies.filter(vacancy =>
    vacancy.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const navigate = useNavigate();

  const handleEdit = (vacancy) => {
    navigate(`/nav/edit/${vacancy.id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this vacancy?')) {
      try {
        await deleteDoc(doc(db, 'vacancies', id));
        setVacancies(prevVacancies => prevVacancies.filter(vacancy => vacancy.id !== id));
      } catch (error) {
        console.error('Error deleting vacancy:', error);
      }
    }
  };


  return (
    <>
      <div className="container py-12 bg-cover bg-no-repeat bg-center max-w-full min-h-screen flex flex-col items-center" style={{ backgroundImage: `url(${Bgimage})` }}>
       
        <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <div className="flex flex-col items-center mt-8">
          {/* <GuitarString/> */}
          <span className="sticky top-0  px-2 py-1 text-2xl font-bold text-black rounded-full ">
            New Vacancies
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 w-full max-w-5xl mt-4 px-4">
            {filteredVacancies.map((vacancy) => (
              <Card
                key={vacancy.id}
                vacancy={vacancy}
                onEdit={handleEdit}
                onDelete={() => handleDelete(vacancy.id)}
              />
            ))}
          </div>
        </div>
        
      </div>
      
      <Footer />
    </>
  );
};

export default Home;
