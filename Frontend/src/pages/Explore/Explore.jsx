import "../page.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import Post from "../Feed/Post/Post";
import "./exp.css";
import { useTranslation } from "react-i18next";

const Explore = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Ensure the URL matches the server route
        const response = await axios.get("https://twibb.vercel.app/post");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts to exclude those posted by the current user
  const filteredPosts = posts.filter((post) => post.email !== user.email);

  return (
    <>
      <div className="page">
        <div className="feed">
          <div className="feed__header">
            <h2>{t("Exp")}</h2>
          </div>
        </div>
        <div className="posts">
          {filteredPosts.map((post) => (
            <Post key={post.id} p={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Explore;
