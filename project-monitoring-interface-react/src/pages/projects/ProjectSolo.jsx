import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../components/DataContext";

const ProjectSolo = () => {
  const { projectId } = useParams();
  const { projects, loading, error } = useContext(DataContext);
  const navigate = useNavigate()
  
  if (loading) return <p className="text-center text-gray-500">Loading Project...</p>;
  if (error) return <p className="text-center text-red-600">Error loading Project: {error.message}</p>;

  const project = projects.find((project) => String(project.projectId) === projectId);
  if (!project) return <p className="text-center text-red-600">No Projects found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow border space-y-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300"
        >
          Back
        </button>
        <h2 className="text-xl font-semibold text-gray-800">{project.name}</h2>
        <button
          onClick={() => navigate(`/dashboard/projects/${projectId}/edit`)}
          className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700">
        <p><span className="font-medium">Project ID:</span> {project.projectId}</p>
        <p><span className="font-medium">Client:</span> {project.client.name}</p>
        <p><span className="font-medium">Status:</span> {project.projectStatus}</p>
        <p><span className="font-medium">Type:</span> {project.type}</p>
        <p className="sm:col-span-2"><span className="font-medium">Description:</span> {project.description}</p>
        <p><span className="font-medium">Account Manager:</span> {project.handlingAccountManager.name}</p>
        <p><span className="font-medium">Project Manager:</span> {project.handlingProjectManager.name}</p>
        <p className="sm:col-span-2">
          <span className="font-medium">Assets URL:</span>{" "}
          <a href={project.assetsURL} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
            {project.assetsURL}
          </a>
        </p>
        <p><span className="font-medium">Movement:</span> {project.projectMovement}</p>
        <p><span className="font-medium">Price:</span> ${project.price}</p>
        <p><span className="font-medium">Budget Allocated:</span> ${project.budgetAllocated}</p>
        <p><span className="font-medium">Budget Used:</span> ${project.budgetUsed}</p>
        <p><span className="font-medium">Payment Status:</span> {project.paymentStatus}</p>
      </div>
    </div>
  );
};

export default ProjectSolo;