import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons"
import "./reserve.css"
import useFetch from "../../hooks/useFetch"
import { useContext, useState } from "react"
import { SearchContext } from "../../context/SearchContext.js";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { format } from "date-fns"

import jsPDFInvoiceTemplate, {OutputType} from "jspdf-invoice-template";
import { AuthContext } from "../../context/AuthContext"


const Reserve=({setOpen,hallId,hname,hprice})=>{
    const [selectedSlots, setSelectedSlots] = useState([]);
    
    const {data,loading,error}=useFetch(`/halls/slot/${hallId}`)
    const {dates} = useContext(SearchContext);
    const {user}=useContext(AuthContext)
    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        const date = new Date(start.getTime());
    
        const dates = [];
    
        while (date <= end) {
          dates.push(new Date(date).getTime());
          date.setDate(date.getDate() + 1);
        }
    
        return dates;
      };

    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const isAvailable =(slotNumber)=>{
        const isFound=slotNumber.unavailableDates.some(date=>
            alldates.includes(new Date(date).getTime())
            );

        return !isFound
    }

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedSlots(
          checked
            ? [...selectedSlots, value]
            : selectedSlots.filter((item) => item !== value)
        );
        
      };

      const navigate = useNavigate()
      
      const handleClick = async (e) => {
        e.preventDefault()
        try{
            await Promise.all(
                selectedSlots.map((slotId)=>{
                const res=axios.put(`https://eventhub1.onrender.com
                /slots/availabilty/${slotId}`,{
                    dates:alldates,
                });
                
                return res.data
            
            })
            );
            const pdfObject = jsPDFInvoiceTemplate(props);
            setOpen(false)
            navigate("./")
            
        }catch(err){
            
        }
        
      };
      
      var props = {
        returnJsPDFDocObject: true,
        fileName: "Invoice EventHub",
        orientationLandscape: false,
        compress: true,
       
        stamp: {
            inAllPages: true,
            src: "data:image/png;base64,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",
            type: 'JPG', //optional, when src= data:uri (nodejs case)
            width: 20, //aspect ratio = width/height
            height: 20,
            margin: {
                top: 0, //negative or positive num, from the current position
                left: 0 //negative or positive num, from the current position
            }
        },
        business: {
            name: "EventHub",
            address: "Karimnagar, Telangana",
            phone: "123456789",
            email: "contact@support.com",
            
        },
        contact: {
            label: "Invoice issued for:",
            name:user.username,
            address: user.city,
            phone: user.phone,
            email: user.email,
           
        },
        invoice: {
            label: "Invoice #: ",
            num: 18,
            
            headerBorder: false,
            tableBodyBorder: false,
            header: [
              {
                title: "#", 
                style: { 
                  width: 10 
                } 
              }, 
              { 
                title: "Hall Id",
                style: {
                  width: 50
                } 
              }, 
              { 
                title: "Hall Name",
                style: {
                  width: 50
                } 
              }, 
              { 
                title: "Booking Id",
                style: {
                  width: 50
                } 
              },
              
              { title: "Status"}
              
            ],
            table: Array.from(Array(1), (item, index)=>([
                index + 1,
                hallId,
                hname,
                selectedSlots,
                "Confirmed"
            ])),
            additionalRows: [{
              col1: 'Total:',
              col2: "Rs."+hprice,
              col3: 'HALL',
              style: {
                  fontSize: 14 
              }
          },
          {
              col1: 'GST:',
              col2: 'Rs.'+(0.18*hprice),
              col3: '18%',
              style: {
                  fontSize: 10 
              }
          },
          {
              col1: 'SubTotal:',
              col2: "Rs."+(1.18*hprice),
              col3: 'HALL',
              style: {
                  fontSize: 10 
              }
          }],
            invDescLabel: "Invoice Note",
            invDesc: "This Invoice should be presented at the Hall Office for Confirmation.",
        },
        footer: {
            text: "The invoice is created on a computer and is valid without the signature and stamp.",
        },
        pageEnable: true,
        pageLabel: "Page ",
    };
     
    


   
    return(
        <div className="reserve">
            

            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={()=>setOpen(false)}/>
                <span>Select your slot:</span>
                {data.map(item=>(
                    <div className="rItem">
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">Capacity:<b>{item.maxPeople}</b></div>
                            <div className="rPrice">Price:<b>{item.price}</b></div>

                            
                        </div>
                        <div className="rSelectRooms">
                        {item.slotNumbers.map(slotNumber=>(
                            <div className="slot">
                                <label>{slotNumber.number}</label>
                                
                                {!isAvailable(slotNumber) ? "booked":(<input 
                                    type="checkbox" 
                                    value={slotNumber._id}
                                    onChange={handleSelect}
                                    //hidden={!isAvailable(roomNumber)} 
                                />
                                )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <button onClick={handleClick} className="rButton">Book Now!!</button>
               
            </div>
        </div>
    )
}

export default Reserve
