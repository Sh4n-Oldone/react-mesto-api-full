import React from 'react';

export default function Footer({isOpen}) {
  return (
    <>
      {isOpen
      ? <footer className='footer'>
          <p className='footer__copyright'>&copy; 2020 Mesto Russia</p>
        </footer>
      : ''
      }
    </>
  );
}
