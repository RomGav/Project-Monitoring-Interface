import { Outlet } from "react-router-dom";

const Clients = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <Outlet />
    </div>
  )
}

export default Clients
