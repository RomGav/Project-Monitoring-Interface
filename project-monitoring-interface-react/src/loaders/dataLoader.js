const fetchProjects = async () => {
    try {
        const response = await fetch(import.meta.env.VITE_PROJECTS_API, {
            credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch Projects");
        return await response.json();
    } catch (error) {
        console.error("Error loading Projects:", error);
        throw error;
    }
};

const fetchClients = async () => {
    try {
        const response = await fetch(import.meta.env.VITE_CLIENTS_API, {
            credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch Clients");
        return await response.json();
    } catch (error) {
        console.error("Error loading Clients:", error);
        throw error;
    }
};

const fetchAcms = async () => {
    try {
        const response = await fetch(import.meta.env.VITE_ACMS_API, {
            credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch Account Managers");
        return await response.json();
    } catch (error) {
        console.error("Error loading Account Managers:", error);
        throw error;
    }
};

const fetchPms = async () => {
    try {
        const response = await fetch(import.meta.env.VITE_PMS_API, {
            credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch Project Managers");
        return await response.json();
    } catch (error) {
        console.error("Error loading Project Managers:", error);
        throw error;
    }
};

export {fetchProjects, fetchClients, fetchAcms, fetchPms}