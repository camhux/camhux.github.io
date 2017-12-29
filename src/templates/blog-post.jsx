import React from 'react';
import Helmet from 'react-helmet';

const Template = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <div>
      <Helmet title={`${post.frontmatter.title} | caameron`} />
      <h1>{post.frontmatter.title}</h1>
      <h2>{post.frontmatter.date}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
};

export default Template;

export const blogPostQuery = graphql`
query BlogPostByPath($path: String!) {
  markdownRemark(frontmatter: { path: { eq: $path } }) {
    html
    frontmatter {
      date(formatString: "MMMM DD, YYYY")
      path
      title
    }
  }
}`;
