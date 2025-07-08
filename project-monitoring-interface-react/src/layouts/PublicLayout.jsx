import Title from '../components/Title';
import Login from '../components/Login';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-8">
        <Title />
        <Login />
      </div>
    </div>
  )
}

export default PublicLayout
