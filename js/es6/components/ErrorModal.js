import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ErrorModal = props => (
  <Modal {...props} bsSize='small' aria-labelledby='modal-title' className='error-modal'>
    <Modal.Header closeButton>
      <Modal.Title id='modal-title'>Your request has been rejected :(</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>{'Try checking your internet connection or if your facebook page url is valid'}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button bsSize='xsmall' onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
    );

ErrorModal.propTypes = {
	onHide: React.PropTypes.func
};

ErrorModal.defaultProps = {
	onHide: () => console.log( 'Modal should hide' )
};

export default ErrorModal;
