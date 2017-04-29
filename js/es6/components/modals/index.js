import React from 'react';
import MessageModal from './MessageModal';

const errorContent = {
	title: 'Your request has been rejected :(',
	body: 'Try checking your internet connection or if your facebook page url is valid',
	button: 'Close'
};

export const ErrorModal = props => ( ( <MessageModal {...props} content={errorContent} /> ) );

const okContent = {
	title: 'You have succesfully subscribed :)',
	body: 'Now you can relax and wait more mails with interesting posts to come.',
	button: 'Alright, I will.'
};

export const OkModal = props => ( <MessageModal {...props} content={okContent} /> );
