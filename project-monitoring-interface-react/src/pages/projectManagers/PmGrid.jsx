import { useContext } from "react";
import { DataContext } from "../../components/DataContext"
import { useNavigate, Link } from "react-router-dom";

const PmGrid = () => {
  const { pms, loading, error } = useContext(DataContext);
  const navigate = useNavigate()

  if (loading) return <p className="text-center text-gray-500">Loading Project Managers...</p>;
  if (error) return <p className="text-center text-red-600">Error loading Project Managers: {error.message}</p>;
  if (!pms.length) return <p className="text-center text-red-600">No Project Managers found.</p>;

  return (
    <div className="space-y-4">
        <div className="flex justify-between items-center">
            <button>
              <Link to ="/dashboard"
                className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300"
              >
                Back
              </Link>
            </button>
            <h2 className="text-lg font-semibold">Project Managers</h2>
            <button>
              <Link to ="/dashboard/project-managers/new"
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
              >
                New
              </Link>
            </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {pms.map((pm) => (
            <div 
              key={pm.projectManagerId} 
              onClick={() => navigate(`/dashboard/project-managers/${pm.projectManagerId}`)} 
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg"
            >
              <h3 className="font-bold text-lg mb-2">Project Manager {pm.name}</h3>
              <p>Rank: {pm.rank}</p>
              <p>Current Projects: {pm.projectsHandling}</p>
              <p>Email: {pm.email}</p>
              <p>Phone Number: {pm.phoneNumber}</p>
            </div>
          ))}
        </div>
    </div>
  );
};

export default PmGrid;