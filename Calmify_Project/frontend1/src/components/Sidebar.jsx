import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Calendar, Bell, Lightbulb, ChevronDown, Bot } from 'lucide-react';
import axiosInstance from "../Utils/axios-instance";
import '../styles/Sidebar.css';

const Sidebar = () => {
    const location = useLocation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get('/users/me');
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user:', error);

                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }
            }
        };

        fetchUser();
    }, []);

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        // { icon: MessageSquarePlus, label: 'Start new chat', path: '/new-chat' },
        { icon: Calendar, label: 'Calendrier', path: '/calendrier/:userId' },
        { icon: Lightbulb, label: 'Recommandations', path: '/recommendations' },
        { icon: Bot, label: 'Chatbot', path: '/chatbot' }, // Ajout du bouton Chatbot
        { icon: Bell, label: 'Notifications', path: '/notifications' },
    ];

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h1 className="logo">Calmify</h1>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={location.pathname === item.path ? 'active' : ''}
                            >
                                <item.icon className="sidebar-icon" size={20} />
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <button className="user-profile">
                    <div className="avatar">
                        <span>{user?.firstName?.[0] || 'A'}</span>
                    </div>
                    <span className="username">{user ? `${user.firstName} ${user.lastName}` : 'Loading...'}</span>
                    <ChevronDown size={16} />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
