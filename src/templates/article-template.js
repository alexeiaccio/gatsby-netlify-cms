import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { Link } from "gatsby";
import { graphql } from "gatsby";

import Content, { HTMLContent } from "../components/Content";
import Layout from "../components/layouts";

export const ArticleTemplate = ({
  authors,
  content,
  contentComponent,
  date,
  description,
  tags,
  title,
  helmet
}) => {
  const ArticleContent = contentComponent || Content;
  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            {authors && authors.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <div className="taglist">
                  <span>·</span>
                  {authors.map(author => (
                    <span key={author + `author`}> {author} ·</span>
                  ))}
                </div>
              </div>
            ) : null}
            <span>
              |&ensp;
              {date}
            </span>
            <p>{description}</p>
            <ArticleContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

ArticleTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.instanceOf(Object)
};

const Article = ({ data }) => {
  const { markdownRemark: article } = data;
  return (
    <Layout>
      <ArticleTemplate
        authors={article.frontmatter.authors}
        content={article.html}
        contentComponent={HTMLContent}
        date={article.frontmatter.date}
        description={article.frontmatter.description}
        helmet={<Helmet title={article.frontmatter.title} />}
        tags={article.frontmatter.tags}
        title={article.frontmatter.title}
      />
    </Layout>
  );
};

Article.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default Article;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        authors
        date(formatString: "DD MMMM YYYY")
        title
        description
        tags
      }
    }
  }
`;
