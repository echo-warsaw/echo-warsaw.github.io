import React from 'react';
import UserInput from './components/UserInput';
import Header from './components/Header';

export default class App extends React.Component {
	constructor( props ){
		super( props );

		this.onSubmit = this.onSubmit.bind( this );
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
		} ).catch( () => {
			console.error( 'There was some kind of problem with your request...' );
			console.error( error );
		} );
	}
	render(){
		return (
  <div>
    <Header />
    <UserInput onSubmit={this.onSubmit} />
  </div>
		);
	}
}
