// import { useTranslation } from "react-i18next";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import auth from "../../firebase.init";
// import { useAuthState } from "react-firebase-hooks/auth";
// import "./list.css";

// const languages = [
//   { code: "en", lang: "English" },
//   { code: "hi", lang: "Hindi" },
//   { code: "sp", lang: "Spanish" },
//   { code: "po", lang: "Portuguese" },
//   { code: "tm", lang: "Tamil" },
//   { code: "beng", lang: "Bengali" },
// ];

// const Language = () => {
//   const { i18n } = useTranslation();
//   const { t } = useTranslation();
//   const [selectedLang, setSelectedLang] = useState(i18n.language);
//   const [user] = useAuthState(auth);
//   const [otp, setOtp] = useState("");
//   const [isVerified, setIsVerified] = useState(false);

//   useEffect(() => {
//     document.body.dir = i18n.dir();
//   }, [i18n, i18n.language]);

//   const changeLanguage = async (lng) => {
//     i18n.changeLanguage(lng);
//     setSelectedLang(lng);
//     await handleSave(languages.find((lang) => lang.code === lng)?.lang);
//   };

//   const handleSave = async (language) => {
//     const editedInfo = { language };
//     try {
//       await axios.patch(
//         `https://twibb.vercel.app/userUpdates/${user?.email}`,
//         editedInfo
//       );
//     } catch (error) {
//       console.error("Error updating language:", error);
//     }
//   };

//   const sendOtp = async () => {
//     try {
//       const response = await axios.post(
//         "https://twibb.vercel.app/api/otp/sendotp",
//         { email: user.email }
//       );
//       if (response.data.success) {
//         alert("OTP sent successfully");
//       } else {
//         alert("Failed to send OTP");
//       }
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       const response = await axios.post(
//         "https://twibb.vercel.app/otp/verifyOtp",
//         { email: user.email, otp }
//       );
//       if (response.data.valid) {
//         setIsVerified(true);
//         changeLanguage(selectedLang);
//       } else {
//         alert("Invalid OTP");
//       }
//     } catch (error) {
//       console.error("Error verifying OTP:", error);
//     }
//   };

//   const handleApplyLanguage = () => {
//     if (isVerified) {
//       changeLanguage(selectedLang);
//     } else {
//       alert("Please verify OTP first");
//     }
//   };

//   return (
//     <div className="language-container">
//       {!isVerified && (
//         <div>
//           <div className="action">
//             <button className="action-button" onClick={sendOtp}>
//               {t("Lani")}
//             </button>
//           </div>
//           <div className="input">
//             <input
//               type="text"
//               className="input-field"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//             />
//             <label className="input-label">{t("Lani2")}</label>
//           </div>
//           <button className="action-button" onClick={verifyOtp}>
//             {t("Lani3")}
//           </button>
//         </div>
//       )}

//       <div className="select-container">
//         <select
//           className="select"
//           value={selectedLang}
//           onChange={(e) => setSelectedLang(e.target.value)}
//         >
//           {languages.map((lng) => (
//             <option key={lng.code} value={lng.code}>
//               {lng.lang}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="action">
//         <button className="action-button" onClick={handleApplyLanguage}>
//           {t("Lani4")}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Language;



import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import "./list.css";

const languages = [
  { code: "en", lang: "English" },
  { code: "hi", lang: "Hindi" },
  { code: "sp", lang: "Spanish" },
  { code: "po", lang: "Portuguese" },
  { code: "tm", lang: "Tamil" },
  { code: "beng", lang: "Bengali" },
];

const Language = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const [user] = useAuthState(auth);

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, [i18n, i18n.language]);

  const changeLanguage = async (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLang(lng);
    await handleSave(languages.find((lang) => lang.code === lng)?.lang);
    alert("Language has been changed successfully!");
  };

  const handleSave = async (language) => {
    const editedInfo = { language };
    try {
      await axios.patch(
        `https://twibb.vercel.app/userUpdates/${user?.email}`,
        editedInfo
      );
    } catch (error) {
      console.error("Error updating language:", error);
    }
  };

  return (
    <div className="language-container">
      <div className="select-container">
        <select
          className="select"
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
        >
          {languages.map((lng) => (
            <option key={lng.code} value={lng.code}>
              {lng.lang}
            </option>
          ))}
        </select>
      </div>

      <div className="action">
        <button className="action-button" onClick={() => changeLanguage(selectedLang)}>
          {t("Lani4")}
        </button>
      </div>
    </div>
  );
};

export default Language;

