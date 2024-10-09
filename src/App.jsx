import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home'
import Vacancy from './components/Vacancy';
import CandidateForm from './components/CandidateForm';
import CandidateList from './components/CandidateList';
import Logout from './components/Logout';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import EditVacancy from './components/EditVacancy';
import CandidateEdit from './components/CandidateEdit';
import CandidateShow from './components/CandidateShow';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect from root to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Define the /login route */}
        <Route index path="/login" element={<Login />} />

        {/* Define the /register route */}
        <Route path="/register" element={<Register />} />

        {/* Define nested routes under /nav */}
        <Route path="/nav" element={<Navbar />}>
          <Route path="home" element={<Home />} />
          <Route path="add-vacancy" element={<Vacancy />} />
          <Route path="add-candidate" element={<CandidateForm />} />
          <Route path="edit-candidate/:id" element={<CandidateEdit />} />
          <Route path="show-candidate/:id" element={<CandidateShow />} />
          <Route path="view-candidates" element={<CandidateList />} />
          <Route path="edit/:id" element={<EditVacancy />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
