import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function AlertPopup(error) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{error.heading}</Alert.Heading>
        <p>
          {error.text}
        </p>
      </Alert>
    );
  }
}

export default AlertPopup;