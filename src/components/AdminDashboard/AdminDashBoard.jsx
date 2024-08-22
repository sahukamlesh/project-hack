import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

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
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {applications.map(app => (
          <li key={app.id}>
            <p>Project ID: {app.projectId}</p>
            <p>User ID: {app.userId}</p>
            <p>Status: {app.status}</p>
            <button onClick={() => handleApprove(app.id)}>Approve</button>
            <button onClick={() => handleReject(app.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
