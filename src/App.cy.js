import React from 'react';
import App from './App';

// tests for now working for implementation without autocomplete search

describe('<App />', () => {
  beforeEach(() => {
    cy.mount(<App />); // mount the component
  });

  // it('checks input field for placeholder', () => {
  //   cy.get('input').should('have.attr', 'placeholder', 'Enter location...');
  // });

  // it('displays the city name in a <p> tag after Enter key press', () => {
  //   cy.get('input[name="city"]').type('Helsinki{enter}');
  //   cy.get('p.location-name').should('contain', 'Helsinki');
  // });

  // it('displays an error message in a <p> tag for a non-existent city', () => {
  //   cy.get('input[name="city"]').type('gbvgr{enter}');
  //   cy.get('p.error-message').should('contain', 'No location found');
  // });

  // it('displays an error message in a <p> tag for a non-existent city', () => {
  //   cy.get('input[name="city"]').type('{enter}');
  //   cy.get('p.error-message').should(
  //     'contain',
  //     'You forgot to type the location'
  //   );
  // });
});
