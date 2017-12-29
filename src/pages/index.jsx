import React from 'react';
import GLink from 'gatsby-link';

const IndexPage = ({ data }) => {
  const { edges } = data.allMarkdownRemark;

  return (
    <div>
      {
        edges
          .filter(edge => edge.node.frontmatter.title.length > 0)
          .map(edge => (
            <div>
              <h1>
                <GLink to={edge.node.frontmatter.path}>{edge.node.frontmatter.title}</GLink>
              </h1>
              <h2>{edge.node.frontmatter.date}</h2>
              <p>{edge.node.excerpt}</p>
            </div>
          ))
      }
    </div>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
          }
        }
      }
    }
  }
`;
