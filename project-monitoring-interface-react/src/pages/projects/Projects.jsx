import { Outlet, Link, useLocation } from 'react-router-dom'

const Projects = () => {
  const location = useLocation();
  const showLayout = location.pathname !== "/dashboard/projects";
  const isRootProjects = location.pathname === "/dashboard/projects";

  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto">
      {showLayout && (
        <nav className="flex justify-center gap-6 text-blue-600 text-sm sm:text-base font-medium">
          <Link
            to="/dashboard/projects/open-projects"
            className="block p-3 bg-white border border-gray-200 rounded-xl shadow hover:shadow-md hover:border-blue-400"
          >
            Active Projects
          </Link>
          <Link
            to="/dashboard/projects/closed-projects"
            className="block p-3 bg-white border border-gray-200 rounded-xl shadow hover:shadow-md hover:border-blue-400"
          >
            Closed Projects
          </Link>
        </nav>
      )}

      {isRootProjects && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/dashboard/projects/open-projects"
            className="block p-6 bg-white border border-gray-200 rounded-xl shadow hover:shadow-md hover:border-blue-400"
          >
            <h3 className="text-lg font-semibold text-blue-600">Active Projects</h3>
            <p className="text-sm text-gray-600 mt-2">View all ongoing projects</p>
          </Link>

          <Link
            to="/dashboard/projects/closed-projects"
            className="block p-6 bg-white border border-gray-200 rounded-xl shadow hover:shadow-md hover:border-blue-400"
          >
            <h3 className="text-lg font-semibold text-blue-600">Closed Projects</h3>
            <p className="text-sm text-gray-600 mt-2">View all completed projects</p>
          </Link>
        </div>
      )}

      {showLayout && (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Projects;
