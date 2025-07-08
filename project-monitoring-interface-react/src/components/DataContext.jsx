import { createContext, useState, useEffect } from "react";
import { fetchProjects, fetchClients, fetchAcms, fetchPms } from "../loaders/dataLoader.js";

export const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [acms, setAcms] = useState([]);
    const [pms, setPms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [projectsData, clientsData, acmsData, pmsData] = await Promise.all([
                fetchProjects(),
                fetchClients(),
                fetchAcms(),
                fetchPms(),
            ]);

                setProjects(projectsData);
                setClients(clientsData);
                setAcms(acmsData);
                setPms(pmsData);
        } catch (error) {
            console.error("Error loading data:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{projects, clients, acms, pms, loading, error}}>
            {children}
        </DataContext.Provider>
    );
};