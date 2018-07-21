/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';
import Footer from './Footer';
import Themes from '../styles';

import {
  boxedLayoutMaxWidth,
} from '../styles/variables';

const StyledDashboard = styled.div`
  /* clearfix */
  &:before, &:after {
    display: table;
    content: " ";
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  &:after {
    clear: both;
  }

  /* theme */
  ${props => (props.theme.sidebarBg && `background-color: ${props.theme.sidebarBg};`)}

  min-height: 100vh;
  position: relative;
  overflow: hidden;

  ${props => (props.boxed && `
    max-width: ${boxedLayoutMaxWidth};
    margin: 0 auto;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
    position: relative;
  `)}
`;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this._sidebarToggle = this.sidebarToggle.bind(this);
    
    this.themeProvider = props.defaultValue;
    
    this.state = {
      sidebarCollapse: this.props.initialCollapse,
      theme: this.setTheme('default')   
    };
  }
  
  setTheme(newTheme) {
    return {
      theme: this.themeValues.getTheme(newTheme), // default value
      toggleTheme: (name) => this.setState( {theme: this.setTheme(name)} ),
      getTheme: this.themeValues.getTheme
    }
  }
  
  sidebarToggle() { this.setState({ sidebarCollapse: !this.state.sidebarCollapse }); }

  render() {
    return (
      <StyledDashboard>
        <Themes.Provider value={this.state.theme}>
          <Header
            logoOnClick={this.props.logoOnClick}
            logoHref={this.props.logoHref}
            logoLg={this.props.logoLg}
            logoSm={this.props.logoSm}
            fixed={this.props.fixed}
            sidebarToggle={this._sidebarToggle}
            sidebarCollapse={this.state.sidebarCollapse}
            sidebarMini={this.props.sidebarMini}
          >
            {this.props.navbarChildren}
          </Header>
        
          <Sidebar
            fixed={this.props.fixed}
            sidebarCollapse={this.state.sidebarCollapse}
            sidebarMini={this.props.sidebarMini}
          >
            {this.props.sidebarChildren}
          </Sidebar>
          
          <Content
            fixed={this.props.fixed}
            name="content-wrapper"
            sidebarCollapse={this.state.sidebarCollapse}
            sidebarMini={this.props.sidebarMini}
          >
            {this.props.children}
          </Content>
        
          <Footer
            sidebarCollapse={this.state.sidebarCollapse}
            sidebarMini={this.props.sidebarMini}
          >
            {this.props.footerChildren}
          </Footer>
        </Themes.Provider>
      </StyledDashboard>
    );
  }
}

Dashboard.propTypes = {
  children: React.PropTypes.node,
  logoOnClick: React.PropTypes.func,
  logoHref: React.PropTypes.string,
  logoLg: React.PropTypes.element,
  logoSm: React.PropTypes.element,
  navbarChildren: React.PropTypes.node,
  sidebarChildren: React.PropTypes.node,
  footerChildren: React.PropTypes.node,
  fixed: React.PropTypes.bool,
  sidebarMini: React.PropTypes.bool,
  initialCollapse: React.PropTypes.bool,
  theme: React.PropTypes.string,
};

Dashboard.defaultProps = {
  fixed: false,
  initialCollapse: false,
  sidebarMini: false,
  theme: 'skin-blue',
};

// export a consumer with no parent to receive defaultValue for ThemeContext .. yes we could have imported it but this is cooler !
export default (props)=><Theme.Consumer>{defaultValue=><Dashboard defaultValue={defaultValue} ...props />}</Theme.Consumer>;
