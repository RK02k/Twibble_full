import success from "../../assets/images/success.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import userLoggedInUser from "../../hooks/userLoggedInUser";
import "./suc.css";
import { useTranslation } from "react-i18next";

const Success = () => {
  const { t } = useTranslation();
  const [loggedInUser] = userLoggedInUser();
  const navigate = useNavigate();
  const user = loggedInUser[0];
  const sessionId = user?.subscription?.sessionId;

  const handlePaymentSuccess = async () => {
    if (!sessionId) {
      console.error("Session ID is not available");
      return;
    }

    try {
      const response = await axios.post(
        "https://twibb.vercel.app/payment-success",
        {
          sessionId: sessionId,
          firebaseId: user?.email,
        }
      );
      // console.log(response.data.message);
      // console.log("Payment successful");
    } catch (error) {
      console.error(
        "Error processing payment:",
        error.response?.data?.error || error.message
      );
    }
  };

  useEffect(() => {
    if (user && sessionId) {
      handlePaymentSuccess();
    }
  }, [user, sessionId]);

  const handleButtonClick = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <div className="w-full min-h-[80vh] flex flex-col justify-center items-center">
        <div className="my-10 text-green-600 text-2xl mx-auto flex flex-col justify-center items-center">
          <img src={success} alt="" width={220} height={220} />
          <h3 className="text-4xl pt-20 lg:pt-0 font-bold text-center text-slate-700">
            {t("Paymen")}
          </h3>
          <button
            onClick={handleButtonClick}
            className="w-40 uppercase bg-[#009C96] text-white text-xl my-16 px-2 py-2 rounded"
          >
            {t("Pro")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
