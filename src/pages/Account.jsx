// src/pages/Account.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Account = () => {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Mi Cuenta</h1>
      <p className="mt-4">Bienvenido, {user?.email}</p>
    </div>
  );
};

export default Account;
