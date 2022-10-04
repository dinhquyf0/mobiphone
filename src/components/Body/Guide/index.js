import { useEffect, useState } from "react";
import "../style.css";
import android from "../../../images/Android.svg";
import ios from "../../../images/Ios.svg";
import "./slideshow.style.css";


const Step = ({i, content, stepChoosed, setStepChoosed}) => {

  const onChangeStep = () => {
    setStepChoosed(i); 
    currentSlide(i);
  }
  return (
    <div className="guide-steps-step" onClick={()=>onChangeStep()} choosed={stepChoosed === i ? "true":"false"}>
      <div className="step-order" >
        {i}
      </div>
      <div className="step-content">
        {content}
      </div>
    </div>
  );
};

// Slide show function
var slideIndex = 1;

const showSlide = (n) => {
  let dots = document.querySelectorAll(".dot")
  let slides = document.querySelectorAll(".slide")
  // console.log({dots, slides});
  // if(slides.length && dots.length) {
    if (n > slides.length) {slideIndex = 1} 
    if (n < 1) {slideIndex = slides.length}
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  // }
};

const plusSlides = (n) => {
  showSlide(slideIndex += n);
};

const currentSlide = (n) => {
  showSlide(slideIndex = n);
};
// 

//  Slideshow component
const SlideShow = ({stepChoosed, setStepChoosed, guideSteps}) => {

    useEffect(()=>{
      currentSlide(1)
    }, [guideSteps])

    useEffect(()=>{
      currentSlide(stepChoosed)
    },[stepChoosed])

  const handleClickPreNext = (plus) => {
    plusSlides(plus)
    setStepChoosed(slideIndex)
  }
  
  const Slide = ({img}) => {
    
    return (
      <div className="slide fade" >
      <img alt="guide" src={img} style={{ width: "100%" }}></img>
      {/* <div className="text">Caption Text {i}</div> */}
    </div>
    )
  };
  
  const Dot = ({i}) => {
    const onChangeDot = () => {
      currentSlide(i+1);
      setStepChoosed(i+1)
    }
    return (
      <span className="dot" onClick={()=>onChangeDot()}></span>
      );
    };
    
  return (
    <>
      <div className="prev" onClick={()=>handleClickPreNext(-1)}>
        &#10094;
      </div>
    <div className="slide-show">
      <div className="slideshow-container">
        {guideSteps.map((e)=> <Slide img = {e.image} />)}
      </div>
      <br></br>

      <div style={{ textAlign: "center" }}>
        {guideSteps.map((_, i) => <Dot i={i}/>)}
      </div>
    </div>
      <div className="next" onClick={()=>handleClickPreNext(1)}>
        &#10095;
      </div>
    </>
  );
};






// Entry Guide start
const Guide = ({data}) => {
  const guides = {
    IOS: [...data["1"]],
    Android: [...data["2"]]
  }
  const [guideSteps, setGuideSteps] = useState([]); 
  const [stepChoosed, setStepChoosed] = useState(0);
  const [os, setOs] = useState('');

  useEffect(() => {
    setGuideSteps([...guides.Android])
    setStepChoosed(1)
    setOs('Android')
  }, [data]);

  // reset step choosed when switch os
  useEffect(() => {
    setStepChoosed(1);
  }, [os]);
  
  const handleOSChange = (os) => {
    if(os === 'Android') setGuideSteps(guides.Android);
    else setGuideSteps(guides.IOS);
    setOs(os) ;
  }

  return (
 stepChoosed &&   <div className="body-guide" id="guide">
      <div className="body-guide-container">
        <div className="guide-title">
          <h1>Hướng dẫn kích hoạt eSIM</h1>
          <ul>
            <li choosed = {os==='Android'?'false':'true'} onClick = {()=>handleOSChange('IOS')}>IOS</li>
            <li choosed = {os==='Android'?'true':'false'} onClick = {()=> handleOSChange('Android')}>ANDROID</li>
          </ul>
        </div>
        <div className="guide-steps">
          <div className="guide-steps-text">
            <div className="guide-steps-step">
              <img
                className="guide-steps-os step-order"
                alt="os"
                os=""
                src={os === 'Android' ? android: ios}
              ></img>
              <div className="step-content" os="">
                <h2>Đối với {os}</h2>
                <p>Lưu ý: Bật kết nối Internet trước khi thao tác</p>
              </div>
            </div>
            <div>
            {guideSteps.map((e,i) => <Step i ={i+1} content = {e.title} stepChoosed = {stepChoosed}   setStepChoosed = {setStepChoosed}/>) }
            </div>
          </div>
          <div className="guide-steps-img">
          {<SlideShow stepChoosed={stepChoosed} setStepChoosed = {setStepChoosed} guideSteps={guideSteps}></SlideShow>}  
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
