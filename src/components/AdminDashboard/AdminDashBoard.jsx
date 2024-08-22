import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import Layout from '../Layout';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const applicationsCollection = collection(db, 'applications');
        const applicationsSnapshot = await getDocs(applicationsCollection);
        const applicationsList = applicationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setApplications(applicationsList);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  const handleApprove = async (id) => {
    try {
      const applicationDoc = doc(db, 'applications', id);
      await updateDoc(applicationDoc, { status: 'APPROVED' });
      // Refresh the list or provide feedback
      const updatedApplications = applications.map(app =>
        app.id === id ? { ...app, status: 'APPROVED' } : app
      );
      setApplications(updatedApplications);
    } catch (error) {
      console.error('Error approving application:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      const applicationDoc = doc(db, 'applications', id);
      await updateDoc(applicationDoc, { status: 'REJECTED' });
      // Refresh the list or provide feedback
      const updatedApplications = applications.map(app =>
        app.id === id ? { ...app, status: 'REJECTED' } : app
      );
      setApplications(updatedApplications);
    } catch (error) {
      console.error('Error rejecting application:', error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-center ">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {applications.map(app => (
            <div key={app.id} className="bg-white rounded shadow-md p-4">
              <h2 className="text-lg font-bold mb-2">{app.title}</h2>
              <p className="text-gray-600 mb-2">User Name: {app.userName}</p>
              <p className="text-gray-600 mb-2">Status: {app.status}</p>
              <div className="flex justify-end">
                <button
                  onClick={() => handleApprove(app.id)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(app.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;