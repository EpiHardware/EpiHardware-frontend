import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from "../compenents/Layout";
import LoadingSpinner from "../compenents/common/LoadingSpinner";


interface UserDetails {
    login: string;
    email: string;
    firstname: string;
    lastname: string;
}

const ProfilePage: React.FC = () => {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [formData, setFormData] = useState<UserDetails>({
        login: '',
        email: '',
        firstname: '',
        lastname: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const headers = { Authorization: `Bearer ${token}` };
            axios.get<UserDetails>('https://localhost:8000/api/users', { headers })
                .then(response => {
                    setUserDetails(response.data);
                    setFormData(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching user details:', error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        axios.patch('https://localhost:8000/api/users', formData, { headers })
            .then(response => {
                setUserDetails(formData);
                setEditMode(false);
                console.log('Update successful:', response.data);
            })
            .catch(error => {
                console.error('Failed to update user:', error);
            });
    };

    if (loading) return <LoadingSpinner />;

    return (
        <Layout>
            <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center mb-6">User Profile</h2>
                {!editMode ? (
                    <div className="text-center">
                        <p className="text-lg mb-2"><strong>Login:</strong> {userDetails?.login}</p>
                        <p className="text-lg mb-2"><strong>Email:</strong> {userDetails?.email}</p>
                        <p className="text-lg mb-2"><strong>First Name:</strong> {userDetails?.firstname}</p>
                        <p className="text-lg mb-2"><strong>Last Name:</strong> {userDetails?.lastname}</p>
                        <button onClick={handleEditToggle} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                            Edit Profile
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col items-center">
                            <label className="block text-lg font-medium text-gray-700">
                                Login:
                                <input type="text" name="login" value={formData.login} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </label>
                            <label className="block text-lg font-medium text-gray-700">
                                Email:
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </label>
                            <label className="block text-lg font-medium text-gray-700">
                                First Name:
                                <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </label>
                            <label className="block text-lg font-medium text-gray-700">
                                Last Name:
                                <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </label>
                        </div>
                        <div className="flex justify-center space-x-4 mt-4">
                            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                                Save Changes
                            </button>
                            <button onClick={handleEditToggle} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </Layout>
    );
};

export default ProfilePage;
