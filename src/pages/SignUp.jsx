import React from 'react';
import SignUpForm from '../components/auth/SignUpForm';

const SignUp = () => {
  const handleSignUp = (formData) => {
   
    console.log('SignUp Form Submitted:', formData);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
  
        <SignUpForm onSignUp={handleSignUp} />
      </div>
    </div>
  );
};

export default SignUp;
