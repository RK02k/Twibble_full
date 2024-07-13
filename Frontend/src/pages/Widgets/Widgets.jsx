import React from 'react';
import "./Widgets.css";
import SearchIcon from '@mui/icons-material/Search';
// import { TwitterTimelineEmbed, TwitterTweetEmbed } from 'react-twitter-embed';
import { useTranslation } from 'react-i18next';

function Widgets() {
  const { t } = useTranslation();

  return (
    <div className="widgets">
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input type="text" placeholder={t('Outlet1')} />
      </div>
      <div className="widgets__widgetContainer">
        <h2>{t('home2')}</h2>
      </div>
      {/* <TwitterTweetEmbed tweetId={'933354946111705097'} />
      <TwitterTimelineEmbed sourceType="profile" screenName="elonmusk" options={{ height: 400 }} /> */}
    </div>
  );
}

export default Widgets;
