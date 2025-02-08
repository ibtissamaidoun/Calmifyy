// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Calendar,
    Bell,
    Lightbulb,
    ChevronDown,
    Bot,
    MessageSquarePlus,
} from "lucide-react";
import axiosInstance from "../Utils/axios-instance";
import "../styles/Sidebar.css";

const Sidebar = () => {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [lastConversationId, setLastConversationId] = useState(null);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get("/users/me");
                setUser(response.data);
            } catch (error) {
                console.error("Failed to fetch user:", error);

                if (error.response?.status === 401) {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }
            }
        };

        const fetchConversations = async () => {
            try {
                const response = await axiosInstance.get("/conversations");
                const fetchedConversations = response.data.conversations || [];
                setConversations(fetchedConversations);
                if (fetchedConversations.length > 0) {
                    setLastConversationId(
                        fetchedConversations[fetchedConversations.length - 1].id
                    );
                }
            } catch (error) {
                console.error("Failed to fetch conversations:", error);
            }
        };

        fetchUser();
        fetchConversations();
    }, []);

    const navItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
        { icon: Calendar, label: "Calendrier", path: "/calendrier/:userId" },
        { icon: Lightbulb, label: "Recommandations", path: "/recommendations" },
        { icon: Bot, label: "Chatbot", path: "/chatbot" },
        { icon: MessageSquarePlus, label: "Conversations", path: "/conversations" },
        lastConversationId
            ? {
                icon: MessageSquarePlus,
                label: "Dernière conversation",
                path: `/conversations/${lastConversationId}`,
            }
            : null,
        { icon: Bell, label: "Notifications", path: "/notifications" },
    ].filter(Boolean); // Filtre les éléments `null` ou `undefined`

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h1 className="logo">Calmify</h1>
            </div>

            {/* Navigation principale */}
            <nav className="sidebar-nav">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className={location.pathname === item.path ? "active" : ""}
                            >
                                <item.icon className="sidebar-icon" size={20} />
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Section des conversations */}
            <div className="sidebar-conversations">
                <h2>Conversations</h2>
                <ul>
                    {conversations.map((conversation) => (
                        <li key={conversation.id}>
                            <Link to={`/conversations/${conversation.id}`}>
                                {conversation.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Footer de la sidebar */}
            <div className="sidebar-footer">
                <button className="user-profile">
                    <div className="avatar">
                        <span>{user?.firstName?.[0] || "A"}</span>
                    </div>
                    <span className="username">
            {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
          </span>
                    <ChevronDown size={16} />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
