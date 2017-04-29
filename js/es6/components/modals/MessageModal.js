import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const MessageModal = props => (
  <Modal {...props} bsSize='small' aria-labelledby='modal-title' className='error-modal'>
    <Modal.Header closeButton>
      <Modal.Title id='modal-title'>{props.content.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>{props.content.body}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button bsSize='xsmall' onClick={props.onHide}>{props.content.button}</Button>
    </Modal.Footer>
  </Modal>
    );

MessageModal.propTypes = {
	onHide: React.PropTypes.func
};

MessageModal.defaultProps = {
	onHide: () => console.log( 'Modal should hide' )
};

export default MessageModal;
