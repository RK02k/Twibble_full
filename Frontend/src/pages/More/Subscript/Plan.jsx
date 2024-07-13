import { SiDoubanread } from "react-icons/si";
import "./Plan.css";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useAuthState } from "react-firebase-hooks/auth";
import userLoggedInUser from "../../../hooks/userLoggedInUser";
import auth from "../../../firebase.init";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Plan = () => {
  const [user] = useAuthState(auth);
  const [loggedInUser] = userLoggedInUser();
  const { t } = useTranslation();

  const checkout = async (plan) => {
    try {
      const response = await axios.post(
        "https://twibb.vercel.app/createStripeSession",
        {
          plan,
          customerId: user?.email,
        }
      );

      const { session } = response.data;
      window.location = session.url;
    } catch (error) {
      console.error("Error creating Stripe session:", error);
    }
  };

  return (
    <>
      <div className="container py-3">
        <header>
          <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
            <a
              href="/"
              className="d-flex align-items-center link-body-emphasis text-decoration-none"
            >
              <SiDoubanread className="sidebar__twitterIcon tdm-icon" />
              <span className="fs-4">{t("Plan")}</span>
            </a>
          </div>

          <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
            <h1 className="display-4 fw-normal text-body-emphasis">
              {t("Plan1")}
            </h1>
            <p className="fs-5 text-body-secondary">{t("Plan2")}</p>
          </div>
        </header>
        <main>
          <div className="row row-cols-1 row-cols-md-3 g-3 text-center">
            <div className="col">
              <div className="card mb-4 rounded-3 shadow-sm">
                <div className="card-header py-3">
                  <h4 className="my-0 fw-normal">{t("Planf")}</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">
                    ₹0
                    <small className="text-body-secondary fw-light">
                      {t("Planf2")}
                    </small>
                  </h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>{t("Planf3")}</li>
                    <li>{t("Planf4")}</li>
                    <li>{t("Planf5")}</li>
                    <li>{t("Planf6")}</li>
                    <li>{t("Planf7")}</li>
                    <li>{t("Planf8")}</li>
                  </ul>
                  <button
                    type="button"
                    className="w-100 btn btn-lg btn-primary"
                    onClick={() => checkout(Number(0))}
                  >
                    {t("Plan3")}
                  </button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card mb-4 rounded-3 shadow-sm">
                <div className="card-header py-3">
                  <h4 className="my-0 fw-normal">{t("Planpr")}</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">
                    ₹199
                    <small className="text-body-secondary fw-light">
                      {t("Planpr2")}
                    </small>
                  </h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>{t("Planpr3")}</li>
                    <li>{t("Planpr4")}</li>
                    <li>{t("Planpr5")}</li>
                    <li>{t("Planpr6")}</li>
                    <li>{t("Planpr7")}</li>
                    <li>{t("Planpr8")}</li>
                  </ul>
                  <button
                    type="button"
                    className="w-100 btn btn-lg btn-primary"
                    onClick={() => checkout(Number(199))}
                  >
                    {t("Plan3")}
                  </button>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card mb-4 rounded-3 shadow-sm border-primary">
                <div className="card-header py-3 text-bg-primary border-primary">
                  <h4 className="my-0 fw-normal">{t("Planp")}</h4>
                </div>
                <div className="card-body">
                  <h1 className="card-title pricing-card-title">
                    ₹499
                    <small className="text-body-secondary fw-light">
                      {t("Planp2")}
                    </small>
                  </h1>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>{t("Planp3")}</li>
                    <li>{t("Planp4")}</li>
                    <li>{t("Planp5")}</li>
                    <li>{t("Planp6")}</li>
                    <li>{t("Planp7")}</li>
                    <li>{t("Planp8")}</li>
                  </ul>
                  <button
                    type="button"
                    className="w-100 btn btn-lg btn-primary"
                    onClick={() => checkout(Number(499))}
                  >
                    {t("Plan3")}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <h2 className="display-6 text-center mb-4">{t("Pland")}</h2>
          <div className="table-responsive">
            <table className="table text-center">
              <thead>
                <tr>
                  <th style={{ width: "34%" }}></th>
                  <th style={{ width: "22%" }}>Free</th>
                  <th style={{ width: "22%" }}>Pro</th>
                  <th style={{ width: "22%" }}>Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className="text-start">
                    {t("Pland1")}
                  </th>
                  <td>
                    <ClearIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-start">
                    {t("Pland2")}
                  </th>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-start">
                    {t("Pland3")}
                  </th>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-start">
                    {t("Pland4")}
                  </th>
                  <td>
                    <ClearIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-start">
                    {t("Pland5")}
                  </th>
                  <td>
                    <ClearIcon />
                  </td>
                  <td>
                    <ClearIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-start">
                    {t("Pland6")}
                  </th>
                  <td>
                    <ClearIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="text-start">
                    {t("Pland7")}
                  </th>
                  <td>
                    <ClearIcon />
                  </td>
                  <td>
                    <ClearIcon />
                  </td>
                  <td>
                    <CheckIcon />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
};

export default Plan;
