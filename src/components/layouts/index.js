import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Navbar from "../Navbar";
import "./all.sass";

const Layout = ({ children }) => (
  <div>
    <Helmet title="Home | Gatsby + Netlify CMS" />
    <Navbar />
    <div>{children}</div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.object
};

export default Layout;
