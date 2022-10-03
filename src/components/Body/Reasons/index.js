import "../style.css";
import React from "react";
import { useState} from "react";
import parse from 'html-react-parser';

const Reasons = ({data}) => {
  const [reasons] = useState([...data]);
  const changeReasonsShowing = (i) => {
    let listReasons = document.querySelector(".body-reasons-list");
    listReasons.scrollBy({ left: i, top: 0, behavior: "smooth" });
  };

  const Reason = ({ title, content, icon }) => {
    return (
      <div className="body-reasons-reason">
        <div className="reason-icon">
          <img alt="icon" src={icon}></img>
        </div>
        <div className="reason-content">
          <div className="reason-content-title">{parse(title)}</div>
          {/* <hr></hr>
          <p className="reason-content-main">{content}</p> */}
        </div>
      </div>
    );
  };
  return (
     (
      <div className="body-reasons">
        <div className="body-reasons-header">
          <h1>Vì sao bạn cần sử dụng eSIM MobiFone?</h1>
        </div>

        <div className="body-reasons-reasons">
          <button
            className="body-reasons-nextprev"
            onClick={() => changeReasonsShowing(-700)}
          >
          </button>
          <div className="body-reasons-list">
            {reasons.map((e,i) => (
              <Reason  key={i} title={e.description} content={e.content} icon={e.icon} />
            ))}
          </div>
          <button
            className="body-reasons-nextprev"
            onClick={() => changeReasonsShowing(700)}
            style={{ transform: "rotate(0.5turn)" }}
          ></button>
        </div>
      </div>
    )
  );
};

export default Reasons;
