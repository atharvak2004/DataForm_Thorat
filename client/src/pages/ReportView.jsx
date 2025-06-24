import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ReportView() {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch(`/report1/${reportId}`, {
          credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch report');
        }
        
        const data = await response.json();
        setReport(data);
        setPaymentCompleted(data.paymentStatus === 'completed');
      } catch (error) {
        setError('Failed to load report: ' + error.message);
        console.error('Error fetching report:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  const handlePaymentChange = async () => {
    setUpdating(true);
    try {
      const newPaymentStatus = !paymentCompleted;
      
      const response = await fetch(`/report1/${reportId}/payment`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentCompleted: newPaymentStatus }),
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to update payment status');
      }
      
      const data = await response.json();
      setPaymentCompleted(newPaymentStatus);
      
      if (newPaymentStatus) {
        setReport(prev => ({
          ...prev,
          paymentStatus: 'completed',
          currentStage: '5'
        }));
      }
    } catch (error) {
      console.error('Payment update failed:', error);
      alert('Failed to update payment status: ' + error.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading report...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        {error}
      </div>
    );
  }

  if (!report) {
    return (
      <div className="p-6">
        <p>Report not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-3xl font-bold">Report Details</h1>
        <button
          onClick={() => navigate('/history')}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back to History
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-3">Vehicle Information</h2>
            <p><strong>Vehicle No:</strong> {report.vehicleNo}</p>
            <p><strong>Owner:</strong> {report.borrowerName}</p>
            <p><strong>Model:</strong> {report.makerName} {report.model}</p>
            <p><strong>Year:</strong> {report.yearOfManufacture}</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-3">Report Status</h2>
            <p><strong>Status:</strong> {report.stageText || 'Information Given'}</p>
            <p><strong>Payment:</strong> 
              <span className={`ml-2 px-2 py-1 rounded text-sm ${report.paymentStatus === 'completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                {report.paymentStatus || 'pending'}
              </span>
            </p>
            <p><strong>Last Updated:</strong> {new Date(report.lastUpdated).toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Report Data</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(report)
                .filter(([key]) => !['lastUpdated', 'reportID', 'stageText', 'color'].includes(key))
                .map(([key, value]) => (
                  <tr key={key}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {value || '-'}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={paymentCompleted}
              onChange={handlePaymentChange}
              disabled={updating || report.paymentStatus === 'completed'}
              className="h-5 w-5 text-blue-600 rounded"
            />
            <span className="ml-2 text-lg">
              {paymentCompleted ? 'Payment Completed' : 'Mark Payment as Completed'}
            </span>
          </label>
          {updating && <p className="mt-2 text-sm text-gray-600">Updating payment status...</p>}
        </div>
      </div>
    </div>
  );
}

export default ReportView;