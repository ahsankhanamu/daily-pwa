// src/components/AuthWrapper.js
import React from "react";
import { gapi } from "gapi-script";

const AuthWrapper = ({ user, setUser, children }) => {
  const handleLogin = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    authInstance.signIn().then((googleUser) => {
      const profile = googleUser.getBasicProfile();
      setUser({
        name: profile.getName(),
        email: profile.getEmail(),
        imageUrl: profile.getImageUrl(),
        token: googleUser.getAuthResponse().access_token,
      });
    });
  };

  const handleLogout = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    authInstance.signOut().then(() => {
      setUser(null);
    });
  };

  return (
    <div>
      {!user ? (
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
          <h3 className="mb-4 text-lg">
            You need to login to access this feature
          </h3>
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Login with Google
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <img
              src={user.imageUrl}
              alt={user.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <span>{user.name}</span>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
      {user && children}
    </div>
  );
};

export default AuthWrapper;
