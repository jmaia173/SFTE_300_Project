import { createContext, useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();
  
  const [userData, setUserData] = useState(null);
  const [userApplications, setUserApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Always use environment variable for backend URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch user data with Clerk authentication
  const fetchUserData = async () => {
    try {
      const token = await getToken();
      
      if (!token) {
        console.error('No auth token available');
        return;
      }

      console.log('Fetching user data from:', `${backendUrl}/api/users/user`);

      const { data } = await axios.get(`${backendUrl}/api/users/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setUserData(data.user);
        console.log('User data fetched successfully');
      } else {
        console.error('Failed to fetch user data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    } finally {
      setIsLoading(false);
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

      console.log('Fetching applications from:', `${backendUrl}/api/users/applications`);

      const { data } = await axios.get(`${backendUrl}/api/users/applications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setUserApplications(data.applications);
        console.log('Applications fetched successfully:', data.applications.length);
      } else {
        console.error('Failed to fetch applications:', data.message);
        setUserApplications([]);
      }
    } catch (error) {
      console.error('Error fetching applications:', error.message);
      setUserApplications([]);
    }
  };

  // THIS IS THE KEY FIX: Automatically fetch user data when user is loaded
  useEffect(() => {
    if (isLoaded && user) {
      console.log('User is loaded, fetching data...');
      fetchUserData();
    }
  }, [isLoaded, user]); // Only run when user loads

  const value = {
    backendUrl,
    userData,
    userApplications,
    isLoading,
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