import React, { useRef, useEffect } from "react";
import Button from "../Button";
import "./Home.scss";
import ship from "../../assets/img/ship.png";
import { gsap, MotionPathPlugin } from "gsap/all";

const motionPathData =
  "M-399.25379,-340.71797 C-399.25379,-340.71797 386.70813,-284.92113 420.50613,-152.49513 454.28013,-20.09013 -159.91287,-245.09513 -159.91287,-91.90313 -159.91287,61.26087 378.10113,-103.60513 384.90413,21.27287 391.70213,146.13787 122.70503,104.22685 122.70503,104.22685 ";

const exitPathData =
  "M579.41621,-174.11096 C579.41621,-174.11096 502.92821,-184.48396 411.31121,-159.05496 309.72221,-130.85696 292.54621,-121.82696 196.91321,-90.59496 134.95521,-70.35696 62.36621,-19.28196 55.60721,29.13604 48.81421,77.74604 120.07209,102.90601 120.07209,102.90601 ";

function Home() {
  const welcome = useRef(null);

  useEffect(() => {
    const welcomeSection = welcome.current.children;
    const { title, subtitle, projects, contact, ship } = welcomeSection;
    gsap.registerPlugin(MotionPathPlugin);
    gsap.set([title, subtitle, projects, contact], { autoAlpha: 0 });
    gsap.set(ship, {
      xPercent: -50,
      yPercent: -20,
      autoAlpha: 1,
      transformOrigin: "50% 50%"
    });
    const tl = gsap.timeline({ defaults: { ease: "Power0.easeNone" } });
    tl.fromTo(
      title,
      { x: "-=300" },
      { duration: 0.7, x: "+=300", autoAlpha: 1 }
    )
      .fromTo(
        subtitle,
        { x: "-=300" },
        { duration: 0.7, x: "+=300", autoAlpha: 1 }
      )
      .fromTo(
        projects,
        { x: "-=300" },
        { duration: 0.5, x: "+=300", autoAlpha: 1 }
      )
      .fromTo(
        contact,
        { x: "+=300" },
        { duration: 0.5, x: "-=300", autoAlpha: 1 },
        "-=.5"
      );

    function alien() {
      var tl = gsap
        .timeline({ defaults: { ease: "Power1.easeOut" } })
        .addLabel("tiltOne", 0.2)
        .addLabel("tiltTwo", 0.7)
        .addLabel("tiltThree", 1.6)
        .to(
          ship,
          {
            duration: 10,
            immediateRender: true,
            ease: "Elastic.easeOut.config(1, 1.2)",
            motionPath: motionPathData
          },
          0
        )
        .from(
          ship,
          {
            duration: 4,
            scale: 0.1,
            immediateRender: false
          },
          0
        )
        .to(
          ship,
          {
            duration: 0.5,
            rotate: "15deg",
            ease: "Power1.easeInOut"
          },
          "tiltOne"
        )
        .to(
          ship,
          {
            duration: 0.5,
            rotate: "-15deg",
            ease: "Power1.easeInOut"
          },
          "tiltTwo"
        )
        .to(
          ship,
          {
            duration: 0.5,
            rotate: "15deg",
            ease: "Power1.easeInOut"
          },
          "tiltThree"
        )
        .to(
          ship,
          {
            duration: 0.7,
            rotate: "0deg",
            ease: "Back.easeOut.config(8)"
          },
          "tiltThree+=1"
        );

      return tl;
    }

    gsap.timeline({ defaults: { ease: "Power1.easeOut" } }).add(alien(), 0.5);
  }, []);

  return (
    <div className="home">
      <div ref={welcome} className="welcome">
        <h1 className="title" id="title">
          Hi, I'm Emil
        </h1>
        <h2 id="subtitle">let's get to know each other</h2>
        <Button
          id="projects"
          className="projects"
          text="projects"
          to="/React_Portfolio/projects"
        />
        <Button
          id="contact"
          className="contact"
          text="contact"
          to="/React_Portfolio/contact"
        />
        <img
          className="ship"
          id="ship"
          src={ship}
          alt="UFO ship"
          style={{
            visibility: "hidden",
            height: 50,
            width: 50,
            position: "absolute",
            top: 400,
            left: 200
          }}
        ></img>
      </div>
    </div>
  );
}

export default Home;
