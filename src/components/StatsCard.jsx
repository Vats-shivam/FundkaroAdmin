const StatsCard = ({ title, value, icon, trend, trendValue }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value?.toLocaleString() || 0}</p>
          {trend && trendValue && (
            <div className={`flex items-center mt-2 text-sm ${trend === "up" ? "text-green-600" : "text-red-600"}`}>
              <span className={`mr-1 ${trend === "up" ? "↗" : "↘"}`}>{trend === "up" ? "↗" : "↘"}</span>
              <span>{trendValue}%</span>
            </div>
          )}
        </div>
        {icon && <div className="text-blue-500 text-3xl">{icon}</div>}
      </div>
    </div>
  )
}

export default StatsCard