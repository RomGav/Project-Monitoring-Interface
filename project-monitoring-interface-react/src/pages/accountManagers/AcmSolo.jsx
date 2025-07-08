import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../components/DataContext";

const AcmSolo = () => {
  const { accountManagerId } = useParams();
  const { clients, acms, loading, error } = useContext(DataContext);
  const navigate = useNavigate();

  if (loading) return <p className="text-center text-gray-500">Loading Account Manager...</p>;
  if (error) return <p className="text-center text-red-600">Error loading Account Manager: {error.message}</p>;

  const acm = acms.find((acm) => String(acm.accountManagerId) === accountManagerId);
  if (!acm) return <p className="text-center text-red-600">Account Manager not found.</p>;

  const activeClients = clients.filter(
    (client) =>
      client.handlingAccountManager.name === acm.name &&
      client.activeClient === true
  );

  const inactiveClients = clients.filter(
    (client) =>
      client.handlingAccountManager.name === acm.name &&
      client.activeClient === false
  );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow border space-y-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300"
        >
          Back
        </button>
        <h2 className="text-xl font-semibold text-gray-800">Account Manager {acm.name}</h2>
        <button
          onClick={() => navigate(`/dashboard/account-managers/${accountManagerId}/edit`)}
          className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700">
        <p><span className="font-medium">Account Manager ID:</span> {acm.accountManagerId}</p>
        <p><span className="font-medium">Rank:</span> {acm.rank}</p>
        <p><span className="font-medium">Active Clients:</span> {acm.accountsHandling}</p>
        <p><span className="font-medium">Email:</span> {acm.email}</p>
        <p><span className="font-medium">Phone Number:</span> {acm.phoneNumber}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Active Clients:</h3>
        {activeClients.length > 0 ? (
          <div className="space-y-4">
            {activeClients.map((client) => (
              <div key={client.clientId} className="border p-4 rounded shadow-sm bg-gray-50">
                <p className="font-medium text-gray-800">{client.name}</p>
                <p className="text-sm text-gray-600">Industry: {client.industry}</p>
                <p className="text-sm text-gray-600">Active Client: Yes</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No active clients found.</p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Inactive Clients:</h3>
        {inactiveClients.length > 0 ? (
          <div className="space-y-4">
            {inactiveClients.map((client) => (
              <div key={client.clientId} className="border p-4 rounded shadow-sm bg-gray-50">
                <p className="font-medium text-gray-800">{client.name}</p>
                <p className="text-sm text-gray-600">Industry: {client.industry}</p>
                <p className="text-sm text-gray-600">Active Client: No</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No inactive clients found.</p>
        )}
      </div>
    </div>
  );
};

export default AcmSolo;