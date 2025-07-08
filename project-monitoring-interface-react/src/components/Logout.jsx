import { useNavigate } from "react-router-dom";

const Logout = () => {

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(import.meta.env.VITE_LOGOUT_API, {
        method: "POST",
        credentials: "include",
      });

      const record = await response.json();

      if (response.ok) {
        console.log(record)
        navigate("/");
      } else {
        console.error("Logout failed", record.error);
        alert(record.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
   <div>
     <button
      type="submit" 
       onClick={handleSubmit}
       className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
