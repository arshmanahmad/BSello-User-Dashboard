import React from 'react';

const TailwindTest = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Tailwind CSS Test
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Card 1</h3>
            <p className="text-gray-600 mb-4">
              This is a test card to verify Tailwind CSS is working properly.
            </p>
            <button className="btn-primary w-full">
              Primary Button
            </button>
          </div>
          
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Card 2</h3>
            <p className="text-gray-600 mb-4">
              Another test card with different content.
            </p>
            <button className="btn-secondary w-full">
              Secondary Button
            </button>
          </div>
          
          <div className="card">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Card 3</h3>
            <p className="text-gray-600 mb-4">
              Third test card for comprehensive testing.
            </p>
            <input 
              type="text" 
              placeholder="Test input field" 
              className="input-field mb-4"
            />
            <button className="btn-primary w-full">
              Test Button
            </button>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Success!</h2>
          <p className="text-green-700">
            If you can see this styled content, Tailwind CSS is working correctly!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TailwindTest;
