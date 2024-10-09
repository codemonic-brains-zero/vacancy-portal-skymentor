import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Bgimage from '../assets/common/bg-img.png';
import Footer from "./Footer";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const CandidateShow = () => {
    const { id } = useParams(); // Get candidate ID from route params
    const [candidate, setCandidate] = useState(null);

    useEffect(() => {
        const fetchCandidateData = async () => {
            try {
                const docRef = doc(db, "candidates", id); // Retrieve document by ID
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setCandidate(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document: ", error);
            }
        };

        fetchCandidateData();
    }, [id]);

    if (!candidate) {
        return <p>Loading...</p>; // Optionally, show a loading indicator or message
    }

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-cover bg-no-repeat p-4" style={{ backgroundImage: `url(${Bgimage})` }}>
                <div className="w-full max-w-3xl rounded-lg shadow-lg p-6 bg-opacity-60 bg-[#B7B597] md:p-8">
                    <h2 className="text-2xl font-bold mb-4 text-center text-black uppercase">Candidate Details</h2>
                    <hr />
                    <div className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="block">
                                <label className="block text-sm font-medium text-black">First Name</label>
                                <p className="mt-1 block px-3 py-2 border border-gray-500 rounded-md shadow-sm text-black">{candidate.firstName}</p>
                            </div>
                            <div className="block">
                                <label className="block text-sm font-medium text-black">Last Name</label>
                                <p className="mt-1 block px-3 py-2 border border-gray-500 rounded-md shadow-sm text-black">{candidate.lastName}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="block">
                                <label className="block text-sm font-medium text-black">Email</label>
                                <p className="mt-1 block px-3 py-2 border border-gray-500 rounded-md shadow-sm text-black">{candidate.email}</p>
                            </div>
                            <div className="block">
                                <label className="block text-sm font-medium text-black">Contact</label>
                                <p className="mt-1 block px-3 py-2 border border-gray-500 rounded-md shadow-sm text-black">{candidate.contact}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="block">
                                <label className="block text-sm font-medium text-black">Gender</label>
                                <p className="mt-1 block px-3 py-2 border border-gray-500 rounded-md shadow-sm text-black">{candidate.gender}</p>
                            </div>
                            <div className="block">
                                <label className="block text-sm font-medium text-black">Job Location</label>
                                <p className="mt-1 block px-3 py-2 border border-gray-500 rounded-md shadow-sm text-black">{candidate.job_location}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                            <div className="block">
                                <label className="block text-sm font-medium text-black">Specialization</label>
                                <p className="mt-1 block px-3 py-2 border border-gray-500 rounded-md shadow-sm text-black">{candidate.specialization}</p>
                            </div>
                            <div className="block mb-3">
                                <label className="block text-sm font-medium text-black">Salary Expectation</label>
                                <p className="mt-1 block px-3 py-2 border border-gray-500 rounded-md shadow-sm text-black">{candidate.salaryExpectation}</p>
                            </div>
                        </div>
                        {candidate.cv && (
                            <div className="block mt-3">
                                <label className="block text-sm font-medium text-black">Resume</label>
                                <p className="mt-1 block px-3 py-2 border border-gray-500 rounded-md shadow-sm text-black">
                                    <a href={candidate.cv} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                                        View Resume
                                    </a>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CandidateShow;
