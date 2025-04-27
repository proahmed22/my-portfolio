import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReactTooltip from 'react-tooltip';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Skills.scss';

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(query).then((data) => {
      setExperiences(data);
    });

    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <>
<h4 className='head-text'><span>Skills</span> & <span>Experience</span></h4>
      <div className="info-section">
        <div className="skills-section">
          <div className="section-title">
            <h3>Skills</h3>
          </div>
          <ul>
            <li>Problem-Solving</li>
            <li>Time Management</li>
            <li>Communication</li>
            <li>Team Collaboration</li>
            <li>Adaptability</li>
            <li>Attention to Detail</li>
          </ul>
        </div>

        <div className="experience-section">
          <div className="section-title">
            <h3>Experience</h3>
          </div>
          <div className="experience-item">
            <h4>Front-End Developer - DevSpark Solutions</h4>
            <p><strong>Location:</strong> Alexandria, Egypt</p>
            <p><strong>Duration:</strong> Jan 2023 – March 2024</p>
            <ul>
              <li>Built and maintained web apps using Vue.js and Bootstrap.</li>
              <li>Integrated APIs and dynamic rendering logic.</li>
              <li>Proposed UI/UX improvements based on user feedback.</li>
              <li>Delivered clean, maintainable code in agile sprints.</li>
            </ul>
          </div>
        </div>
      </div>


      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="app__skills-exp">
          {experiences.map((experience) => (
            <motion.div
              className="app__skills-exp-item"
              key={experience.year}
            >
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {experience.works.map((work) => (
                  <>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      data-for={work.name}
                      key={work.name}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">{work.company}</p>
                    </motion.div>
                    <ReactTooltip
                      id={work.name}
                      effect="solid"
                      arrowColor="#fff"
                      className="skills-tooltip"
                    >
                      {work.desc}
                    </ReactTooltip>
                  </>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  'app__whitebg',
);
