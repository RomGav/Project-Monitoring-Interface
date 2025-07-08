import {useState} from "react";

const Register = () => {
    
    // tailwind
    const inputClass = "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200";
    const labelClass = "block font-semibold text-gray-700 mb-1";
    const selectClass = inputClass;
    const buttonClass = "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700";

    const [form, setForm] = useState({
        name: "",
        role: "User",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try{
            const response = await fetch (import.meta.env.VITE_REGISTER_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(form),
            });

            const record = await response.json()
            
            if(response.ok){
                console.log(record)
                alert("User has been registered")
            } else {
                console.error("Registration failed:", record.error)
                alert(record.error)
            }
            console.log(record)
        }catch(error){
            console.error(error)
        }
    }
  return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className={labelClass}>Name</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} className={inputClass} />
                </div>

                <div>
                    <label className={labelClass}>Role</label>
                    <select name="role" value={form.role} onChange={handleChange} className={selectClass} >
                        <option value="User">User</option>
                        <option value="Manager">Manager</option>
                        <option value="Developer">Developer</option>
                    </select>
                </div>

                <div>
                    <label className={labelClass}>Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass} />
                </div>

                <div>
                    <label className={labelClass}>Password</label>
                    <input type="password"  name="password" value={form.password} onChange={handleChange} className={inputClass} />
                </div>

                <div className="pt-4">
                    <button className={buttonClass}>
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
