import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AcmNew = () => {
    const navigate = useNavigate();
    
    //tailwind
    const formGroup = "mb-4";
    const labelClass = "block font-semibold text-gray-700 mb-1";
    const inputClass = "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200";
    const selectClass = inputClass;
    const buttonClass = "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700";

    const [form, setForm] = useState({
        accountManagerId: "",
        name: "",
        rank: "Junior",
        email: "",
        phoneNumber: "",
    });

    const handleChange = (e) => {
        try{
            setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        } catch (error) {
            console.error("Error handling form change:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(import.meta.env.VITE_ACMS_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(form),
            });

            const record = await response.json();
            console.log(record);
            if (record?.accountManagerId) {
                    navigate(`/dashboard/account-managers/${record.accountManagerId}`);
                    window.location.reload();
            } else {alert("Failed to create the Account Manager, please check inputs and try again")}
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <button className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300" onClick={() => navigate(-1)}>Back</button>
                <h2 className="text-2xl font-bold">New Account Manager:</h2>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={formGroup}>
                    <label className={labelClass}>Account Manager ID:</label>
                    <input type="number" name='accountManagerId' value={form.accountManagerId} onChange={handleChange} className={inputClass}/>
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Account Manager Name:</label>
                    <input type="text" name='name' value={form.name} onChange={handleChange} className={inputClass}/>
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Rank:</label>
                    <select name="rank" value={form.rank} onChange={handleChange} className={selectClass}>
                        <option value="Junior">Junior</option>
                        <option value="Senior">Senior</option>
                        <option value="Department Head">Department Head</option>
                    </select>
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Email:</label>
                    <input type="text" name="email" value={form.email} onChange={handleChange} className={inputClass} />
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Phone Number:</label>
                    <input type="text" name='phoneNumber' value={form.phoneNumber} onChange={handleChange} className={inputClass} />
                </div>
                <div className="md:col-span-2 flex justify-end">
                    <button className={buttonClass}>Create New Account Manager</button>
                </div>
            </form>
        </div>
    );
};

export default AcmNew;