import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { images } from '../../constants';
import { AppWrap, MotionWrap } from '../../wrapper';
import './Work.scss';

Modal.setAppElement('#root'); // مهم جداً عشان الـ accessibility

const Work = () => {
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('');

  useEffect(() => {
    const dummyData = [
      {
        title: "UI/UX Design Project",
        description: "UI/UX design for an e-commerce platform.",
        imgUrls: [images.project11, images.project12, images.project13, images.project14, images.project15, images.project16],
        projectLink: "https://example.com/uiux",
        codeLink: "https://github.com/user/uiux",
        tags: ["UI/UX"]
      },
      {
        title: "Web App Development",
        description: "Full-stack web application with React and Node.js.",
        imgUrls: [images.project21, images.project22, images.project23, images.project24, images.project25],
        projectLink: "https://example.com/webapp",
        codeLink: "https://github.com/user/webapp",
        tags: ["Web App"]
      },
      {
        title: "Mobile App Development",
        description: "Mobile app clone using React Native.",
        imgUrls: [images.project31, images.project32, images.project33, images.project34, images.project35],
        projectLink: "https://example.com/mobileapp",
        codeLink: "https://github.com/user/mobileapp",
        tags: ["Mobile App"]
      },
      {
        title: "React JS Project",
        description: "A React JS project with Redux for state management.",
        imgUrls: [images.project41, images.project42, images.project43, images.project44],
        projectLink: "https://example.com/reactjs",
        codeLink: "https://github.com/user/reactjs",
        tags: ["React JS"]
      },
      {
        title: "Python Web App",
        description: "A backend application built with Python and Flask.",
        imgUrls: [images.project51, images.project52, images.project53, images.project54],
        projectLink: "https://example.com/python",
        codeLink: "https://github.com/user/pythonapp",
        tags: ["Python"]
      }
    ];



    setWorks(dummyData);
    setFilterWork(dummyData);
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      if (item === 'All') {
        setFilterWork(works);
      } else {
        setFilterWork(works.filter((work) => work.tags.includes(item)));
      }
    }, 500);
  };

  const openModal = (images, title) => {
    setSelectedImages(images);
    setSelectedTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImages([]);
  };

  return (
    <>
      <h2 className="head-text">My Creative <span>Portfolio</span> Section</h2>

      <div className="app__work-filter">
        {['UI/UX', 'Web App', 'Mobile App', 'React JS', 'All'].map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork.map((work, index) => (
          <div className="app__work-item app__flex" key={index}>
            <div className="app__work-img app__flex">
              <Swiper spaceBetween={10} slidesPerView={1}>
                {work.imgUrls && work.imgUrls.map((img, imgIndex) => (
                  <SwiperSlide key={imgIndex}>
                    <img
                      src={img}
                      alt={`${work.title}-${imgIndex}`}
                      className="work-img"
                      onClick={() => openModal(work.imgUrls, work.title)}
                      style={{ cursor: 'pointer' }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                className="app__work-hover app__flex"
              >
                <a href={work.projectLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.90] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
                <a href={work.codeLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.90] }}
                    transition={{ duration: 0.25 }}
                    className="app__flex"
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text" style={{ marginTop: 10 }}>{work.description}</p>

              <div className="app__work-tag app__flex">
                <p className="p-text">{work.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Modal for full screen image slider */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Project Images"
        className="modal"
        overlayClassName="overlay"
      >
        <h3 className="modal-title">{selectedTitle}</h3>
        <Swiper spaceBetween={10} slidesPerView={1}>
          {selectedImages.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={`modal-img-${index}`} className="modal-image" />
            </SwiperSlide>
          ))}
        </Swiper>
        <button onClick={closeModal} className="modal-close">Close</button>
      </Modal>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  'app__primarybg',
);
