import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Profile = () => {
    const { token, user, setUser, logout } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    
    const [detailsMessage, setDetailsMessage] = useState(null);
    const [passwordMessage, setPasswordMessage] = useState(null);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);
    const [isLoadingPassword, setIsLoadingPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            if(user.photo){
                const apiUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
                setPreview(`${apiUrl}/${user.photo}`);
            }
        }
    }, [user]);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleDetailsUpdate = async (e) => {
        e.preventDefault();
        setIsLoadingDetails(true);
        setDetailsMessage(null);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        if(photo){
            console.log("Appending photo to FormData:", photo);
            formData.append('photo', photo);
        } else {
            console.log("No photo selected");
        }

        try {
            console.log("Sending update request...");
            const apiUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
            const res = await fetch(`${apiUrl}/api/auth/updatedetails`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await res.json();

            if (res.ok) {
                setUser(data.data);
                setDetailsMessage({ type: 'success', text: 'Details updated successfully' });
            } else {
                setDetailsMessage({ type: 'error', text: data.error || 'Update failed' });
            }
        } catch (err) {
            setDetailsMessage({ type: 'error', text: 'Server error' });
        } finally {
            setIsLoadingDetails(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmNewPassword) {
            setPasswordMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }

        setIsLoadingPassword(true);
        setPasswordMessage(null);

        try {
            const apiUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
            const res = await fetch(`${apiUrl}/api/auth/updatepassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ currentPassword, newPassword })
            });

            const data = await res.json();

            if (res.ok) {
                setPasswordMessage({ type: 'success', text: 'Password updated successfully' });
                setCurrentPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
            } else {
                setPasswordMessage({ type: 'error', text: data.error || 'Update failed' });
            }
        } catch (err) {
            setPasswordMessage({ type: 'error', text: 'Server error' });
        } finally {
            setIsLoadingPassword(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-10">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">User Profile</h2>
                <button 
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Update Details Form */}
                <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-xl bg-white/50 dark:bg-slate-800/50">
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6">Update Details</h3>
                    
                    {detailsMessage && (
                        <div className={`p-3 rounded-lg mb-4 text-sm ${
                            detailsMessage.type === 'success' 
                                ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' 
                                : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                        }`}>
                            {detailsMessage.text}
                        </div>
                    )}

                    <form onSubmit={handleDetailsUpdate} className="space-y-6">
                        <div className="flex flex-col items-center gap-4 mb-6">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-lg relative bg-slate-200 dark:bg-slate-700">
                                {preview ? (
                                    <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <label className="cursor-pointer bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                Change Photo
                                <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoadingDetails}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition-colors shadow-lg shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoadingDetails ? 'Updating...' : 'Update Details'}
                        </button>
                    </form>
                </div>

                {/* Update Password Form */}
                <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-xl bg-white/50 dark:bg-slate-800/50">
                    <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-6">Change Password</h3>

                    {passwordMessage && (
                        <div className={`p-3 rounded-lg mb-4 text-sm ${
                            passwordMessage.type === 'success' 
                                ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' 
                                : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                        }`}>
                            {passwordMessage.text}
                        </div>
                    )}

                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Current Password</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                required
                                minLength="6"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                required
                                minLength="6"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isLoadingPassword}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-xl transition-colors shadow-lg shadow-purple-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoadingPassword ? 'Updating...' : 'Change Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
