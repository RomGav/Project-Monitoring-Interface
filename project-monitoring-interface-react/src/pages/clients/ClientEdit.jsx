import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../../components/DataContext";

const ClientEdit =() => {
    const navigate = useNavigate();
    const {clientId} = useParams();
    const {acms} = useContext(DataContext);

    //tailwind
    const formGroup = "mb-4";
    const labelClass = "block font-semibold text-gray-700 mb-1";
    const inputClass = "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200";
    const selectClass = inputClass;
    const buttonClass = "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700";

    const [form, setForm] = useState({
        clientId: "",
        name: "",
        client: "",
        priorityTier: "",
        industry: "",
        activeClient: "",
        projectsOpen: "",
        projectsClosed: "",
        contactPerson: "",
        email: "",
        phoneNumber: "",
        handlingAccountManager: "",
        isDeleted: false,
    });


    useEffect(() => {
        const fetchClient = async () => {
            try{
                const response = await fetch(`${import.meta.env.VITE_CLIENTS_API}/${clientId}`, {
                    credentials: "include",
                });
                
                const data = await response.json();
                setForm(data)
            } catch (error) {
                console.error("Failed to fetch Client:", error);
            };
        };
        fetchClient();
    }, [clientId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "isDeleted") {
            setForm({ ...form, isDeleted: value === "true" });
        } else if (name === "activeClient") {
            setForm({ ...form, activeClient: value === "true" });
        } else {
            setForm({ ...form, [name]: value });
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${import.meta.env.VITE_CLIENTS_API}/${clientId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(form),
            });

            const record = await res.json();
            console.log("Client updated:", record);
            if (record?.clientId) {
                navigate(`/dashboard/clients/${record.clientId}`);
                window.location.reload();
            } else {alert("Failed to create the Client, please check inputs and try again")}
        } catch (error) {
            console.error("Error updating Client:", error);
        };
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        const confirmDelete = window.confirm("Are you sure you want to delete this Client?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_CLIENTS_API}/${clientId}`, {
                method: "DELETE",
                credentials: "include",
            });

            const result = await res.json();

            if (res.ok) {
                console.log("Client deleted:", result);
                navigate("/dashboard/clients");
            } else {
                console.error("Failed to delete Client:", result.error);
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            console.error("Error deleting Client:", error);
            alert("Something went wrong while deleting the Client.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <button className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300" onClick={() => navigate(-1)}>Back</button>
                <h2 className="text-2xl font-bold">Edit Client</h2>
                <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-700" onClick={handleDelete}>Delete</button>
            </div>
            <form onSubmit={handleSubmit}className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={formGroup}>
                    <label className={labelClass}>Client ID:</label>
                    <input type="number" name='clientId' value={form.clientId}  readOnly className={inputClass} />
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Client Name:</label>
                    <input type="text" name='name' value={form.name} onChange={handleChange} className={inputClass}/>
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Priority Tier:</label>
                    <select name="priorityTier" value={form.priorityTier} onChange={handleChange} className={inputClass}>
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
                    <label className={labelClass}>Active Client:</label>
                    <select type="text" name='activeClient' value={form.activeClient} onChange={handleChange} className={selectClass}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Ongoing Projects:</label>
                    <input type="number" name='projectsOpen' value={form.projectsOpen} readOnly className={inputClass}/>
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Closed Projects:</label>
                    <input type="number" name='projectsClosed' value={form.projectsClosed} readOnly className={inputClass} />
                </div>
                <div>
                    <label>Contact Person:</label>
                    <input type="text" name='contactPerson' value={form.contactPerson} onChange={handleChange} className={inputClass}/>
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Email:</label>
                    <input type="text" name='email' value={form.email} onChange={handleChange} className={inputClass}/>
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Phone Number:</label>
                    <input type="text" name='phoneNumber' value={form.phoneNumber} onChange={handleChange} className={inputClass}/>
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
                    <button className={buttonClass}>Save Changes</button>
                </div>
            </form>
        </div>
    )
};

export default ClientEdit;