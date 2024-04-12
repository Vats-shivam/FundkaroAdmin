import React from 'react'

function BlockedModal({closeModal}) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-100">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p>You are not authorized to view this content.</p>
        <button onClick={closeModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Close</button>
      </div>
    </div>
  );
}

export default BlockedModal