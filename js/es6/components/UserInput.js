import React from 'react';
import { Form, FormGroup, FormControl, ControlLabel, Button, Dropdown, MenuItem, Tooltip } from 'react-bootstrap';
import { $FB_ACCESS_TOKEN } from '../constants';
export default class UserInput extends React.Component{
	constructor( props ){
		super( props );

		this.state = {
			'subscription': {
				'id': '',
				'keyword': '',
				'mail': '',
				'telephone': '',
				'synonyms': false
			},
			'query': '',
			'openPagesDropdown': false,
			'pagesDropdownItems': [],
			'showKeywordError': false
		};

		this.onSubmit = this.onSubmit.bind( this );
		this.onToggle = this.onToggle.bind( this );
		this.onInputChange = this.onInputChange.bind( this );
		this.onQueryKeyUp = this.onQueryKeyUp.bind( this );
		this.onSelectPage = this.onSelectPage.bind( this );
		this.onQueryInputClick = this.onQueryInputClick.bind( this );

	}
	onInputChange( e, type ){
		const stateDiff = { subscription: Object.assign( {}, this.state.subscription ) };
		stateDiff.subscription[ type ] =  e.target.value;
		this.setState( stateDiff );
	}
	onSubmit( e ){
		e.preventDefault();
		if ( this.state.subscription.keyword.length < 3 && this.state.showKeywordError === false ){
			this.setState( { showKeywordError: true } );
			return;
		}
		if ( this.state.showKeywordError === true ){
			this.setState( { showKeywordError: false } );
		}
		this.props.onSubmit( this.state.subscription );
	}
	onQueryKeyUp( e ) {
		this.setState( { query: e.target.value } );
		if ( !this.state.query.length ) {
			this.setState( { openPagesDropdown: false } );
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
				if ( response && response.error ) {
					console.log( 'sth goes wrong', response.error );
				}
				if ( response && !response.error ) {
					this.setState( {
						pagesDropdownItems: response.data.slice( 0, 10 ).map( el =>
  <MenuItem eventKey={el.id} key={el.id} onSelect={this.onSelectPage}>{el.name}</MenuItem> ),
						openPagesDropdown: true
					} );
				}
			} );
	}
	onSelectPage( eventKey, event ) {
		if ( !this.canModifyState )			{
			return;
		}
		const newSubscription = Object.assign( {}, this.state.subscription );
		newSubscription.id = eventKey;
		this.setState( {
			openPagesDropdown: false,
			subscription: newSubscription
		} );

		this.queryInput.value = event.target.text;
	}
	componentWillMount() {
		this.canModifyState = false;
	}
	componentDidMount() {
		this.canModifyState = true;
	}
	onQueryInputClick() {
		if ( this.state.query.length )			{
			this.setState( { openPagesDropdown: true } );
		}
	}
	onToggle(){
		const newSubscription = Object.assign( {}, this.state.subscription );
		newSubscription.synonyms = !this.state.subscription.synonyms;
		this.setState( { subscription: newSubscription } );
	}
	render(){
		return (
  <Form style={{ 'margin-top': '2rem' }}>
    <FormGroup controlId='formInlineURL'>
      <ControlLabel>Facebook page</ControlLabel>
      {' '}
      <Dropdown id='pages-dropdown' open={this.state.openPagesDropdown} onToggle={() => null}>
        <FormControl type='text' placeholder='Teatr Powszechny'
          inputRef={input => this.queryInput = input}
          onChange={e => this.onInputChange( e, 'id' )}
          onKeyUp={this.onQueryKeyUp}
          onClick={this.onQueryInputClick}
				/>
        <Dropdown.Toggle style={{ display: 'none' }} />
        <Dropdown.Menu>
          {this.state.pagesDropdownItems}
        </Dropdown.Menu>
      </Dropdown>
    </FormGroup>
    <FormGroup controlId='formInlineKeyword'>
      <ControlLabel>Keyword</ControlLabel>
      {( this.state.showKeywordError ) ?
			( <Tooltip style={{ 'display': 'inline', 'margin-left': '8px', 'background-color': '#FF9494' }} placement='right' className='in' id='tooltip-right'>3 characters minimum</Tooltip>
		) : null}
      <FormControl required type='text' placeholder='concert' pattern='.{3,}' title='3 characters minimum' onChange={e => this.onInputChange( e, 'keyword' )} />
    </FormGroup>
    <FormGroup>
      <input id='checkbox-input' type='checkbox' onClick={this.onToggle} />
      <label id='checkbox-input-label' className='custom-checkbox' htmlFor='checkbox-input'>
				search for synonyms as well
			</label>
    </FormGroup>
    <FormGroup controlId='formInlineEmail'>
      <ControlLabel>Email</ControlLabel>
      {' '}
      <FormControl required type='email' placeholder='jane.doe@example.com' onChange={e => this.onInputChange( e, 'mail' )} />
    </FormGroup>
    <FormGroup controlId='formInlineTelephone'>
      <ControlLabel>Telephone <small>(optional)</small></ControlLabel>
      {' '}
      <FormControl type='telephone' placeholder='800 707 112' onChange={e => this.onInputChange( e, 'telephone' )} />
    </FormGroup>
    <FormGroup style={{ height: '50px' }}>
      <Button type='submit' onClick={this.onSubmit} style={{ float: 'right', 'margin-top': '20px', 'font-size': '1rem' }} bsSize='lg'>
			Subskrybuj
			</Button>
    </FormGroup>
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
