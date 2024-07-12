import { useTranslation } from "react-i18next";
import Language from "./Language";
import "../page.css";
import lan from "../../assets/images/lanj.jpg";
import "./list.css"

const List = () => {
  const { t } = useTranslation();
  return (
    <div className="page">
      <h2 className="pageTitle">{t("greet")}</h2>
      <div className="imageContainer">
        <img src={lan} className="image" alt="Language" />
      </div>
      <Language />
    </div>
  );
};

export default List;
