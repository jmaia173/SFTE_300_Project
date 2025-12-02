import { createContext, useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const { getToken } = useAuth();
  const { user } = useUser();
  
  const [userData, setUserData] = useState(null);
  const [userApplications, setUserApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Always use environment variable for backend URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Debug log (remove in production if needed)
  console.log('VITE_BACKEND_URL =', backendUrl);

  // Fetch user data with Clerk authentication
  const fetchUserData = async () => {
    try {
      const token = await getToken();
      
      if (!token) {
        console.error('No auth token available');
        return;
      }

      const { data } = await axios.get(`${backendUrl}/api/users/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setUserData(data.user);
      } else {
        console.error('Failed to fetch user data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  // Fetch user applications with Clerk authentication
  const fetchUserApplications = async () => {
    try {
      const token = await getToken();
      
      if (!token) {
        console.error('No auth token available');
        return;
      }

      const { data } = await axios.get(`${backendUrl}/api/users/applications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setUserApplications(data.applications);
      } else {
        console.error('Failed to fetch applications:', data.message);
        setUserApplications([]); // Set empty array on failure
      }
    } catch (error) {
      console.error('Error fetching applications:', error.message);
      setUserApplications([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial user data when user is available
  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const value = {
    backendUrl,
    userData,
    userApplications,
    loading,
    fetchUserData,
    fetchUserApplications,
    setUserData,
    setUserApplications,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};