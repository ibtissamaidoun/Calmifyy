// Stress Level Chart component
//src/components/StressLevelChart.jsx
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'; // Import necessary components
import '../styles/StressLevelChart.css';

// Register the necessary components with ChartJS
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // X-axis labels
    datasets: [
        {
            label: 'Stress Level',
            data: [40, 50, 60, 70, 80, 90], // Y-axis data
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 0.2)',
            pointRadius: 4,
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Your Stress Level Over Time',
            color: '#070707',
            font: {
                size: 16,
                family: "'Playfair Display', serif",
            }
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            max: 100,
            grid: {
                color: '#F5F5F5',
            },
        },
        x: {
            grid: {
                display: false,
            },
        },
    },
};

const StressLevelChart = () => {
    return (
        <div className="stress-level-chart">
            <h3>Your Stress Level Over Time</h3>
            {/* Pass data and options to the Line component */}
            <Line data={data} options={options} />
        </div>
    );
};

export default StressLevelChart;
