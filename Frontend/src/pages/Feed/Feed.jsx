import { useEffect, useState } from "react";
import "./Feed.css";
import Post from "./Post/Post";
import { useTranslation } from "react-i18next";
import Tweetbox from "./Tweetbox/Tweetbox";

function Feed() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://twibb.vercel.app/post")
      .then((res) => res.json())
      .then(
        (data) => {
          setPosts(data);
        },
        [posts]
      );
  });
  return (
    <>
      <div className="feed">
        <div className="feed__header">
          <h2>{t("home1")}</h2>
        </div>
        <Tweetbox />
        {posts.map((p) => (
          <Post key={p._id} p={p} />
        ))}
      </div>
    </>
  );
}
export default Feed;
