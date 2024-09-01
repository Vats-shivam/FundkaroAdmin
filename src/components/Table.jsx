import React from "react";

const Table = ({ title }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-gray-500 mb-4">{title}</h3>
      <table className="min-w-full bg-white text-center">
        <thead>
          <tr>
            <th className="py-2">Email</th>
            <th className="py-2">Category</th>
            <th className="py-2">Status</th>
            <th className="py-2">View</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2">001</td>
            <td className="py-2">$1,000</td>
            <td className="py-2">Approved</td>
          </tr>
          <tr>
            <td className="py-2">002</td>
            <td className="py-2">$2,500</td>
            <td className="py-2">Pending</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;