import { useEffect, useState } from 'react';
import ShareLevel from '../components/ShareLevel';
import StressLevelChart from '../components/StressLevelChart';
import Tips from '../components/Tips';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [userName, setUserName] = useState('Aya');

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h2>Good morning, {userName}!</h2>
                <div className="header-actions">
                    <span className="plan-badge">Free plan</span>
                    <button className="upgrade-button">Upgrade now</button>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="metrics-row">
                    <ShareLevel />
                    <div className="metrics-card">
                        <h3>Your Joy level Today</h3>
                        <div className="metric-value">3</div>
                    </div>
                    <div className="metrics-card">
                        <h3>Your Anger level Today</h3>
                        <div className="metric-value">3</div>
                    </div>
                    <div className="metrics-card">
                        <h3>Your Fear level Today</h3>
                        <div className="metric-value">4</div>
                    </div>
                </div>

                <div className="chart-section">
                    <StressLevelChart />
                </div>

                <div className="tips-section">
                    <Tips />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

