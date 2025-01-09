import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquarePlus, Calendar, Bell, Lightbulb, ChevronDown } from 'lucide-react';
import '../styles/Sidebar.css';

const Sidebar = () => {
    const location = useLocation();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: MessageSquarePlus, label: 'Start new chat', path: '/new-chat' },
        { icon: Calendar, label: 'Calendrier', path: '/calendrier/:userId' },
        { icon: Lightbulb, label: 'Recommandations', path: '/recommandations' },
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
                        <span>A</span>
                    </div>
                    <span className="username">User</span>
                    <ChevronDown size={16} />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;

