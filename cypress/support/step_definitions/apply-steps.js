import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';


Given('I start an application', () => {

  cy.visit("/");

  cy.login("kevinnanashe@gmail.com", "Password@123");

  cy.visit("https://env3.yuzee.click/user-control-center/landing")
    .then(() => { 
      cy.url().should('include', '/landing');
    });

  cy.get('a[ngbtooltip="Apply"]').click()
    .then(() => {
      cy.url().should('include', '/apply');
    });


  cy.contains('button', 'Request offers').click()
    .then(() => {
      cy.url().should('include', '/jobs');
    });
  cy.contains('div', 'Create a new application').click()
    .then(() => {
      cy.contains('include', 'Your profile will be automatically');
    });

});


When('I write and submit a cover letter', () => {
  
  cy.inputRandomText('#cover_letter', 30, 3000);
  cy.contains(' Next ').click();
});

When('I select my job preferences', () => {

});