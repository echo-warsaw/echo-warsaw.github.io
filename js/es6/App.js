import React from 'react';
import UserInput from './components/UserInput';
import { ErrorModal, OkModal } from './components/modals';
import Header from './components/Header';

export default class App extends React.Component {
	constructor( props ){
		super( props );

		this.state = {
			shouldShowError: false,
			shouldShowOkMessage: false,
		};

		this.onSubmit = this.onSubmit.bind( this );
		this.hideError = this.hideError.bind( this );
		this.hideOkMessage = this.hideOkMessage.bind( this );
	}
	onSubmit( data ){
		const url = '/api/new';

		const querySettings = {
			method: 'POST',
			body: JSON.stringify( { data } )
		};

		fetch( url, querySettings ).then( response => {
			if ( response.ok === true ) {
				return response.json();
			}
			throw new Error( 'Query is invalid' );
		} ).then( data => {
			if ( data.statusCode === 500 ){
				throw new Error( 'Server response is far from ok' );
			} else {
				this.showOkMessage();
			}
		} ).catch( () => {
			this.showError();
		} );
	}
	showError(){
		this.setState( { shouldShowError: true } );
	}
	hideError(){
		this.setState( { shouldShowError: false } );
	}
	showOkMessage(){
		this.setState( { shouldShowOkMessage: true } );
	}
	hideOkMessage(){
		this.setState( { shouldShowOkMessage: false } );
	}
	render(){
		return (
  <div className='main-container'>
    <Header />
    <UserInput onSubmit={this.onSubmit} />
    <ErrorModal onHide={this.hideError} show={this.state.shouldShowError} />
    <OkModal onHide={this.hideOkMessage} show={this.state.shouldShowOkMessage} />
  </div>
		);
	}
}
