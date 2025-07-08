import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../components/DataContext";

const PmSolo = () => {
  const { projectManagerId } = useParams();
  const { projects, pms, loading, error } = useContext(DataContext);
  const navigate = useNavigate()

  if (loading) return <p className="text-center text-gray-500">Loading Project Manager...</p>;
  if (error) return <p className="text-center text-red-600">Error loading Project Manager: {error.message}</p>;

  const pm = pms.find((pm) => String(pm.projectManagerId) === projectManagerId);
  if (!pm) return <p className="text-center text-red-600">Project Manager not found.</p>

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow border space-y-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300"
        >
          Back
        </button>
        <h2 className="text-xl font-semibold text-gray-800">Project Manager {pm.name}</h2>
        <button
          onClick={() => navigate(`/dashboard/project-managers/${projectManagerId}/edit`)}
          className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700">
        <p><span className="font-medium">Project Manager ID:</span> {pm.projectManagerId}</p>
        <p><span className="font-medium">Rank:</span> {pm.rank}</p>
        <p><span className="font-medium">Current Projects:</span> {pm.projectsHandling}</p>
        <p><span className="font-medium">Email:</span> {pm.email}</p>
        <p><span className="font-medium">Phone Number:</span> {pm.phoneNumber}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Project List:</h3>
        {projects.filter(
          (project) =>
            project.handlingProjectManager.name === pm.name &&
            project.projectStatus === "Open"
        ).length > 0 ? (
          <div className="space-y-4">
            {projects
              .filter(
                (project) =>
                  project.handlingProjectManager.name === pm.name &&
                  project.projectStatus === "Open"
              )
              .map((project) => (
                <div key={project.projectId} className="border p-4 rounded shadow-sm bg-gray-50">
                  <p className="font-medium text-gray-800">{project.name}</p>
                  <p className="text-sm text-gray-600">Client: {project.client.name}</p>
                  <p className="text-sm text-gray-600">Movement: {project.projectMovement}</p>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No active projects found.</p>
        )}
      </div>
    </div>
  );
};

export default PmSolo;