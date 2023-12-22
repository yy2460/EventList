import "./slider.css";
import { faCircleArrowLeft, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Slider = () => {

    const photos = [
       
        {
            src:"https://upload.wikimedia.org/wikipedia/commons/a/a1/Karimnagar_railway_station_1.jpg",
        },
        {
            src:"https://media-cdn.tripadvisor.com/media/photo-m/1280/0f/98/f7/df/charminar.jpg",

        },
        {
            src:"https://cityvillagenews.com/wp-content/uploads/2022/08/warangal.jpg",
        },
        
        
      ];
    const [slideNumber,setSlideNumber]= useState(0);
    const handleMove = (direction) => {
        let newSlideNumber;

        if (direction === "l") {
        newSlideNumber = slideNumber === 0 ? 2 : slideNumber - 1;
        } else {
        newSlideNumber = slideNumber === 2 ? 0 : slideNumber + 1;
        }

        setSlideNumber(newSlideNumber)
    };

    
    
      const navigate=useNavigate();
      const handleClick=(e)=>{
        if(slideNumber==0){
            navigate("/halls/karimnagar")
        }
        else if(slideNumber==1){
            navigate("/halls/hyderabad")
        }
        else if(slideNumber==2){
            navigate("/halls/warangal")
        }
      }

    

    return (
        <div>
           
            <div className="slider1">
                <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
                />
                <div className="sliderWrapper1">
                <img onClick={handleClick} src={photos[slideNumber].src} alt="" className="sliderImg1" />
                </div>
                <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow1"
                onClick={() => handleMove("r")}
                />
            </div>
        </div>
        
    );
};

export default Slider;