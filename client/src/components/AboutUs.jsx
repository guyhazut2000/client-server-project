import React from "react";
import GuyImage from "../images/guy.png";
import AlonImage from "../images/alon.png";
import ShovalImage from "../images/shoval.png";
import "../css/about.css";

const AboutUs = () => {
  return (
    <div>
      <div className="about-container row d-block mx-5">
        <div className="about-header fw-bold my-auto">
          <h1>About Us</h1>
          <br />
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <p className="text-center fs-4">
              Car Service App is A car service is a health check with routine
              maintenance for your vehicle which assesses everything from your
              engine’s fluid levels to the general wear and tear of your car.
            </p>
            <div className="col-sm-3"></div>
          </div>
        </div>
      </div>

      <br />
      <h1>Meet the programmers of Car Service App</h1>
      <br />
      <br />
      <div class="row fw-bold">
        <div class="col-lg-4">
          <img
            class="rounded-circle"
            src={GuyImage}
            alt="Generic placeholder image"
            width="140"
            height="140"
          />
          <h2>Guy Hazut</h2>
          <p>
            Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.
            Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo
            risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo
            cursus magna.
          </p>
        </div>
        <div class="col-lg-4">
          <img
            class="rounded-circle"
            src={AlonImage}
            alt="Generic placeholder image"
            width="140"
            height="140"
          />
          <h2>Alon Israel</h2>
          <p>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
            eget lacinia odio sem nec elit. Cras mattis consectetur purus sit
            amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor
            mauris condimentum nibh.
          </p>
        </div>
        <div class="col-lg-4">
          <img
            class="rounded-circle"
            src={ShovalImage}
            alt="Generic placeholder image"
            width="140"
            height="140"
          />
          <h2>Shoval Moshe</h2>
          <p>
            Donec sed odio dui. Cras justo odio, dapibus ac facilisis in,
            egestas eget quam. Vestibulum id ligula porta felis euismod semper.
            Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum
            nibh, ut fermentum massa justo sit amet risus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
