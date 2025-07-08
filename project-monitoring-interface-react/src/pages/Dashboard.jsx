import { Link } from 'react-router-dom'

const Dashboard = () => {
  const sections = [
    { label: 'Projects', path: '/dashboard/projects' },
    { label: 'Clients', path: '/dashboard/clients' },
    { label: 'Account Managers', path: '/dashboard/account-managers' },
    { label: 'Project Managers', path: '/dashboard/project-managers' },
    { label: 'Register Users', path: '/dashboard/register' },
  ];

  return (
    <div className="w-full max-w-4xl px-4">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center text-gray-800">
        Dashboard
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Link
            key={section.label}
            to={section.path}
            className="block bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 text-center text-blue-600 font-medium"
          >
            {section.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard
