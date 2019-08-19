import React from 'react';
import { Link } from 'react-router'
import 'src/common/css/core-shell.css'

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	currentPath: this.getCurrentPath(),
    	tab: '',
        history: '',
    };
    this.navigateTo = this.navigateTo.bind(this)
    this.onTabsChange = this.onTabsChange.bind(this);
  }
  
  getCurrentPath(){
	  return location.pathname;
  }
  
  onTabsChange(e){
      this.setState({
          tab: e.currentTarget.value,
          history: `${this.state.history} > ${e.currentTarget.value}`
      })
  }
  
  componentWillMount(){
      this.css = {
          swithGroup: {
        	  borderBottom: "none",
      		  boxShadow: "none"
          },
          switchDropDown : {
        	  left: "-75px"
          }
      };
  }
  
  render() {
	  const {tab} = this.state;
	  return (
      <div>
	      <nav className="navbar navbar-default">
		      <div className="container-fluid">
		        HEADER content
		      </div>
	      </nav>
	  </div> 
    );
  }
  navigateTo(url){
	  window.history.pushState(null, null, url)
	  this.setState({currentPath: location.pathname})
  }
}  

function topMenuItems() {
	  return (
			  <div className="navigation">
				HEADER
			 </div>
	  )
	}

function rightTopMenuItems() {
	return (
		<div>	
		     <div onClick={() => this.navigateTo("/alert")} className={ `${ this.state.currentPath === '/alert'  ? 'navbutton-selected' : 'navbutton' }` }><span className="right-navigation-icons dnac-icon-notifications_nobadge_18"></span></div>
		     <div onClick={() => this.navigateTo("/task")} className={ `${ this.state.currentPath === '/task'  ? 'navbutton-selected' : 'navbutton' }` }><span className="right-navigation-icons dnac-icon-taskManager-sm"></span></div>
		     <div onClick={() => this.navigateTo("/help")} className={ `${ this.state.currentPath === '/help'  ? 'navbutton-selected' : 'navbutton' }` }><span className="right-navigation-icons dnac-icon-help_18"></span></div>
		     <div className={ `${ this.state.currentPath === '/settings'  ? 'navbutton-selected' : 'navbutton' }` }>
		        <span className="right-navigation-icons dnac-icon-clients-monochrome"></span>
		     </div>
	    </div>
	)
}
