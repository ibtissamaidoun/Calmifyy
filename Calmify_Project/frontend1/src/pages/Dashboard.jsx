import { useEffect, useState } from 'react';
import ShareLevel from '../components/ShareLevel';
import StressLevelChart from '../components/StressLevelChart';
import Tips from '../components/Tips';
import axiosInstance from "../Utils/axios-instance.js"; // Import the Axios instance
import '../styles/Dashboard.css';


const Dashboard = () => {
    const [stressLevel, setStressLevel] = useState(0); // State to store the stress level
    useEffect(() => {
        const fetchStressLevel = async () => {
            try {
                const response = await axiosInstance.get('/stress-level'); // Fetch stress level from the backend
                setStressLevel(response.data.currentStressLevel); // Update state with the fetched stress level
            } catch (error) {
                console.error('Error fetching stress level:', error);
            }
        };
        fetchStressLevel();
    }, []);
    return (
        <div className="dashboard">
            <h2>Good morning!</h2>
            <div className="dashboard-content">
                <div className="metrics-row"> {/*Top row with 4 metric cards*/}
                    {/* Pass the stressLevel to ShareLevel */}
                    <ShareLevel stressLevel={stressLevel} />
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

                <div className="chart-section"> {/* Middle section with chart*/}
                    <StressLevelChart />
                </div>

                <div className="tips-section"> {/* Right section with tips */}
                    <Tips />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

