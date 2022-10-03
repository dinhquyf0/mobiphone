import React, { useEffect } from "react";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import "../style.css";
import button from "../../../images/Path.svg";

const pageStart = 1;
const maxQuestionPerPage = 5;

const Question = ({ques, ans}) => {
  const [hidden, setHidden] = useState(true);

  useEffect(()=>{
    setHidden(true)
  },[ques,ans])
  
  return (
    <div className="question-container" id="questions">
      <div className="question-q">
        <input
          alt="show"
          onClick={() =>setHidden(!hidden)}
          type={"image"}
          src={button}
          style={{
            width: "16px",
            height: "9px",
            margin: "auto 0",
            marginLeft: "1rem",
          }}
        ></input>
        <p  onClick={() =>setHidden(!hidden)}>{ques}</p>
      </div>

      <div className="question-a" hidden={hidden}>
        <hr></hr>
        <h3>Trả lời</h3>
        <p>{ans}</p>
      </div>
    </div>
  );
};

const Questions = ({data}) => {

  const [questions] = useState([...data]);
  const [questionShowing, setQuestionShowing] = useState([...getQuestions(pageStart, questions)]);
  const [curPage, setCurPage] = useState(pageStart);
  const [pageCount] = useState(Math.ceil(questions.length / maxQuestionPerPage));


  const navigatePage = (event, page) => {
    setCurPage(page);
    setQuestionShowing([...getQuestions(page, questions)]);

  };

  return (
  <div className="body-question">
      <h1>Câu hỏi thường gặp</h1>
      {questionShowing.map((e,i) => (<Question  key={i} ques={e.question} ans={e.answer}/>))}
      <div  className="questions-navigate"  
      >
        <Pagination
          onChange={(e, page) => navigatePage(e, page)}
          count={pageCount}
          page={curPage}
          shape="rounded"
        ></Pagination>
      </div>
    </div>
  );
};

function getQuestions(page, questions) {
  let start = (page - 1) * maxQuestionPerPage;
  let end = start + maxQuestionPerPage - 1 >= questions.length ? questions.length  : start + maxQuestionPerPage;
  end--;
  let q = [];
  for (let i = start; i <= end; i++) {
    q.push(questions[i]);
  }
  return q;
}

export default Questions;
