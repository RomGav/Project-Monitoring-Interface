import { useContext } from "react";
import { DataContext } from "../../components/DataContext"
import { useNavigate, Link } from "react-router-dom";

const ClientGrid = () => {
  const navigate = useNavigate();
  const { clients, loading, error } = useContext(DataContext);

  if (loading) return <p className="text-center text-gray-500">Loading Clients...</p>;
  if (error) return <p className="text-center text-red-600">Error loading Clients: {error.message}</p>;
  if (!clients.length) return <p className="text-center text-red-600">No Clients found.</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <button>
          <Link
            to="/dashboard"
            className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300"
          >
            Back
          </Link>
        </button>
        <h2 className="text-lg font-semibold">Clients</h2>
        <button>
          <Link
            to="/dashboard/clients/new"
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
          >
            New
          </Link>
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {clients.map((client) => (
          <div
            key={client.clientId}
            onClick={() => navigate(`/dashboard/clients/${client.clientId}`)}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg"
          >
            <h3 className="font-bold text-lg mb-2">Client: {client.name}</h3>
            <p>Industry: {client.industry}</p>
            <p>Active Client: {client.activeClient ? "Yes" : "No"}</p>
            <p>Account Manager: {client.handlingAccountManager.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientGrid;