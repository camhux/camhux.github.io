import React from 'react';
import GLink from 'gatsby-link';

const SecondPage = () => (
  <div>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <GLink to="/">Go back to the homepage</GLink>
  </div>
);

export default SecondPage;
