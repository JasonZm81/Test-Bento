import React from 'react';
import ProductForm from './AdminProduct';

const AdminHome = () => {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <ProductForm />
    </div>
  );
};

export default AdminHome; 