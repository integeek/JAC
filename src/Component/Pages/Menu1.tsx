import React, { useState } from "react"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

function Menu1() {
  const [selectedDay, setSelectedDay] = useState(0)

  const handlePreviousDay = () => {
    setSelectedDay((prev) => (prev === 0 ? 6 : prev - 1))
  }

  const handleNextDay = () => {
    setSelectedDay((prev) => (prev === 6 ? 0 : prev + 1))
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">{days[selectedDay]} Menu</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePreviousDay}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-300 focus:outline-none"
            >
            </button>
            <button
              onClick={handleNextDay}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-300 focus:outline-none"
            >
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {/* Menu items go here */}
        </div>
      </div>
    </div>
  )
}

export default Menu1
