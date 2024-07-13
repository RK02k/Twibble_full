import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import userLoggedInUser from "../../../hooks/userLoggedInUser";
import "./MainPage.css";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import AddLinkIcon from "@mui/icons-material/AddLink";
import { useState, useEffect } from "react";
import Post from "../../Feed/Post/Post";
import axios from "axios";
import LockResetIcon from "@mui/icons-material/LockReset";
import EditProfile from "../EditProfile/EditProfile";
import { useTranslation } from "react-i18next";

const MainPage = ({ user }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const username = user?.email?.split("@")[0];
  const [loggedInUser] = userLoggedInUser();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(loggedInUser);

  useEffect(() => {
    fetch(`https://twibb.vercel.app/userPost?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, [user?.email]);

  const handleUploadCoverImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0]; // for this we install axios and use free image host imgbb
    const formData = new FormData();
    formData.set("image", image);
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=760c1f653f3b01a8871188b68dc18f80",
        formData
      )
      .then((res) => {
        const url = res.data.data.display_url;
        const userCoverImage = { email: user?.email, coverImage: url };
        setIsLoading(false);
        if (url) {
          axios.patch(
            `https://twibb.vercel.app/userUpdates/${user?.email}`,
            userCoverImage
          );
        }
      });
  };

  const handleUploadProfileImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0]; // for this we install axios and use free image host imgbb
    const formData = new FormData();
    formData.set("image", image);
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=760c1f653f3b01a8871188b68dc18f80",
        formData
      )
      .then((res) => {
        const url = res.data.data.display_url;
        const userProfileImage = { email: user?.email, profileImage: url };
        setIsLoading(false);
        if (url) {
          axios.patch(
            `https://twibb.vercel.app/userUpdates/${user?.email}`,
            userProfileImage
          );
        }
      });
  };

  if (!loggedInUser || loggedInUser.length === 0) {
    return <div>{t("loading")}...</div>;
  }

  const getPlanName = (plan) => {
    switch (plan) {
      case 0:
        return "Free";
      case 199:
        return "Pro";
      case 499:
        return "Premium";
      default:
        return "";
    }
  };

  return (
    <div>
      <ArrowBackIcon
        className="arrow-icon"
        onClick={() => {
          navigate("/");
        }}
      />
      <h4 className="heading-4">@{username}</h4>
      <div className="mainprofile">
        <div className="profile-bio">
          <div>
            <div className="coverImageContainer">
              <img
                src={
                  loggedInUser[0]?.coverImage ||
                  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                }
                alt=""
                className="coverImage"
              />
              <div className="hoverCoverImage">
                <div className="imageIcon_tweetButton">
                  <label htmlFor="image" className="imageIcon">
                    {isLoading ? (
                      <LockResetIcon className="photoIcon photoIconDisabled" />
                    ) : (
                      <CenterFocusWeakIcon />
                    )}
                  </label>
                  <input
                    type="file"
                    id="image"
                    className="imageInput"
                    onChange={handleUploadCoverImage}
                  />
                </div>
              </div>
            </div>
            <div className="avatar-img">
              <div className="avatarContainer">
                <img
                  src={
                    loggedInUser[0]?.profileImage ||
                    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                  }
                  alt=""
                  className="avatar"
                />
                <div className="hoverAvatarImage">
                  <div className="imageIcon_tweetButton">
                    <label htmlFor="profileimage" className="imageIcon">
                      {isLoading ? (
                        <LockResetIcon className="photoIcon photoIconDisabled" />
                      ) : (
                        <CenterFocusWeakIcon className="photoIcon" />
                      )}
                    </label>
                    <input
                      type="file"
                      id="profileimage"
                      className="imageInput"
                      onChange={handleUploadProfileImage}
                    />
                  </div>
                </div>
              </div>
              <div className="userInfo">
                <div>
                  <h3 className="heading-3">
                    {loggedInUser[0]?.name || user?.displayName}
                  </h3>
                  <p className="usernameSection">@{username}</p>
                </div>
                <EditProfile user={user} LoggedInUser={loggedInUser} />
              </div>
              <div className="infoContainer">
                {loggedInUser[0]?.bio || ""}
                <div className="locationAndLink">
                  {loggedInUser[0]?.location && (
                    <p className="subInfo">
                      <MyLocationIcon /> {loggedInUser[0]?.location}
                    </p>
                  )}
                  {loggedInUser[0]?.website && (
                    <p className="subInfo link">
                      <AddLinkIcon /> {loggedInUser[0]?.website}
                    </p>
                  )}
                  {loggedInUser[0]?.plan && (
                    <p className="subInfo">
                      {t("Profile2")}: {getPlanName(loggedInUser[0]?.plan)}
                    </p>
                  )}
                </div>
              </div>
              <h4 className="tweetsText">{t("your_posts")}</h4>
              <hr />
            </div>
            {posts.map((p) => (
              <Post key={p._id} id={p._id} p={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
