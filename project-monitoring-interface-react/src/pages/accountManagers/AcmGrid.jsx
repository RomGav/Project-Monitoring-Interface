import { useContext } from "react";
import { DataContext } from "../../components/DataContext";
import { useNavigate, Link } from "react-router-dom";

const AcmGrid = () => {
  const navigate = useNavigate()
  const { acms, loading, error } = useContext(DataContext);

  if (loading) return <p className="text-center text-gray-500">Loading Account Managers...</p>;
  if (error) return <p className="text-center text-red-600">Error loading Account Managers: {error.message}</p>;
  if (!acms.length) return <p className="text-center text-red-600">No Account Managers found.</p>;

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
        <h2 className="text-lg font-semibold">Account Managers</h2>
        <button>
          <Link
            to="/dashboard/account-managers/new"
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
          >
            New
          </Link>
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {acms.map((acm) => (
          <div
            key={acm.accountManagerId}
            onClick={() => navigate(`/dashboard/account-managers/${acm.accountManagerId}`)}
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg"
          >
            <h3 className="font-bold text-lg mb-2">Account Manager {acm.name}</h3>
            <p>Rank: {acm.rank}</p>
            <p>Active Clients: {acm.accountsHandling}</p>
            <p>Email: {acm.email}</p>
            <p>Phone Number: {acm.phoneNumber}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcmGrid;