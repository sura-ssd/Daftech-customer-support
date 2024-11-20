import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter bgColor='primary' className='text-center text-lg-left text-white'>
      <MDBContainer className='p-4'>
        <MDBRow>
          <MDBCol lg='6' md='12' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase'>DafTech</h5>
            <p>
              Providing innovative tech solutions for a modern world. Stay connected with us for updates and more.
            </p>
          </MDBCol>
          <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase'>Links</h5>
            <ul className='list-unstyled mb-0'>
              <li>
                <a href='/' className='text-white'>Home</a>
              </li>
              <li>
                <a href='/about' className='text-white'>About Us</a>
              </li>
              <li>
                <a href='/services' className='text-white'>Services</a>
              </li>
              <li>
                <a href='/contact' className='text-white'>Contact</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol lg='3' md='6' className='mb-4 mb-md-0'>
            <h5 className='text-uppercase'>Follow Us</h5>
            <div>
              <a href='https://www.facebook.com' className='text-white me-4'>
                <MDBIcon fab icon='facebook-f' />
              </a>
              <a href='https://www.twitter.com' className='text-white me-4'>
                <MDBIcon fab icon='twitter' />
              </a>
              <a href='https://www.instagram.com' className='text-white me-4'>
                <MDBIcon fab icon='instagram' />
              </a>
              <a href='https://www.linkedin.com' className='text-white me-4'>
                <MDBIcon fab icon='linkedin' />
              </a>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} DafTech
      </div>
    </MDBFooter>
  );
}
