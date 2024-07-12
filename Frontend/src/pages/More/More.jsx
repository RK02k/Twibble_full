import React from 'react';
import { useNavigate } from 'react-router-dom';
import './more.css';
import { GrPlan } from "react-icons/gr";
import { useTranslation } from 'react-i18next';

const More = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handlePlanClick = (e) => {
    e.preventDefault();
    navigate('/home/more/plans');
  };

  return (
    <>
      <div className="container px-4 py-5" id="hanging-icons">
        <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
          <div className="col d-flex align-items-start">
            <div className="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
            <GrPlan className="grip"/>
            </div>
            <div>
              <h3 className="fs-2 text-body-emphasis">{t('More2')}</h3>
              <p>{t('More3')}
              <br/>{t('More4')}</p>
              <a href="#" className="btn btn-primary" onClick={handlePlanClick}>
              {t('More5')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default More;
