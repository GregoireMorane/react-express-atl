import React, { Component } from 'react';

class Header extends Component {

	render() {
	  return (
		<div>
			<a href="/" style={{textDecoration:'none'}}><h1
			style={{fontFamily: 'Bad Script',    
			margin: '0 auto 30px auto',
			backgroundColor : '#202e29',
			padding: '30px',
			color: '#c4bcbc'}}>TrouveTonResto xoxo</h1></a>
		</div>
	  );
	}
  }
  
  export default Header;