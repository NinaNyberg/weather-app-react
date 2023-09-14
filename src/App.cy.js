import React from 'react';
import App from './App';

describe('<App />', () => {
  it('checks input field for placeholder', () => {
    cy.mount(<App />); // mount the component
    cy.get('input').should('have.attr', 'placeholder', 'Enter location...'); // check the placeholder in the input field
  });

  it('searches by typing and pressing ENTER', () => {
    cy.mount(<App />);
    cy.get('input').should('be.visible').type('{enter}');

    cy.get('.location-name').should('contain', /[a-zA-Z]/);
  });
});
