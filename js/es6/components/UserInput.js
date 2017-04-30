import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button, DropdownMenu, Dropdown, Input, MenuItem, DropdownToggle, Checkbox } from 'react-bootstrap';
import {$FB_ACCESS_TOKEN} from '../constants';

export default class UserInput extends React.Component{
	constructor( props ){
		super( props );

		this.state = {
			'subscription': {
				'id': '',
				'keyword': '',
				'mail': ''
			},
			'query': '',
			'openPagesDropdown': false,
			'pagesDropdownItems': []
		};

		this.onSubmit = this.onSubmit.bind( this );
		this.onInputChange = this.onInputChange.bind( this );
		this.onQueryKeyUp = this.onQueryKeyUp.bind( this );
		this.onSelectPage = this.onSelectPage.bind( this );
		this.onQueryInputClick = this.onQueryInputClick.bind( this );

	}
	onInputChange( e, type ){
		const stateDiff = {subscription: Object.assign({}, this.state.subscription)};
		stateDiff.subscription[ type ] =  e.target.value;
		this.setState( stateDiff );
	}
	onSubmit( e ){
		e.preventDefault();
		this.props.onSubmit( this.state.subscription );
	}
	onQueryKeyUp( e ) {
		this.setState({query: e.target.value});
		if ( !this.state.query.length ) {
			this.setState({openPagesDropdown: false});
			return;
		}

		FB.api(
			'/search',
			{
				'access_token': $FB_ACCESS_TOKEN,
				'type': 'page',
				'q': this.state.query
			},
			response => {
				if ( response && response.error) {
					console.log( 'sth goes wrong', response.error );
				}
				if ( response && !response.error ) {
					this.setState({
						pagesDropdownItems: response.data.slice(0, 10).map( el =>
							<MenuItem eventKey={el.id} key={el.id} onSelect={this.onSelectPage}>{el.name}</MenuItem> ),
						openPagesDropdown: true
					});
				}
			} );
	}
	onSelectPage( eventKey, event ) {
		if (!this.canModifyState)
			return;
		const newSubscription = Object.assign({}, this.state.subscription);
		newSubscription.id = eventKey;
		this.setState({
			openPagesDropdown: false,
			subscription: newSubscription
		});
		
		this.queryInput.value = event.target.text
	}
	componentWillMount() {
		this.canModifyState = false;
	}
	componentDidMount() {
		this.canModifyState = true;
	}
	onQueryInputClick() {
		if (this.state.query.length)
			this.setState({openPagesDropdown: true});
	}
	render(){
		return (
  <Form>
    <FormGroup controlId='formInlineURL'>
      <ControlLabel>Facebook page</ControlLabel>
      {' '}
			<Dropdown id="pages-dropdown" open={this.state.openPagesDropdown} onToggle={(isOpen) => null}>
				<FormControl type='text' placeholder='Teatr Powszechny'
										 inputRef={input => this.queryInput = input}
										 // onBlur={(e) => {this.setState({openPagesDropdown: false}); console.log(e.target); }}
										 onChange={e => this.onInputChange( e, 'id' )}
										 onKeyUp={this.onQueryKeyUp}
										 onClick={this.onQueryInputClick}
				/>
				<Dropdown.Toggle style={ {display: 'none'} }/>
				<Dropdown.Menu>
					{this.state.pagesDropdownItems}
				</Dropdown.Menu>
    	</Dropdown>
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
		<FormGroup controlId='formInlineTelephone'>
      <ControlLabel>Telephone</ControlLabel>
      {' '}
      <FormControl type='telephone' placeholder='800 707 112' onChange={e => this.onInputChange( e, 'mail' )} />
    </FormGroup>
    <Button type='submit' onClick={this.onSubmit} >
    Subskrybuj
    </Button>
  </Form>
		);
	}
}

UserInput.propTypes = {
	onSubmit: React.PropTypes.func
};

UserInput.defaultProps = {
	onSubmit: ( ...args ) => console.log( 'Data to submit', ...args )
};
