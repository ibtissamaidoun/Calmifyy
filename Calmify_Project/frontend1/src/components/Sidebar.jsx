import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquarePlus, Calendar, Bell, Lightbulb, ChevronDown } from 'lucide-react';
import axiosInstance from "../Utils/axios-instance";// Import de l'instance Axios
import '../styles/Sidebar.css';

const Sidebar = () => {
    const location = useLocation();
    const [user, setUser] = useState(null); // État pour stocker l'utilisateur connecté

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get('/users/me'); // Appel à l'endpoint backend
                setUser(response.data); // Stocker les données utilisateur
            } catch (error) {
                console.error('Failed to fetch user:', error);

                // Si le token est invalide ou expiré, redirection vers la page de connexion
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }
            }
        };

        fetchUser();
    }, []); // Exécuter une seule fois au montage du composant

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: MessageSquarePlus, label: 'Start new chat', path: '/new-chat' },
        { icon: Calendar, label: 'Calendrier', path: '/calendrier/:userId' },
        { icon: Lightbulb, label: 'Recommandations', path: '/recommendations' },
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
                        {/* Afficher l'initiale de l'utilisateur ou "A" par défaut */}
                        <span>{user?.firstName?.[0] || 'A'}</span>
                    </div>
                    {/* Afficher le nom complet de l'utilisateur ou "Loading..." */}
                    <span className="username">{user ? `${user.firstName} ${user.lastName}` : 'Loading...'}</span>
                    <ChevronDown size={16} />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;

