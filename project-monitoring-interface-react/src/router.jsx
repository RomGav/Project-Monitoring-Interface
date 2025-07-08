import { createBrowserRouter } from "react-router-dom";
import { authLoader } from "./loaders/authLoader";

//pages
import Login from './components/Login'
import Register from './components/Register'
import NotFound from "./pages/NotFound";
import PublicLayout from "./layouts/PublicLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import Dashboard from "./pages/Dashboard";

import Pms from "./pages/projectManagers/Pms";
import PmNew from './pages/projectManagers/PmNew';
import PmEdit from './pages/projectManagers/PmEdit';
import PmGrid from './pages/projectManagers/PmGrid';
import PmSolo from './pages/projectManagers/PmSolo';

import Acms from "./pages/accountManagers/Acms";
import AcmNew from './pages/accountManagers/AcmNew';
import AcmEdit from './pages/accountManagers/AcmEdit';
import AcmGrid from './pages/accountManagers/acmGrid';
import AcmSolo from './pages/accountManagers/acmSolo';

import Clients from "./pages/clients/Clients";
import ClientNew from './pages/clients/ClientNew';
import ClientEdit from './pages/clients/ClientEdit';
import ClientSolo from './pages/clients/ClientSolo';
import ClientGrid from './pages/clients/ClientGrid';

import Projects from "./pages/projects/Projects";
import ProjectNew from './pages/projects/ProjectNew';
import ProjectEdit from './pages/projects/ProjectEdit';
import OpenProjectGrid from './pages/projects/OpenProjectGrid';
import ProjectSolo from './pages/projects/ProjectSolo';
import ClosedProjectGrid from './pages/projects/ClosedProjectGrid';

const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout />,
        children: [
            {index: true, element: <Login />},
        ]
    },
    {
        path: "/dashboard",
        element: <ProtectedLayout />,
        loader: authLoader,
        children: [
            {index: true, element: <Dashboard />},
            {
                path: "projects",
                element: <Projects />,
                children: [
                    {
                        path: "open-projects",
                        element: <OpenProjectGrid />,
                    },
                    {
                        path: "closed-projects",
                        element: <ClosedProjectGrid />,
                    },
                    {
                        path: "new",
                        element: <ProjectNew />,
                    },
                    {
                        path: ":projectId/edit",
                        element: <ProjectEdit />,
                    },
                    {
                        path: ":projectId",
                        element: <ProjectSolo />,
                    },
                    {
                        path: "*",
                        element: <NotFound />
                    },
                ]
            },
            {
                path: "clients",
                element: <Clients />,
                children: [
                    {index: true, element: <ClientGrid />},
                    {
                        path: "new",
                        element: <ClientNew />,
                    },
                    {
                        path: ":clientId/edit",
                        element: <ClientEdit />,
                    },
                    {
                        path: ":clientId",
                        element: <ClientSolo />,
                    },
                    {
                        path: "*",
                        element: <NotFound />
                    },
                ]
            },
            {
                path: "account-managers",
                element: <Acms />,
                children: [
                    {index: true, element: <AcmGrid />},
                    {
                        path: "new",
                        element: <AcmNew />,
                    },
                    {
                        path: ":accountManagerId/edit",
                        element: <AcmEdit />,
                    },
                    {
                        path: ":accountManagerId",
                        element: <AcmSolo />,
                    },
                    {
                        path: "*",
                        element: <NotFound />
                    },
                ]
            },
            {
                path: "project-managers",
                element: <Pms />,
                children: [
                    {index: true, element: <PmGrid />},
                    {
                        path: "new",
                        element: <PmNew />,
                    },
                    {
                        path: ":projectManagerId/edit",
                        element: <PmEdit />,
                    },
                    {
                        path: ":projectManagerId",
                        element: <PmSolo />,
                    },
                    {
                        path: "*",
                        element: <NotFound />
                    },
                ]
            },
            {
                path:"register",
                element: <Register />
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />
    },
])

export default router;