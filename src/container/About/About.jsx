import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import './About.scss';
import { urlFor, client } from '../../client';

const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const query = '*[_type == "abouts"]';

    client.fetch(query).then((data) => {
      setAbouts(data);
    });
  }, []);

  return (
    <>
    <h2 className="head-text">About <span className='highlight'>Me</span></h2>
      <p className="about-description">
        I am a <span className="highlight">Front-End Developer</span> and
        <span className="highlight"> JavaScript Developer</span> with extensive experience in
        designing and developing modern, interactive user interfaces.
      </p>

      <p className="about-description">
        I utilize technologies such as
        <span className="highlight"> HTML5</span>,
        <span className="highlight"> CSS3</span>,
        <span className="highlight"> JavaScript</span>, and frameworks like
        <span className="highlight"> React</span> and
        <span className="highlight"> Vue.js</span> to build innovative and user-friendly experiences.
      </p>

      <p className="about-description">
        I excel at developing <span className="highlight">responsive web applications</span> that are
        compatible across all devices and browsers, with a strong focus on
        <span className="highlight"> performance optimization</span> and
        <span className="highlight"> user experience</span>.
      </p>

      <p className="about-description">
        I am passionate about <span className="highlight">learning new technologies</span> and
        working in <span className="highlight">dynamic, innovative development environments</span>.
      </p>

    </>
  );
};

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg',
);
