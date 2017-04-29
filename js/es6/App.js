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
			body: { data }
		};

		console.log( querySettings.body );

		fetch( url, querySettings ).then( ( ...args ) => {
	     console.log( ...args );
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
