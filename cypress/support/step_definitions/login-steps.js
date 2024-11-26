import { Given, When, Then, And } from '@badeball/cypress-cucumber-preprocessor';


Given('I am on the home page', () => {
  cy.visit("/"); 
});

When('I click the sign in button', () => {
    cy.get('button[class="btn theme-btn"]').contains("Sign in").click();
});

When('I enter my email {string} and password {string}', (email, password) => {
    cy.get('input[formcontrolname="email"]').clear().type(email);
    cy.get('input[formcontrolname="password"]').clear().type(password);
});

When('I click the sing in confirmation button', () => {
    cy.get('button[type="submit"]').contains('Sign in').click();
});

Then('I should be logged in', () => {
  cy.url().should('include', '/landing')
});