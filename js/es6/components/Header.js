import React from 'react';
import { PageHeader } from 'react-bootstrap';

export default class Header extends React.Component {
	constructor(props) {
    super( props );

    this.state = {
			'showCommandPrompt': true
		};
	}
	componentDidMount() {
	  window.setInterval(() => {
	    console.log(this.commandPrompt, this)
	    if (this.state.showCommandPrompt)
	      this.commandPrompt.style.opacity = 0;
	    else
	      this.commandPrompt.style.opacity = 1;

	    this.setState({showCommandPrompt: !this.state.showCommandPrompt})
    }, 1000)
  }
	render() {
		return (
      <PageHeader className='main-header'>
        $echo-warsaw: <span ref={span => this.commandPrompt = span} id="command-prompt">_</span>
        <small className='small-header-text'>get notified about your interests!</small>
      </PageHeader>
		);
	}
}
