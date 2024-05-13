import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);  // Ensure this is true initially

    useEffect(() => {
        axios.get('/user/getuser')
            .then(({ data }) => {
                if (data.newuser && data.newuser.isActive === true) {
                    setUser(data.newuser);
                } else {
                    setError('User not found');
                    setUser(null);  // Ensure user is set to null if not active or found
                }
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data');
                setUser(null);  // Ensure user is set to null on error
            })
            .finally(() => {
                setIsLoading(false);  // Set loading to false after fetching
            });
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, isLoading, error, updateUser: setUser }}>
            {children}
        </UserContext.Provider>
    );
};
