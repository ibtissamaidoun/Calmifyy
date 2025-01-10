// src/layouts/MainLayout.jsx
import PropTypes from 'prop-types'; // Add PropTypes for validation
import Sidebar from '../components/Sidebar.jsx';
import { Outlet } from 'react-router-dom'; // Import Outlet
import './MainLayout.css'; // Importer le CSS

const MainLayout = () => {
    return (
        <div className="app-mainlayout">

            <div className="content-mainlayout">
                <Sidebar /> {/* Sidebar is always visible */}
                <main>
                    <Outlet /> {/*  Where route content (like Dashboard) renders */}
                </main>
            </div>
        </div>
    );
};
// Add PropTypes validation
MainLayout.propTypes = {
    children: PropTypes.node,
};

export default MainLayout;