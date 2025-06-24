import { NavLink } from 'react-router-dom';

export default function Sidebar() {
    return (
        <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
            <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
            <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                    `mb-4 p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                }
            >
                Dashboard
            </NavLink>

            <NavLink
                to="/admin/history"
                className={({ isActive }) =>
                    `mb-4 p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                }
            >
                History
            </NavLink>

            <NavLink
                to="/admin/create-user"
                className={({ isActive }) =>
                    `mb-4 p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                }
            >
                Create Account
            </NavLink>

        </div>
    );
}
