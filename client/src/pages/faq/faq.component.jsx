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
    {/* <div className="faq-container">
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
    </div> */}
    <div className="faq-container">
      <h1 className="title-faq">Frequently Asked Questions</h1>
      <div className="faq-question-container">
        <div className="faq-qn">
          1. What is the timing and duration of the competition?
        </div>
        <div className="faq-answer">
          The Competition site will be open from 29th January 2022 (Saturday)
          10:00am to 30th January 2022 (Sunday) 6:00pm. So you will have 44
          hours to complete the challenge.
        </div>
        <div className="faq-qn">
          2. How do I go about answering the MCQ/MSQ Questions?
        </div>
        <div className="faq-answer">
          Navigate around Tiong Bahru and click on the location to view and
          answer question. You are allowed to pick only 1 answer for MCQ
          Questions and multiple answers for MSQ questions.
        </div>
        <div className="faq-qn">
          3. How do I go about answering the Coding Questions?
        </div>
        <div className="faq-answer">
          Navigate around Tiong Bahru and click on the location to view the
          coding question. You can code the answer to the question on Google
          Colab or any other IDE (VSC, PyCharm etc.) Please do note that we have
          given Example input and output so that you can understand the
          questions better. Please download your code as a .py file and upload
          it onto the platform by clicking on the “upload” button below the
          question description. Also, please fill in the final result you got
          from running the code into the output box if the question asks you to
          do so.
        </div>
        <div className="faq-qn">4. Can I resubmit my answers?</div>
        <div className="faq-answer">
          You can submit the MCQ and the MSQ answers only once, hence please
          submit the MCQ and MSQ Answers through only one of your group member’s
          account. However, you are allowed to submit your code to the coding
          questions multiple times. We will take your last submission as the
          final submission.
        </div>
        <div className="faq-qn">5. How are our answers graded?</div>
        <div className="faq-answer">
          Each correct MCQ or MSQ question is awarded 5 marks. The total score
          for each coding question is double of the points you see on the
          website. Half of the marks will be awarded by the system which checks
          whether or not you have gotten the correct output, while the rest half
          of the marks are awarded by the Organising Committee who will manually
          look through the code and give you extra marks based on the following
          criteria:
        </div>
        <div>Cleanliness of Code:</div>
        <ul>
          <li>
            Have you added comments to explain your code and your thought
            process behind the code?
          </li>
          <li>Have you got your indentation correct?</li>
          <li>Can other people who have never seen your code understand it?</li>
        </ul>
        <div>Efficient Coding:</div>
        <ul>
          <li>Have you used functions where it can be used?</li>
          <li>Have you used the optimal loop to solve the question?</li>
        </ul>
        <div>Resilience of Code:</div>
        <ul>
          <li>Has the code been able to pass the hidden test cases?</li>
        </ul>

        <div className="faq-qn">6. Am I allowed to Google?</div>
        <div className="faq-answer">
          Yes you may Google to resolve errors and understand the concepts such
          as how exactly do functions work etc. DO NOT copy paste readily
          available code from online sources as that would be plagiarism and
          this could possible result in disqualification if caught. Instead,
          please refer to the PDF notes and the Google Colab Notebooks that we
          have sent for references.
        </div>
        <div className="faq-qn">7. Where can I see my Group Scores?</div>
        <div className="faq-answer">
          You can Navigate to the Leaderboard Page to see your Groups Standing.
          You can also navigate to the Groups page to see your Groups Progress.
        </div>
        <div className="faq-qn">
          8. When will I get to know the outcome of the Coding Competition?
        </div>
        <div className="faq-answer">
          You will get to know the results of the Coding Competition through
          Email along with your E-certificates on 14th February 2022.
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
