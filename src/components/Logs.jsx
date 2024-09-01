import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Logs = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            const response = await axios.get('/api/admin/logs/find');
            setLogs(response.data);
        } catch (error) {
            console.error('Error fetching logs', error);
        }
    };

    const deleteAllLogs = async () => {
        try {
            await axios.delete('/api/admin/logs/delete');
            setLogs([]);
        } catch (error) {
            console.error('Error deleting logs', error);
        }
    };

    const exportLogs = async () => {
        try {
            const response = await axios.get('/api/admin/logs/export', {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'logs.txt');
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error exporting logs', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Log Management</h1>
            <button 
                onClick={deleteAllLogs} 
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            >
                Delete All Logs
            </button>
            <button 
                onClick={exportLogs} 
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Export Logs to Text File
            </button>
            <table className="min-w-full mt-4 bg-white">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Timestamp</th>
                        <th className="border px-4 py-2">Message</th>
                    </tr>
                </thead>
                <tbody>
                    {logs.map((log, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
                            <td className="border px-4 py-2">{log.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Logs;
