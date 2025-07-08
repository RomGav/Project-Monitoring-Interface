import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../components/DataContext";

const ClientSolo = () => {
  const { clientId } = useParams();
  const { clients, projects, loading, error } = useContext(DataContext);
   const navigate = useNavigate()

  if (loading) return <p className="text-center text-gray-500">Loading Client...</p>;
  if (error) return <p className="text-center text-red-600">Error loading Client: {error.message}</p>;

  const client = clients.find((client) => String(client.clientId) === clientId);
  if (!client) {
    return (
      <div>
        <button onClick={() => navigate(-1)}>Back</button>
        <p>Client not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow border space-y-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300"
        >
          Back
        </button>
        <h2 className="text-xl font-semibold text-gray-800">{client.name}</h2>
        <button
          onClick={() => navigate(`/dashboard/clients/${clientId}/edit`)}
          className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700">
        <p><span className="font-medium">Client ID:</span> {client.clientId}</p>
        <p><span className="font-medium">Priority Tier:</span> {client.priorityTier}</p>
        <p><span className="font-medium">Industry:</span> {client.industry}</p>
        <p><span className="font-medium">Active Client:</span> {client.activeClient ? "Yes" : "No"}</p>
        <p><span className="font-medium">Ongoing Projects:</span> {client.projectsOpen}</p>
        <p><span className="font-medium">Closed Projects:</span> {client.projectsClosed}</p>
        <p><span className="font-medium">Contact Person:</span> {client.contactPerson}</p>
        <p><span className="font-medium">Email:</span> {client.email}</p>
        <p><span className="font-medium">Phone Number:</span> {client.phoneNumber}</p>
        <p><span className="font-medium">Account Manager:</span> {client.handlingAccountManager.name}</p>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Ongoing Project List:</h3>
          {projects.filter(
            (project) => 
              project.client.name === client.name &&
              project.projectStatus === "Open"
            ).length > 0 ? (
              <div className="space-y-4">
                {projects.filter(
                  (project) => 
                    project.client.name === client.name &&
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
        ):(
          <p className="text-sm text-gray-500">No ongoing projects found.</p>
        )}
      </div>
    </div>
  );
};

export default ClientSolo;