import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import pour récupérer les paramètres d'URL
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import axios from "axios";
import "../styles/CalendarView.css"; // Import du fichier CSS pour les styles

const CalendarView = () => {
    // Récupère l'ID de l'utilisateur à partir des paramètres de l'URL
    const { userId } = useParams();

    // State pour stocker les événements du calendrier
    const [events, setEvents] = useState([]);

    // Effet déclenché lorsque l'ID utilisateur change
    useEffect(() => {
        if (userId) {
            axios
                .get(`http://localhost:8081/api/calendar/user/${userId}/calendar`) // Requête pour récupérer les événements
                .then((response) => {
                    // Formater les événements avant de les afficher dans le calendrier
                    const formattedEvents = response.data.map((event) => ({
                        title: event.title,
                        start: event.start,
                        end: event.end,
                        description: event.description,
                        url: event.link,
                    }));
                    setEvents(formattedEvents); // Mise à jour du state avec les événements formatés
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des événements :", error);
                });
        }
    }, [userId]); // L'effet se réexécute lorsque l'ID utilisateur change

    return (
        <div className="calendar-container">
            <h1 className="calendar-title">Calendrier des événements</h1>
            <p style={{ textAlign: "center", color: "var(--text-color)" }}>
                Bienvenue dans votre calendrier, où vous pouvez consulter vos événements !
            </p>
            <FullCalendar
                plugins={[dayGridPlugin]} // Plugin pour la vue en grille journalière
                initialView="dayGridMonth" // Vue initiale : mois
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek,dayGridDay',
                }}
                events={events} // Événements affichés dans le calendrier
                locale="fr" // Langue française
                buttonText={{
                    today: 'Aujourd\'hui',
                    month: 'Mois',
                    week: 'Semaine',
                    day: 'Jour',
                }}
                eventClick={(info) => {
                    // Afficher les détails de l'événement lors du clic
                    alert(`Titre : ${info.event.title}\nDescription : ${info.event.extendedProps.description}`);
                }}
            />
        </div>
    );
};

export default CalendarView;
