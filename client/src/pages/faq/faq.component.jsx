import React from "react";

import "./faq.styles.css";

import Instagram from "./instagram.png";
import Telegram from "./telegram.png";
import Facebook from "./facebook.png";
import Whatsapp from "./whatsapp.png";
import Gmail from "./gmail.png";

// https://icons8.com/icons/set/gmail

const FaqPage = () => (
  <div className="faq-page-container">
    <div className="faq-container">
      <h1 className="title-faq">Rules and Regulations</h1>
      <ol className="rnr-list">
        <li>Rule 1</li>
        <li>Rule 2 jhvw,v jv,ek</li>
        <li>
          Rule 3 sjkhk cjsbvkvk jgr cdg wfe. huekb ugf efei ecec.ec oecece
          cjwgceck cwegevwjcgwdkcwhc cjw ewece cgu ecdcgc ehg Rule 3 sjkhk
          cjsbvkvk jgr cdg wfe. huekb ecec.ec oece shjd skhk ce cjwgceck
          cwegevwjcgwdkcwhc cjw ewece cgu ecdcgc ehg
        </li>
      </ol>
    </div>
    <div className="faq-container">
      <h1 className="title-faq">Frequently Asked Questions</h1>
      <div className="faq-question-container">
        <div classsName="faq-question">
          1. What time does the competition end?
        </div>
        <div className="faq-answer">
          The competition will end at 10.20 pm on Sunday. You will no longer be
          able to...
        </div>
      </div>
    </div>
    <div className="faq-container">
      <h1 className="title-faq">Contact Us</h1>
      <div className="contact-item">
        <img src={Gmail} alt="gmail" className="contact-item-icon" />
        <span className="contact-item-content">tiongbahruyec@gmail.com</span>
      </div>
      <div className="contact-item">
        <img src={Whatsapp} alt="whatsapp" className="contact-item-icon" />
        <span className="contact-item-content">tiongbahruyec@gmail.com</span>
      </div>
      <div className="contact-item">
        <img src={Facebook} alt="facebook" className="contact-item-icon" />
        <span className="contact-item-content">tiongbahruyec@gmail.com</span>
      </div>
      <div className="contact-item">
        <img src={Instagram} alt="insta" className="contact-item-icon" />
        <span className="contact-item-content">tiongbahruyec@gmail.com</span>
      </div>
      <div className="contact-item">
        <img src={Telegram} alt="tele" className="contact-item-icon" />
        <span className="contact-item-content">tiongbahruyec@gmail.com</span>
      </div>
    </div>
  </div>
);

export default FaqPage;
