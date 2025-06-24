import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const STAGES = {
    1: { text: "Information Given", color: "#FFFF00" },
    2: { text: "Working", color: "#007BFF" },
    3: { text: "Completed (Payment Done, Submitted)", color: "#28A745" }
};

function AdminDashboard() {
    const API_URL = "http://localhost:3000";
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/reports`, {
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch reports');
                }

                const data = await response.json();
                setReports(data);
            } catch (error) {
                setError('Failed to load reports: ' + error.message);
                console.error('Error fetching reports:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

    const updateStatus = async (reportId, stage) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/reports/${reportId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stage }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            setReports(reports.map(report =>
                report.reportID === reportId
                    ? {
                        ...report,
                        currentStage: stage.toString(),
                        stageText: STAGES[stage].text,
                        color: STAGES[stage].color
                    }
                    : report
            ));
        } catch (error) {
            console.error('Status update failed:', error);
            alert('Failed to update status: ' + error.message);
        }
    };

    const updatePaymentStatus = async (reportId, paymentStatus) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/reports/${reportId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentStatus }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to update payment status');
            }

            setReports(reports.map(report =>
                report.reportID === reportId
                    ? { ...report, paymentStatus }
                    : report
            ));
        } catch (error) {
            console.error('Payment update failed:', error);
            alert('Failed to update payment status: ' + error.message);
        }
    };


    const viewReport = (reportId) => {
        navigate(`/report1/view/${reportId}`);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-xl">Loading reports...</div>;
    }

    if (error) {
        return <div className="p-6 text-red-600">{error}</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            {reports.length === 0 ? (
                <div className="text-center py-10">No reports found</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Vehicle No</th>
                                <th className="border border-gray-300 px-4 py-2">Report Type</th>
                                <th className="border border-gray-300 px-4 py-2">Owner</th>
                                <th className="border border-gray-300 px-4 py-2">Payment</th>
                                <th className="border border-gray-300 px-4 py-2">Last Updated</th>
                                <th className="border border-gray-300 px-4 py-2">Stage</th>
                                <th className="border border-gray-300 px-4 py-2">Change Stage</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map(report => (
                                <tr key={report.reportID} className="hover:bg-gray-100"
                                    style={{ backgroundColor: report.color || "#FFFFFF" }}>
                                    <td className="border px-4 py-2">{report.vehicleNo}</td>
                                    <td className="border px-4 py-2">{report.reportType}</td>
                                    <td className="border px-4 py-2">{report.borrowerName || 'N/A'}</td>
                                    <td className="border px-4 py-2">
                                        <select value={report.paymentStatus} onChange={(e) => updatePaymentStatus(report.reportID, e.target.value)} className={`border rounded p-1 text-sm ${report.paymentStatus === 'completed' ? 'text-green-600' : 'text-red-600'
                                                }`}
                                        >
                                            <option value="pending" className="text-red-700">Pending</option>
                                            <option value="completed" className="text-green-600">Completed</option>
                                        </select>
                                    </td>

                                    <td className="border px-4 py-2">{new Date(report.lastUpdated).toLocaleString()}</td>
                                    <td className="border px-4 py-2">
                                        <span
                                            className="px-2 py-1 rounded text-xs font-medium text-white"
                                            style={{ backgroundColor: report.color || '#000' }}
                                        >
                                            {report.stageText || STAGES[report.currentStage]?.text || "Unknown"}
                                        </span>
                                    </td>
                                    <td className="border px-4 py-2">
                                        <select
                                            value={report.currentStage}
                                            onChange={(e) => updateStatus(report.reportID, parseInt(e.target.value))}
                                            className="border rounded p-1 text-sm"
                                        >
                                            {Object.entries(STAGES).map(([key, stage]) => (
                                                <option key={key} value={key}>{stage.text}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="border px-4 py-2">
                                        <button onClick={() => viewReport(report.reportID)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm border border-black">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;
