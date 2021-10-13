import { Fragment } from "react";
import NavBar from "../NavBar/NavBar";
import styles from "./About.module.css";
import myPhoto from "../../assets/1631890619659.jpg";

export default function About() {
  return (
    <Fragment>
      <NavBar />
      <div className={styles.mainConteinerAbout}>
        <div className={styles.imageDiv}>
          <img src={myPhoto} alt="A man at the Ocean edge" />
        </div>
        <h6>Developed by: Guillermo Andrada</h6>
        <h6>
          Full Stack Developer || JavaScript || React || Redux || Node.js ||
          Express.js || SQL || Sequelize
        </h6>
        <br />
        <p>
          I’m a Full Stack JavaScript web developer who’s in love with coding
          and computer systems.
        </p>
        <br />
        <p>
          I started learning code in the 2020, with a National Program of
          capacitation promoted by CESSI (Cámara de la Industria Argentina del
          Software). There, I have learnt a bunch about coding and development.
        </p>
        <br />
        <p>Skills: CSS, HTML, PHP, JavaScript, SQL, React.js, Vue.js, Redux, Sequelize, Express.</p>
        <br />
        <p>I define myself as lifetime learner.</p>

        <p>Soft skills: reliable, respectful and problem-solving oriented.</p>
        <p>If you have a project I can help with, please get in touch.</p>
        <br />
        <div className={styles.links}>
          <h6>Contact me:</h6>
          <h5>
            <a href="https://github.com/GuilloSGit" target='_blank' rel="noreferrer">GitHub</a>
          </h5>
          <h5>
            <a href="https://www.linkedin.com/in/guillermo-david-andrada/" target='_blank' rel="noreferrer">
              LinkedIn
            </a>
          </h5>
          <h5>
            <a href="http://www.g-andrada.ga" target='_blank' rel="noreferrer">My Website</a>
          </h5>
        </div>
      </div>
    </Fragment>
  );
}
