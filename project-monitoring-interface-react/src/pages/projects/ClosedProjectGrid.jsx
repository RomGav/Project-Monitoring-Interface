import { useContext } from "react";
import { DataContext } from "../../components/DataContext"
import { useNavigate, Link } from "react-router-dom";

const ClosedProjectGrid = () => {
  const navigate = useNavigate();
  const { projects, loading, error } = useContext(DataContext);

  if (loading) return <p className="text-center text-gray-500">Loading Projects...</p>;
  if (error) return <p className="text-center text-red-600">Error loading Projects: {error.message}</p>;
  if (!projects.length) return <p className="text-center text-red-600">No Projects found.</p>;

  return (
    <div className="space-y-4">
        <div className="flex justify-between items-center">
            <button>
              <Link to ="/dashboard/projects"
                className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300"
              >
                Back
              </Link>
            </button>
            <h2 className="text-lg font-semibold">Closed Projects</h2>
            <button>
              <Link to ="/dashboard/projects/new"
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
              >
                New
              </Link>
            </button>
        </div >

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {projects
            .filter((project) => project.projectStatus === "Closed")
            .map((project) => (
              <div 
                key={project.projectId} 
                onClick={() => navigate(`/dashboard/projects/${project.projectId}`)} 
                className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg"
              >
                <h3 className="font-bold text-lg mb-2">Project: {project.name}</h3>
                <p>Client: {project.client.name}</p>
                <p>Movement: {project.projectMovement}</p>
                <p>Account Manager: {project.handlingAccountManager.name}</p>
                <p>Project Manager: {project.handlingProjectManager.name}</p>
              </div>
            )
          )
        }
      </div>
    </div>
  );
};

export default ClosedProjectGrid;