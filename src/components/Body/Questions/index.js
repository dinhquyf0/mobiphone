import React, { useEffect } from 'react';
import {useState} from 'react'
import Pagination from '@mui/material/Pagination';
import '../style.css'
import button from '../../../images/Path.svg'

var questions = [
{
    questions: '1. Tại 1 thời điểm khách hàng sử dụng được bao nhiêu số thuê bao trên eSIM?',
    answer: 'Chỉ sử dụng “bật” được 1 thuê bao. Tuy nhiên, KH có thể tích hợp nhiều số thuê bao khác nhau của các nhà mạng khác nhau trên 1 eSim.'
},
{
    questions: '2. Khách hàng có thể sử dụng đồng thời eSIM & sim vật lý được không?',
    answer: '2'
},
{
    questions: '3. Khách hàng đang sử dụng sim Dcom,có chuyển sang eSIM được không?',
    answer: '3'
},
{
    questions: '4. Khách hàng đang sử dụng 1 eSIM (được tích hợp 3 số thuê bao trên eSIM & 1 sim vật lý trên cùng 1 thiết bị. Vậy máy có hiển thị vạch sóng của cả 4 sim không?',
    answer: '4'
},
{
    questions: '5. Có thể quét 1 QR code cho 2 thiết bị được không?',
    answer: '5'
}
,{
    questions: '6. Có thể quét 1 QR code cho 2 thiết bị được không?',
    answer: '6'
},{
    questions: '7. Có thể quét 1 QR code cho 2 thiết bị được không?',
    answer: '7'
},{
    questions: '8. Có thể quét 1 QR code cho 2 thiết bị được không?',
    answer: '8'
},{
    questions: '9. Có thể quét 1 QR code cho 2 thiết bị được không?',
    answer: '9'
},
{
    questions: '10. Có thể quét 1 QR code cho 2 thiết bị được không?',
    answer: '10'
},
{
    questions: '11. Có thể quét 1 QR code cho 2 thiết bị được không?',
    answer: '11'
},{
    questions: '12. Có thể quét 1 QR code cho 2 thiết bị được không?',
    answer: '12'
},
{
    questions: '13. Có thể quét 1 QR code cho 2 thiết bị được không?',
    answer: '13'
},
{
    questions: '14. Có thể quét 1 QR code cho 2 thiết bị được không?',
    answer: '14'
},
{
    questions: '15. Có thể quét 1 QR code cho 2 thiết bị được không?',
    answer: '15'
},
{
    questions: '16. Có thể quét 1 QR code cho 2 thiết bị được không?',
    answer: '16'
},
{
    questions: '17. Có thể quét 1 QR code cho 2 thiết bị được không?',
    answer: '17'
},
]




const Question = (ques,ans) => {
    const [hiddenAns, setHiddenAns] = useState(true);
    const showAns = () => {
        setHiddenAns(!hiddenAns)
    }
    return(
    <div className='question-container' id='questions' show = {ques !== undefined ? 'true' : 'false' }>
        <div className='question-q'>
            <input alt='show' onClick={showAns} type={'image'} src={button} style={{width: '16px', height: '9px', margin: 'auto 0', marginLeft: '1rem'}}></input>
            <p onClick={showAns} >{ques}</p>
        </div>
    
        <div className='question-a' hidden = {hiddenAns}>
            <hr></hr>
            <h3>Trả lời</h3>
            <p>{ans}</p>
            
        </div>
    </div>
    )
}



const maxQuestionPerPage = 5;
const pageStart = 1;
const pageCount = Math.ceil(questions.length/maxQuestionPerPage); 



const Questions = () => {
    
    const [questionShowing, setQuestionShowing] = useState([...getQuestions(pageStart)]);
    const [curPage, setCurPage] = useState(pageStart);
    
    const navigatePage = (event, page) => {
        setCurPage(page)
        setQuestionShowing(getQuestions(page))  
    }

    return (
        <div className='body-question'>
                <h1>Câu hỏi thường gặp</h1>
                <div>
                    {questionShowing.map(e => Question(e.questions,e.answer) )}
                </div>
                
                <div className='questions-navigate' style={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
                    <Pagination onChange={navigatePage} count={pageCount} page={curPage}  shape='rounded' ></Pagination>
                </div>
        </div>
    );
}


 function getQuestions(page){
    let start = (page-1)*maxQuestionPerPage;
    let end = (start + maxQuestionPerPage -1) >= (questions.length) ? questions.length: (start + maxQuestionPerPage);
    end--;
    let q = [];
    for(let i = start; i<=end; i++) {
        q.push(questions[i]);
    }
    if (q.length < maxQuestionPerPage) {
        let remain = maxQuestionPerPage - q.length;
        for (var j = 0; j < remain; j++) {
            q.push({questions: undefined, answer: undefined})
        }
    }
    return q;
}


export default Questions;