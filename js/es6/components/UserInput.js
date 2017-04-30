import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button, Checkbox, Col } from 'react-bootstrap';

export default class UserInput extends React.Component{
	constructor( props ){
		super( props );

		this.state = {
			'url': '',
			'keyword': '',
			'mail': ''
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
  <Form>
    <FormGroup controlId='formInlineURL'>
      <ControlLabel>Facebook page URL</ControlLabel>
      {' '}
      <FormControl type='url' placeholder='www.facebook.com/warszawa'
        className='url-input' onChange={e => this.onInputChange( e, 'url' )} />
    </FormGroup>
    <FormGroup controlId='formInlineKeyword'>
      <ControlLabel>Keyword</ControlLabel>
      {' '}
      <FormControl type='text' placeholder='concert' onChange={e => this.onInputChange( e, 'keyword' )} />
    </FormGroup>
    <FormGroup>
      <Checkbox>search for synonyms as well</Checkbox>
    </FormGroup>
    <FormGroup controlId='formInlineEmail'>
      <ControlLabel>Email</ControlLabel>
      {' '}
      <FormControl type='email' placeholder='jane.doe@example.com' onChange={e => this.onInputChange( e, 'mail' )} />
    </FormGroup>
    <Button type='submit' onClick={this.onSubmit} >
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
