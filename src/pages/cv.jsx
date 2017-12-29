import React from 'react';
import resumeThumbnail from '../assets/resume_thumbnail.jpg';
import resume from '../assets/resume_2017.pdf';

import linkedinIcon from '../assets/social-icons/linkedin icon.png';
import githubIcon from '../assets/social-icons/github.png';

import styles from './cv.module.scss';

export default () => {
  return (
    <div>
      <p>Find me on websites:</p>

      <a href="https://www.linkedin.com/in/cameroncmartin">
        <img className={styles.socialIcon} src={linkedinIcon} alt="View mt LinkedIn profile" />
      </a>

      <a href="https://github.com/camhux">
        <img className={styles.socialIcon} src={githubIcon} alt="View my GitHub profile" />
      </a>

      <p>View my resume as PDF:</p>
      <a href={resume}>
        <img className={styles.resumeThumbnail} src={resumeThumbnail} alt="View my resume rendered as PDF" />
      </a>
    </div>
  );
};