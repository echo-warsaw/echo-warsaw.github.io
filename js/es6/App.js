import React from 'react';
import UserInput from './components/UserInput';
import ErrorModal from './components/ErrorModal';
import Header from './components/Header';

export default class App extends React.Component {
	constructor( props ){
		super( props );

		this.state = {
			shouldShowError: false
		};

		this.onSubmit = this.onSubmit.bind( this );
		this.hideError = this.hideError.bind( this );
	}
	onSubmit( data ){
		const url = '/api/new';

		const querySettings = {
			method: 'POST',
			body: JSON.stringify( { data } )
		};

		console.log( querySettings.body );

		fetch( url, querySettings ).then( response => {
			if ( response.ok === true ) {
				return response.json();
			}
			throw new Error( 'Query is inalid' );
		} ).then( data => {
			if ( data.statusCode === 400 ){
				throw new Error( 'Server response is far from ok' );
			}
			console.log( 'Everything went alright! ( At least on frontend side ) )' );
		} ).catch( (error) => {
			console.error( 'There was some kind of problem with your request...' );
			console.error( error );
			this.showError();
		} );
	}
	showError(){
		this.setState( { shouldShowError: true } );
	}
	hideError(){
		this.setState( { shouldShowError: false } );
	}
	render(){
		return (
  <div>
    <Header />
    <UserInput onSubmit={this.onSubmit} />
    <ErrorModal onHide={this.hideError} show={this.state.shouldShowError} />
  </div>
		);
	}
}
