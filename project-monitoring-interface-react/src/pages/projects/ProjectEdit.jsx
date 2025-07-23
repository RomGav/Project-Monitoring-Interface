import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../../components/DataContext";

const ProjectEdit =() => {
    const {projectId} = useParams();
    const navigate = useNavigate();
    const {clients,acms, pms} = useContext(DataContext);

    //tailwind
    const formGroup = "mb-4";
    const labelClass = "block font-semibold text-gray-700 mb-1";
    const inputClass = "w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200";
    const selectClass = inputClass;
    const buttonClass = "px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700";

    const [form, setForm] = useState({
        projectId: "",
        name: "",
        client: "",
        projectStatus: "",
        type: "",
        description: "",
        handlingAccountManager: "",
        handlingProjectManager: "",
        assetsURL: "",
        projectMovement: "",
        price: "",
        budgetAllocated: "",
        budgetUsed: "",
        paymentStatus: "",
        isDeleted: false,
    });


    useEffect(() => {
        const fetchProject = async () => {
            try{
                const response = await fetch(`${import.meta.env.VITE_PROJECTS_API}/${projectId}`, {
                    credentials: "include",
                });
                
                const data = await response.json();
                setForm(data)
            } catch (error) {
                console.error("Failed to fetch Project:", error);
            };
        };
        fetchProject();
    }, [projectId]);

    const handleChange = (e) => {
        try {
            const { name, value } = e.target;
            if (name === "client") {
                const selectedClient = clients.find(client => client._id === value);
                const accountManagerId = selectedClient?.handlingAccountManager?._id;
                setForm({
                    ...form,
                    client: value,
                    handlingAccountManager: accountManagerId,
                });
            } else if (name === "isDeleted") {
                setForm({ ...form, isDeleted: value === "true" });
            } else {
                setForm({ ...form, [name]: value });
            };
        }catch(error) {
            console.error("Error handling form change:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`${import.meta.env.VITE_PROJECTS_API}/${projectId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(form),
            });

            const record = await res.json();
            console.log("Project updated:", record);
            
            if (record?.projectId) {
                navigate(`/dashboard/projects/${record.projectId}`);
            } else {alert("Failed to create the project, please check inputs and try again")}
        } catch (error) {
            console.error("Error updating Project:", error);
        };
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        const confirmDelete = window.confirm("Are you sure you want to delete this Project??");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_PROJECTS_API}/${projectId}`, {
                method: "DELETE",
                credentials: "include",
            });

            const result = await res.json();

            if (res.ok) {
                console.log("Project deleted:", result);
                navigate("/dashboard/projects");
            } else {
                console.error("Failed to delete Project:", result.error);
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            console.error("Error deleting project:", error);
            alert("Something went wrong while deleting the Project.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <button className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300" onClick={() => navigate(-1)}>Back</button>
                <h2 className="text-2xl font-bold">Edit Project</h2>
                <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-700" onClick={handleDelete}>Delete</button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={formGroup}>
                    <label className={labelClass}>Project ID:</label>
                    <input type="number" name="projectId" value={form.projectId} readOnly className={inputClass} />
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Project Name:</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} className={inputClass} />
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Client:</label>
                    <select name="client" value={form.client} onChange={handleChange} className={selectClass}>
                    <option value="">Select Client</option>
                    {clients.map((client) => (
                        <option key={client._id} value={client._id}>{client.name}</option>
                    ))}
                    </select>
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Project Status:</label>
                    <select name="projectStatus" value={form.projectStatus} onChange={handleChange} className={selectClass}>
                    <option value="Open">Open</option>
                    <option value="Closed">Closed</option>
                    </select>
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Type:</label>
                    <input type="text" name="type" value={form.type} onChange={handleChange} className={inputClass} />
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Description:</label>
                    <input type="text" name="description" value={form.description} onChange={handleChange} className={inputClass} />
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Account Manager:</label>
                    <select name="handlingAccountManager" value={form.handlingAccountManager} onChange={handleChange} className={selectClass}>
                    <option value="">Select Account Manager</option>
                    {acms.map((am) => (
                        <option key={am._id} value={am._id}>{am.name}</option>
                    ))}
                    </select>
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Project Manager:</label>
                    <select name="handlingProjectManager" value={form.handlingProjectManager} onChange={handleChange} className={selectClass}>
                    <option value="">Select Project Manager</option>
                    {pms.map((pm) => (
                        <option key={pm._id} value={pm._id}>{pm.name}</option>
                    ))}
                    </select>
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Assets URL:</label>
                    <input type="text" name="assetsURL" value={form.assetsURL} onChange={handleChange} className={inputClass} />
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Project Movement:</label>
                    <select name="projectMovement" value={form.projectMovement} onChange={handleChange} className={selectClass}>
                    <option value="Pitching">Pitching</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Reporting">Reporting</option>
                    <option value="Finished">Finished</option>
                    </select>
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Price:</label>
                    <input type="number" name="price" value={form.price} onChange={handleChange} className={inputClass} />
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Budget Allocated:</label>
                    <input type="number" name="budgetAllocated" value={form.budgetAllocated} onChange={handleChange} className={inputClass} />
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Budget Used:</label>
                    <input type="number" name="budgetUsed" value={form.budgetUsed} onChange={handleChange} className={inputClass} />
                </div>
                <div className={formGroup}>
                    <label className={labelClass}>Payment Status:</label>
                    <select name="paymentStatus" value={form.paymentStatus} onChange={handleChange} className={selectClass}>
                    <option value="Pending">Pending</option>
                    <option value="Partially Paid">Partially Paid</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                    </select>
                </div>
                <div className="md:col-span-2 flex justify-end">
                    <button type="submit" className={buttonClass}>Save Changes</button>
                </div>
            </form>
        </div>
    );
};

export default ProjectEdit;
