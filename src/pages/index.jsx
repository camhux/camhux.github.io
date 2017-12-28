import React from 'react';
import GLink from 'gatsby-link';

const IndexPage = () => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <GLink to="/page-2/">Go to page 2</GLink>
  </div>
);

export default IndexPage;
