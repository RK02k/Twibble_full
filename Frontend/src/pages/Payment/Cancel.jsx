import cancel from '../../assets/images/Cancel.jpg';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Cancel = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/");
  };

  return (
    <div className="m-0 p-0 bg-[#FDFDFD] min-h-screen">
      <div className="w-full min-h-[80vh] flex flex-col justify-center items-center">
        <div className="my-10 text-red-600 text-2xl mx-auto flex flex-col justify-center items-center">
          <img
            src={cancel}
            alt="cancel"
            width={220}
            height={220}
            className="mix-blend-multiply"
          />
          <h3 className="text-4xl pt-20 font-bold text-center text-slate-700">
            {t('Can')}
          </h3>
          <button
            onClick={handleButtonClick}
            className="w-40 uppercase bg-[#d1d5db] text-black text-xl my-16 px-2 py-2 rounded"
          >
             {t('Can1')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cancel;
