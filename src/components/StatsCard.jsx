import React from "react";

const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="text-gray-500">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
};

export default StatsCard;
