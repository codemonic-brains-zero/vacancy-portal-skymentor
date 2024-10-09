import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Bgimage from '../assets/common/bg-img.png';
import Footer from "./Footer";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const CandidateEdit = () => {
    const { id } = useParams(); // Assuming you pass candidate ID via route params
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        gender: '',
        job_location: '',
        specialization: '',
        salaryExpectation: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCandidateData = async () => {
            try {
                const docRef = doc(db, "candidates", id); // Retrieve document by ID
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setFormData({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        contact: data.contact,
                        gender: data.gender,
                        job_location: data.job_location,
                        specialization: data.specialization,
                        salaryExpectation: data.salaryExpectation
                    });
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document: ", error);
            }
        };

        fetchCandidateData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Update form data in Firestore
            const docRef = doc(db, "candidates", id); // Reference to the specific document
            await updateDoc(docRef, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                contact: formData.contact,
                gender: formData.gender,
                job_location: formData.job_location,
                specialization: formData.specialization,
                salaryExpectation: formData.salaryExpectation
            });

            console.log("Document successfully updated!");
            navigate('/nav/view-candidates');

        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-cover bg-no-repeat p-4" style={{ backgroundImage: `url(${Bgimage})` }}>
                <div className="w-full max-w-3xl rounded-lg shadow-lg p-6 bg-opacity-60 bg-[#B7B597] md:p-8">
                    <h2 className="text-2xl font-bold mb-4 text-center text-black uppercase">Candidate Detail Form</h2>
                    <hr />
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="block">
                                <label htmlFor="firstName" className="block text-sm font-medium text-black">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                    required
                                />
                            </div>
                            <div className="block">
                                <label htmlFor="lastName" className="block text-sm font-medium text-black">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="block">
                                <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                    required
                                />
                            </div>
                            <div className="block">
                                <label htmlFor="contact" className="block text-sm font-medium text-black">Contact</label>
                                <input
                                    type="tel"
                                    id="contact"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="block">
                                <label className="block text-sm font-medium text-black">Gender</label>
                                <div className="mt-1 flex space-x-4">
                                    <label className="flex items-center text-black">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            checked={formData.gender === 'male'}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-black focus:ring-indigo-500 border-black"
                                            required
                                        />
                                        <span className="ml-2 text-sm">Male</span>
                                    </label>
                                    <label className="flex items-center text-black">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            checked={formData.gender === 'female'}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-black focus:ring-indigo-500 border-black"
                                            required
                                        />
                                        <span className="ml-2 text-sm">Female</span>
                                    </label>
                                    <label className="flex items-center text-black">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="other"
                                            checked={formData.gender === 'other'}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-black focus:ring-indigo-500 border-black"
                                            required
                                        />
                                        <span className="ml-2 text-sm">Other</span>
                                    </label>
                                </div>
                            </div>
                            <div className="block">
                                <label htmlFor="job_location" className="block text-sm font-medium text-black">Job Location</label>
                                <input
                                    type="text"
                                    id="job_location"
                                    name="job_location"
                                    value={formData.job_location}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                            <div className="block">
                                <label htmlFor="specialization" className="block text-sm font-medium text-black">Specialization</label>
                                <input
                                    type="text"
                                    id="specialization"
                                    name="specialization"
                                    value={formData.specialization}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                    required
                                />
                            </div>
                            <div className="block mb-3">
                                <label htmlFor="salaryExpectation" className="block text-sm font-medium text-black">Salary Expectation</label>
                                <input
                                    type="number"
                                    id="salaryExpectation"
                                    name="salaryExpectation"
                                    value={formData.salaryExpectation}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full border border-white text-black py-2 px-4 rounded-md shadow-sm hover:bg-[#0b291f] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#55e6a5] font-extrabold"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CandidateEdit;
