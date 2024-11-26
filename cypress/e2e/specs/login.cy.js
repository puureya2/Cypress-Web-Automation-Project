import { e2e } from '../../../../cypress.config';


const url = e2e.baseUrl;

describe('Sign Up', () => {

  it("signs up on the Yuzee site", () => {

    cy.visit(url);

    // 2. click the Sign In button
    cy.contains("Sign in")[0].click();

    // 3. clear the fields & enter text
    cy.get('input[formcontrolname="email"]').clear().type("kevinnanshe@gmail.com");
    cy.get('input[formcontrolname="password"]').clear().type("Password@123");

    // 4. click the Sign In button
    cy.get('button[type="submit"]').contains('Sign in').click();

    cy.intercept('POST', `https://auth.yuzee.click/users/api/v1/onboarding/user/email/verify-code?code=${OTP}`).as('otpinfoRequest');
  
  });

});