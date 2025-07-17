import React from 'react';
import { Container } from 'reactstrap';

export default function SecondaryNav(props) {
  return (
    <div className='secondaryNav'>
      <Container fluid>
        <div className='secondaryNavContent'>{props.children}</div>
      </Container>
    </div>
  );
}
