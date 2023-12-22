import useFetch from "../../hooks/useFetch";
import "./propertyList.css";

const PropertyList = () => {
  const { data, loading, error } = useFetch("/halls/countByType");


  const images = [
    "https://www.oyorooms.com/blog/wp-content/uploads/2018/03/shutterstock_1012469899.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ78e0qDm3xwX1JDHZLp0CRqiK2BV9qhyJVRzOaxwvXoCh9XUJB1-AEGiKwRkVnXCqh55g&usqp=CAU",
    "https://cdn.pixabay.com/photo/2017/08/06/20/11/wedding-2595862_960_720.jpg",   
    "https://yummycake.in/wp-content/uploads/2021/11/bachelor-party.jpg", 
    "https://images.meesho.com/images/products/231351464/jbzbv_512.webp",  
  ];
  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            images.map((img,i) => (
              <div className="pListItem" key={i}>
                <img
                  src={img}
                  alt=""
                  className="pListImg"

                />
                <div className="pListTitles">
                  <h1  style={{ color: 'White' }}>{data[i]?.type}</h1>
                  
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;