import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import Navbar from "../Navbar";
import "./all.sass";

const Layout = ({ children }) => (
  <div>
    <Helmet title="К·Р·А·П·И·В·А" />
    <Navbar />
    <div>{children}</div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.object
};

export default Layout;
