import React from "react";
import TV from "../TV";
import "./Projects.scss";
import eyeIcon from "../../assets/img/eye.svg";
import gitIcon from "../../assets/img/github_icon.svg";
import tvFrame from "../../assets/img/tv-cut2.png";
const assets = { eyeIcon, gitIcon, tvFrame };
const projects = [
  {
    id: 1,
    name: "Company Incomes",
    git: "https://github.com/Ecuki/company-incomes",
    preview: "https://ecuki.github.io/company-incomes/",
    imgs: [
      {
        src: "/img/company/tab_1.jpg",
        alt: "Material Table with companies incomes"
      },
      {
        src: "/img/company/tab_2.jpg",
        alt: "Company details view"
      },
      {
        src: "/img/company/tab_3.jpg",
        alt: "Nivo Bar Chart"
      }
    ]
  },
  {
    id: 2,
    name: "Crazy Balls",
    git: "https://github.com/Ecuki/CrazyBalls",
    preview: "https://ecuki.github.io/CrazyBalls/",
    imgs: [
      {
        src: "/img/crazy_ball/crazy_balls_1.jpg",
        alt: "Gravity simulation"
      },
      {
        src: "/img/crazy_ball/crazy_balls_2.jpg",
        alt: "Score save in local storage"
      },
      {
        src: "/img/crazy_ball/crazy_balls_3.jpg",
        alt: "Scores board"
      },
      {
        src: "/img/crazy_ball/crazy_balls_4.gif",
        alt: "Modern design and beautiful graphics"
      }
    ]
  },
  {
    id: 3,
    name: "Ola i Zuzia",
    git: "https://github.com/Ecuki/OlaZuziaHeruku",
    preview: "https://ola-zuzia.herokuapp.com/",
    imgs: [
      {
        src: "/img/ola_zuzia/ola_zuzia_1.gif",
        alt: "Colorful page for Ola and Zuzia"
      },
      {
        src: "/img/ola_zuzia/ola_zuzia_2.gif",
        alt: "Dynamically generated welcome message and photo"
      },
      {
        src: "/img/ola_zuzia/ola_zuzia_3.gif",
        alt: "Simple chat"
      },
      {
        src: "/img/ola_zuzia/ola_zuzia_4.jpg",
        alt: "Interactive letters"
      }
    ]
  },
  {
    id: 4,
    name: "Portfolio 1.0",
    git: "https://github.com/Ecuki/Portfolio",
    preview: "https://ecuki.github.io/Portfolio/",
    imgs: [
      {
        src: "/img/portfolio/portfolio_1.jpg",
        alt: "Portfolio start page"
      },
      {
        src: "/img/portfolio/portfolio_2.jpg",
        alt: "Flip cards"
      },
      {
        src: "/img/portfolio/portfolio_3.jpg",
        alt: "Simple image slider"
      },
      {
        src: "/img/portfolio/portfolio_4.jpg",
        alt: "Circle image slider"
      },
      {
        src: "/img/portfolio/portfolio_5.gif",
        alt: "Circle image slider"
      }
    ]
  }
];

function Projects() {
  return (
    <div className="projects-site">
      {projects.map(project => (
        <TV key={project.id} {...project} assets={assets} />
      ))}
    </div>
  );
}

export default Projects;
