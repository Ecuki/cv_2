import React from "react";
import TV from "../TV";
import "./Projects.scss";

const projects = [
  {
    id: 1,
    name: "Company Incomes",
    git: "https://github.com/Ecuki/company-incomes",
    preview: "https://ecuki.github.io/company-incomes/",
    imgs: [
      {
        src: "/React_Portfolio/img/company/tab_1.jpg",
        alt: "Material Table with companies incomes"
      },
      {
        src: "/React_Portfolio/img/company/tab_2.jpg",
        alt: "Company details view"
      },
      {
        src: "/React_Portfolio/img/company/tab_3.jpg",
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
        src: "/React_Portfolio/img/crazy_ball/crazy_balls_1.jpg",
        alt: "Gravity simulation"
      },
      {
        src: "/React_Portfolio/img/crazy_ball/crazy_balls_2.jpg",
        alt: "Score save in local storage"
      },
      {
        src: "/React_Portfolio/img/crazy_ball/crazy_balls_3.jpg",
        alt: "Scores board"
      },
      {
        src: "/React_Portfolio/img/crazy_ball/crazy_balls_4.gif",
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
        src: "/React_Portfolio/img/ola_zuzia/ola_zuzia_1.gif",
        alt: "Colorful page for Ola and Zuzia"
      },
      {
        src: "/React_Portfolio/img/ola_zuzia/ola_zuzia_2.gif",
        alt: "Dynamically generated welcome message and photo"
      },
      {
        src: "/React_Portfolio/img/ola_zuzia/ola_zuzia_3.gif",
        alt: "Simple chat"
      },
      {
        src: "/React_Portfolio/img/ola_zuzia/ola_zuzia_4.jpg",
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
        src: "/React_Portfolio/img/portfolio/portfolio_1.jpg",
        alt: "Portfolio start page"
      },
      {
        src: "/React_Portfolio/img/portfolio/portfolio_2.jpg",
        alt: "Flip cards"
      },
      {
        src: "/React_Portfolio/img/portfolio/portfolio_3.jpg",
        alt: "Simple image slider"
      },
      {
        src: "/React_Portfolio/img/portfolio/portfolio_4.jpg",
        alt: "Circle image slider"
      },
      {
        src: "/React_Portfolio/img/portfolio/portfolio_5.gif",
        alt: "Circle image slider"
      }
    ]
  }
];

function Projects() {
  return (
    <div className="projects-site">
      {projects.map(project => (
        <TV key={project.id} {...project} />
      ))}
    </div>
  );
}

export default Projects;
