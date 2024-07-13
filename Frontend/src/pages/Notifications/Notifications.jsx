import "../page.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./not.css";
import { useTranslation } from "react-i18next";

const Notifications = () => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "https://twibb.vercel.app/notifications"
        );
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="page">
      <h2 className="pageTitle">{t("nft")}</h2>
      <div className="notificationsList">
        {notifications.map((notification, index) => (
          <div key={index} className="notificationItem">
            <div className="notificationContent">
              <p>
                <strong>{notification.username}</strong> {t("nft_share_post")}
              </p>
              <p className="timestamp">
                {new Date(notification.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
