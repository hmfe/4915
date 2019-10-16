import { Link } from "gatsby"
import React from "react"

interface HeaderProps {
  siteTitle: string
}

interface HeaderState {}

class Header extends React.Component<HeaderProps, HeaderState> {
  render() {
    const logotype = require("../images/hm-logo.png")
    return (
      <header id="header">
        <div className="container">
          <Link to="/" className="header-logo">
            <img alt="Logotype" src={logotype} />
          </Link>
          <h1>{this.props.siteTitle}</h1>
        </div>
      </header>
    )
  }
}

export default Header
