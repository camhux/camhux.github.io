import React from 'react';
import PropTypes from 'prop-types';
import GLink from 'gatsby-link';
import Helmet from 'react-helmet';

import './index.css';
import styles from './index.module.scss';

const HeaderItem = (props) => {
  const isActive = new RegExp(`^${props.slug}(\b|$)`).test(props.pathname);

  return (
    <div className={`${styles.headerLink} ${isActive ? styles.active : ''}`} >
      <GLink to={`${props.slug}`}>
        {props.children}
      </GLink>
    </div>
  );
};

HeaderItem.propTypes = {
  slug: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
};

const Header = ({ location }) => {
  const { pathname } = location;

  return (
    <div
      className={styles.header}
    >
      <h1 className={styles.pageTitleWrapper}>
        <GLink
          to="/"
          className={styles.pageTitleLink}
        >
          C<span className={styles.pageTitleHighlight}>a</span>ameron
        </GLink>
      </h1>
      <HeaderItem slug="/" pathname={pathname}>Blog</HeaderItem>
      <HeaderItem slug="/about" pathname={pathname}>About</HeaderItem>
      <HeaderItem slug="/cv" pathname={pathname}>CV</HeaderItem>
    </div>
  );
};

const TemplateWrapper = ({ children, location }) => (
  <div>
    <Helmet
      title="caameron"
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <Header location={location} />
    <div className={styles.pageContent}>
      {children()}
    </div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

TemplateWrapper.defaultProps = {
  children: () => {},
};

export default TemplateWrapper;
