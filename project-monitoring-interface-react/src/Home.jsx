import Login from './components/Login'
import Register from './components/Register'
import Title from './components/Title';
import Logout from './components/Logout';

import PmNew from './pages/projectManagers/PmNew';
import PmEdit from './pages/projectManagers/PmEdit';
import PmGrid from './pages/projectManagers/PmGrid';
import PmSolo from './pages/projectManagers/PmSolo';

import AcmNew from './pages/accountManagers/AcmNew';
import AcmEdit from './pages/accountManagers/AcmEdit';
import AcmGrid from './pages/accountManagers/acmGrid';
import AcmSolo from './pages/accountManagers/acmSolo';

import ClientNew from './pages/clients/ClientNew';
import ClientEdit from './pages/clients/ClientEdit';
import ClientSolo from './pages/clients/ClientSolo';
import ClientGrid from './pages/clients/ClientGrid';

import ProjectNew from './pages/projects/ProjectNew';
import ProjectEdit from './pages/projects/ProjectEdit';
import OpenProjectGrid from './pages/projects/OpenProjectGrid';
import ProjectSolo from './pages/projects/ProjectSolo';

import ClosedProjectGrid from './pages/projects/ClosedProjectGrid';



const Home = () => {
  return (
    <div className='bg bg-gray-300 h-[100vh] flex items-center justify-center'>
      <div className='bg bg-gray-100 rounded-lg h-[90vh] w-[90vw] object-contain overflow-y-auto'>
        <Title />
        <main>
          <Login />
          <Logout />
          <Register />
          <hr />
          <h1>PM</h1>
          <PmNew />
          <PmEdit />
          <PmGrid />
          <PmSolo />
          <hr />
          <h1>ACM</h1>
          <AcmNew />
          <AcmEdit />
          <AcmGrid />
          <AcmSolo />
          <hr />
          <h1>Client</h1>
          <ClientNew />
          <ClientEdit />
          <ClientGrid />
          <ClientSolo />
          <hr />
          <h1>Open Project</h1>
          <ProjectNew />
          <ProjectEdit />
          <OpenProjectGrid />
          <ProjectSolo />
          <hr />
          <h1>Closed Project</h1>
          <ClosedProjectGrid />
        </main>
      </div>
    </div>
  )
}

export default Home



// const App = () => {
//   return (
//     <div className='bg bg-orange-400 h-[100vh] flex items-center justify-center'>
//       <div className='bg bg-gray-100 rounded-lg h-[90vh] w-[90vw] object-contain overflow-y-auto'>
//         <Header />
//         <main>
//           <SearchResult />
//           <Outlet />
//         </main>
//       </div>

//     </div>
//   )
// }

// export default App
