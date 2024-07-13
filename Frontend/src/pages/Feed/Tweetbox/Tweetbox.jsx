// import { useState } from "react";
// import { Avatar,Button } from "@mui/material";
// import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
// import axios from 'axios'
// import "./Tweetbox.css"
// import userLoggedInUser from "../../../hooks/userLoggedInUser";
// import { useAuthState } from "react-firebase-hooks/auth";
// import auth from "../../../firebase.init";
// import { useTranslation } from 'react-i18next';

// const Tweetbox = () =>{
//     const { t } = useTranslation();
//     const [post,setPost] = useState("");
//     const [imageURL,setImageURL] = useState("");
//     const [isLoading,setIsLoading] = useState("");
//     const [name,setName] = useState("");
//     const [username,setUsername] = useState("");
//     const [loggedInUser] = userLoggedInUser()
//     // console.log(loggedInUser)

//     const [user] = useAuthState(auth)
//     const email = user?.email

//     const UserProfilePic = loggedInUser[0]?.profileImage?loggedInUser[0].profileImage: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"

//     const handleUploadImage = (e) =>{
//         setIsLoading(true);
//         const image = e.target.files[0]; // for this we install axios and use free image host imgbb
//         const formData = new FormData();
//         formData.set('image',image)
//         axios.post("https://api.imgbb.com/1/upload?key=760c1f653f3b01a8871188b68dc18f80",formData).then(res=>{
//             setImageURL(res.data.data.display_url)
//             setIsLoading(false)
//         }).catch((error) =>{
//             console.log(error)
//             setIsLoading(false);
//         })
//     }

//     const handleTweet = (e) =>
//     {
//         e.preventDefault();
//          console.log(user.providerData[0].providerId)
//         if(user.providerData[0].providerId === 'password'){
//             fetch(`https://twibb.vercel.app/loggedInUser?email=${email}`).then(res => res.json()).then(data => {
//                 setName(data[0]?.name)
//                 setUsername(data[0]?.username)
//             })
//         }
//         else
//         {
//             setName(user?.displayName)
//             setUsername(email?.split('@')[0])
//         }
//         if(name)
//         {
//             const userPost =
//             {
//                 profilePhoto : UserProfilePic,
//                 post: post,
//                 photo: imageURL,
//                 username : username,
//                 name: name,
//                 email: email
//             }
//             // console.log(userPost)
//             setPost('')
//             setImageURL('')
//             fetch(`https://twibb.vercel.app/post`,{
//                 method:"POST",
//                 headers :{
//                     'content-type':'application/json'
//                 },
//                 body:JSON.stringify(userPost)
//             }).then(res =>res.json()).then(data => {
//                 console.log(data);
//             })
//         }
//     }

//     return <>
//      <div className="tweetBox">
//         <form onSubmit={handleTweet}>
//          <div className="tweetBox__input">
//          <Avatar src={loggedInUser[0]?.profileImage || "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}></Avatar>
//          <input type="text" placeholder={t('home2')} onChange={(e) =>setPost(e.target.value)} value={post} required/>
//          </div>
//          <div className="imageIcon_tweetButton">
//             <label htmlFor="image" className="imageIcon">
//                 {
//                     isLoading?<p>Uploading image</p>:<p>{imageURL?'image uploaded':<AddPhotoAlternateIcon/>}</p>
//                 }
//             </label>
//             <input type="file"id="image" className="imageInput" onChange={handleUploadImage}/>
//             <Button className="tweetBox__tweetButton" type="submit">
//             {t('home3')}
//             </Button>
//          </div>
//         </form>
//      </div>
//     </>
// }

// export default Tweetbox;

import { useState } from "react";
import { Avatar, Button } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";
import "./Tweetbox.css";
import userLoggedInUser from "../../../hooks/userLoggedInUser";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { useTranslation } from "react-i18next";

const Tweetbox = () => {
  const { t } = useTranslation();
  const [post, setPost] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [loggedInUser] = userLoggedInUser();
  const [user] = useAuthState(auth);
  const email = user?.email;

  const UserProfilePic =
    loggedInUser[0]?.profileImage ||
    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";

  const handleUploadImage = (e) => {
    setIsLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.set("image", image);
    axios
      .post(
        "https://api.imgbb.com/1/upload?key=760c1f653f3b01a8871188b68dc18f80",
        formData
      )
      .then((res) => {
        setImageURL(res.data.data.display_url);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleTweet = (e) => {
    e.preventDefault();
    if (user.providerData[0].providerId === "password") {
      fetch(`https://twibb.vercel.app/loggedInUser?email=${email}`)
        .then((res) => res.json())
        .then((data) => {
          setName(data[0]?.name);
          setUsername(data[0]?.username);
        });
    } else {
      setName(user?.displayName);
      setUsername(email?.split("@")[0]);
    }
    if (name) {
      const userPost = {
        profilePhoto: UserProfilePic,
        post: post,
        photo: imageURL,
        username: username,
        name: name,
        email: email,
      };
      setPost("");
      setImageURL("");
      fetch(`https://twibb.vercel.app/post`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userPost),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .then(() => {
          // Fetch notifications after posting
          fetch("/notifications")
            .then((response) => response.json())
            .then((data) => {
              // You can handle the fetched notifications here if needed
              console.log("Notifications:", data);
            })
            .catch((error) =>
              console.error("Error fetching notifications:", error)
            );
        });
    }
  };

  return (
    <div className="tweetBox">
      <form onSubmit={handleTweet}>
        <div className="tweetBox__input">
          <Avatar
            src={
              loggedInUser[0]?.profileImage ||
              "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
            }
          ></Avatar>
          <input
            type="text"
            placeholder={t("home2")}
            onChange={(e) => setPost(e.target.value)}
            value={post}
            required
          />
        </div>
        <div className="imageIcon_tweetButton">
          <label htmlFor="image" className="imageIcon">
            {isLoading ? (
              <p>Uploading image</p>
            ) : (
              <p>{imageURL ? "image uploaded" : <AddPhotoAlternateIcon />}</p>
            )}
          </label>
          <input
            type="file"
            id="image"
            className="imageInput"
            onChange={handleUploadImage}
          />
          <Button className="tweetBox__tweetButton" type="submit">
            {t("home3")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Tweetbox;
