import { useState, useContext } from "react";
import { DataContext } from "../../components/DataContext";
import { useNavigate } from "react-router-dom";

const ClientNew = () => {
    const navigate = useNavigate();
    const { acms } = useContext(DataContext);

    //tailwind
    const formGroup = "mb-4";
    const labelClass = "block font-semibold text-gray-700 mb-1";
    const inputClass = "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200";
    const selectClass = inputClass;
    const buttonClass = "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700";


    const [form, setForm] = useState({
        clientId: "",
        name: "",
        priorityTier: "1",
        industry: "",
        contactPerson: "",
        email: "",
        phoneNumber: "",
        handlingAccountManager: "",
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
            const response = await fetch(import.meta.env.VITE_CLIENTS_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(form),
            });

            const record = await response.json();
            console.log(record);
            if (record?.clientId) {
                    navigate(`/dashboard/clients/${record.clientId}`);
                    window.location.reload();
            } else {alert("Failed to create the Client, please check inputs and try again")}
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <button className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300" onClick={() => navigate(-1)}>Back</button>
                <h2 className="text-2xl font-bold">New Client:</h2>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={formGroup}>
                    <label className={labelClass}>Client ID:</label>
                    <input type="number" name='clientId' value={form.clientId} onChange={handleChange} className={inputClass} />
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Client Name:</label>
                    <input type="text" name='name' value={form.name} onChange={handleChange} className={inputClass} />
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Priority Tier:</label>
                    <select name="priorityTier" value={form.priorityTier} onChange={handleChange} className={selectClass}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Industry:</label>
                    <input type="text" name="industry" value={form.industry} onChange={handleChange} className={inputClass} />
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Contact Person:</label>
                    <input type="text" name='contactPerson' value={form.contactPerson} onChange={handleChange} className={inputClass} />
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Email:</label>
                    <input type="text" name='email' value={form.email} onChange={handleChange} className={inputClass} />
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Phone Number:</label>
                    <input type="text" name='phoneNumber' value={form.phoneNumber} onChange={handleChange} className={inputClass} />
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Account Manager:</label>
                    <select name='handlingAccountManager' value={form.handlingAccountManager} onChange={handleChange} className={selectClass}>
                        <option value="">Select Account Manager</option>
                        {acms.map((acm) => (
                            <option key={acm._id} value={acm._id}>
                                {acm.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="md:col-span-2 flex justify-end">
                    <button className={buttonClass}>Create New Project</button>
                </div>
            </form>
        </div>
    );
};

export default ClientNew;