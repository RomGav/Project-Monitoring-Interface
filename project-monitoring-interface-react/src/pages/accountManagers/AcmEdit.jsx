import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AcmEdit = () => {
    const {accountManagerId} = useParams();
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
        rank: "",
        accountsHandling: "",
        email: "",
        phoneNumber: "",
        isDeleted: false,
    });


    useEffect(() => {
        const fetchAcms = async () => {
            try{
                const response = await fetch(`${import.meta.env.VITE_ACMS_API}/${accountManagerId}`, {
                    credentials: "include",
                });
                
                const data = await response.json();
                setForm(data)
            } catch (error) {
                console.error("Failed to fetch Account Manager:", error);
            };
        };
        fetchAcms();
    }, [accountManagerId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "isDeleted") {
            setForm({ ...form, isDeleted: value === "true" });
        } else {
            setForm({ ...form, [name]: value });
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${import.meta.env.VITE_ACMS_API}/${accountManagerId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(form),
            });

            const record = await res.json();
            console.log("Account Manager updated:", record);
            navigate(`/dashboard/account-managers/${record.accountManagerId}`);
        } catch (error) {
            console.error("Error updating Account Manager:", error);
        };
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        const confirmDelete = window.confirm("Are you sure you want to delete this Account Manager?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_ACMS_API}/${accountManagerId}`, {
                method: "DELETE",
                credentials: "include",
            });

            const result = await res.json();

            if (res.ok) {
                console.log("Account Manager deleted:", result);
                navigate("/dashboard/account-managers");
            } else {
                console.error("Failed to delete Account Manager:", result.error);
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            console.error("Error deleting Account Manager:", error);
            alert("Something went wrong while deleting the Account Manager.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <button className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300" onClick={() => navigate(-1)}>Back</button>
                <h2 className="text-2xl font-bold">Edit Account Manager</h2>
                <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-700" onClick={handleDelete}>Delete</button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={formGroup}>
                    <label className={labelClass}>Project Manager ID:</label>
                        <input 
                            type="number"
                            name='accountManagerId'
                            value={form.accountManagerId} 
                            readOnly
                            className={inputClass}
                        />
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Name:</label>
                    <input 
                        type="text" 
                        name='name' 
                        value={form.name} 
                        onChange={handleChange}
                        className={inputClass}/>
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
                    <label className={labelClass}>Active Clients:</label>
                    <input 
                        type="number"
                        name='accountsHandling'
                        value={form.accountsHandling} 
                        readOnly
                        className={inputClass}
                    />
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Email:</label>
                    <input 
                        type="email" 
                        name='email' 
                        value={form.email} 
                        onChange={handleChange}
                        className={inputClass}
                    />
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Phone Number:</label>
                    <input 
                        type="text" 
                        name='phoneNumber' 
                        value={form.phoneNumber} 
                        onChange={handleChange}
                        className={inputClass}
                    />
                </div>
                <div className="md:col-span-2 flex justify-end">
                    <button className={buttonClass}>Save Changes</button>
                </div>
            </form>
        </div>
    )
};

export default AcmEdit
