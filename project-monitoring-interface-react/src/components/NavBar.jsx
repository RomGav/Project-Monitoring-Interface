import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base text-blue-600 font-medium">
        <Link to = "/dashboard/projects">Projects</Link>
        <Link  to = "/dashboard/clients">Clients</Link>
        <Link  to = "/dashboard/account-managers">Account Managers</Link>
        <Link  to = "/dashboard/project-managers">Project Managers</Link>
        <Link  to = "/dashboard/register">Register Users</Link>
    </div>
  )
}

export default NavBar
