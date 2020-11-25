import React from "react";
import { Avatar } from "@material-ui/core";

const AppsList = ({ appsList__container__className }) => {
  return (
    <div className={`appsList__container ${appsList__container__className}`}>
      <div className="appsRow rowOne">
        <App
          title="Account"
          needAvatar
          specificTitleClass="accountClass"
          appRedirect__link="#"
        />
        <App
          title="Google"
          specificImageSrc="https://i.ibb.co/ckgWK7J/g.png"
          appRedirect__link="#"
        />
        <App
          title="Youtube"
          specificImageSrc="https://i.ibb.co/q18kwVD/yt.png"
          appRedirect__link="#"
        />
      </div>
      <div className="appsRow rowTwo">
        <App
          title="Drive"
          specificImageSrc="https://i.ibb.co/wzBwZDz/d.png"
          specificImageClass="driveLogo"
          appRedirect__link="#"
        />

        <App
          title="Gmail"
          specificImageSrc="https://i.ibb.co/7jLkSZ5/gm.png"
          specificImageClass="gmailLogo"
          appRedirect__link="#"
        />

        <App
          title="Play"
          specificImageSrc="https://i.ibb.co/TPbZHRh/play.png"
          specificImageClass="playstoreLogo"
          appRedirect__link="#"
        />
      </div>
      <div className="appsRow rowThree">
        <App
          title="Photos"
          specificImageSrc="https://i.ibb.co/xmghVD1/p.png"
          specificImageClass="photosClass"
          appRedirect__link="#"
        />
        <App
          title="Translate"
          specificImageSrc="https://i.ibb.co/rwRfNgs/t.png"
          specificImageClass="translateClass"
          appRedirect__link="#"
        />
        <App
          title="Contacts"
          specificImageSrc="https://i.ibb.co/wQmsTbM/c.png"
          specificImageClass="contactsClass"
          appRedirect__link="#"
        />
      </div>
      <div className="appsRow rowFour">
        <App
          title="Drive"
          specificImageSrc="https://i.ibb.co/4tjmjQ6/m.png"
          specificImageClass="mapsLogo"
          appRedirect__link="#"
        />
        <App
          title="Meet"
          specificImageSrc="https://i.ibb.co/f2tn2wN/duo.png"
          appRedirect__link="#"
        />
        <App
          title="Calender"
          specificImageSrc="https://i.ibb.co/1GJwt08/cal.png"
          specificImageClass="calenderLogo"
          appRedirect__link="#"
        />
      </div>
    </div>
  );
};

function App({
  specificImageClass,
  specificImageSrc,
  specificTitleClass,
  title,
  needAvatar,
  appRedirect__link,
}) {
  return (
    <div className="App">
      <a href={appRedirect__link}>
        <div className="appsIcon__box">
          {needAvatar && <Avatar className="appsList__avatar" />}
          <img
            className={`appsList__image ${specificImageClass} ${
              needAvatar && "avatarExtra__margin"
            }`}
            src={specificImageSrc}
          />
        </div>

        <p className={` appsList__title ${specificTitleClass}`}>{title}</p>
      </a>
    </div>
  );
}

export default AppsList;
