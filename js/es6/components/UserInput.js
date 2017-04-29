import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

export default class UserInput extends React.Component{
	constructor( props ){
		super( props );

		this.state = {
			'url': '',
			'keyword': '',
			'email': ''
		};

		this.onSubmit = this.onSubmit.bind( this );
		this.onInputChange = this.onInputChange.bind( this );
	}
	onInputChange( e, type ){
		const stateDiff = {};
		stateDiff[ type ] =  e.target.value;
		this.setState( stateDiff );
	}
	onSubmit( e ){
		e.preventDefault();
		this.props.onSubmit( this.state );
	}
	render(){
		return (
  <Form inline>
    <FormGroup controlId='formInlineURL'>
      <ControlLabel>Strona na facebook{'\''}u</ControlLabel>
      {' '}
      <FormControl type='url' placeholder='www.facebook.com/warszawa'
        className='url-input' onChange={e => this.onInputChange( e, 'url' )} />
    </FormGroup>
    {' '}
    <FormGroup controlId='formInlineKeyword'>
      <ControlLabel>Słowo kluczowe</ControlLabel>
      {' '}
      <FormControl type='text' placeholder='koncert' onChange={e => this.onInputChange( e, 'keyword' )} />
    </FormGroup>
    {' '}
    <FormGroup controlId='formInlineEmail'>
      <ControlLabel>Email</ControlLabel>
      {' '}
      <FormControl type='email' placeholder='jane.doe@example.com' onChange={e => this.onInputChange( e, 'email' )} />
    </FormGroup>
    {' '}
    <Button type='submit' onClick={this.onSubmit}>
    Subskrybuj
    </Button>
  </Form> );
	}
}

UserInput.propTypes = {
	onSubmit: React.PropTypes.func
};

UserInput.defaultProps = {
	onSubmit: ( ...args ) => console.log( 'Data to submit', ...args )
};
