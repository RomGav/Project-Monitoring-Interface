import { Outlet, useLocation } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Logout from '../components/Logout'
import Title from '../components/Title';

const ProtectedLayout = () => {
  const location = useLocation();
  const showLayout = location.pathname !== "/dashboard";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {showLayout && (
        <header className="bg-white shadow p-4">
          <div className="mb-4">
            <Title />
          </div>
          <NavBar />
        </header>
      )}

      <main className="flex-1 p-4 pb-24 flex justify-center items-center">
        <Outlet />
      </main>

      <footer className="fixed bottom-0 left-0 w-full bg-white shadow p-4 text-center">
        <Logout />
      </footer>
    </div>
  );
};

export default ProtectedLayout
