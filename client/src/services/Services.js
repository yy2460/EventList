import Navbar from "../components/navbar/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import "./services.css";

const Services = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div class="services">
        <br />
        <br />
        <h1 style={{ color: "black" }}>Our Services</h1>
        <div class="cen">
          <div class="service">
            <i class="fas fa-anchor"></i>
            <h2 style={{ color: "black" }}>Marriage</h2>
            <p>
              A Happy marriage is a long conversation which always seems too
              short.
            </p>
          </div>

          <div class="service">
            <i class="fab fa-android"></i>
            <h2 style={{ color: "black" }}>Birthday Parties</h2>
            <p> Another adventure filled year awaits you.</p>
          </div>

          <div class="service">
            <i class="fab fa-angellist"></i>
            <h2 style={{ color: "black" }}>Engagements</h2>
            <p>The next chapter of the story begins.</p>
          </div>

          <div class="service">
            <i class="fas fa-apple-alt"></i>
            <h2 style={{ color: "black" }}>Bachelor Parties</h2>
            <p>Enjoy While you are young!</p>
          </div>

          <div class="service">
            <i class="fas fa-archway"></i>
            <h2 style={{ color: "black" }}>Anniversary Functions</h2>
            <p>The day of Memorable Events.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
