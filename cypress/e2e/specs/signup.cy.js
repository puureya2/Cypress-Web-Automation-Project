import { e2e } from '../../../../cypress.config';



const url = 'https://env3.yuzee.click';

describe('Sign Up', () => {

  it("signs up on the Yuzee site", () => {

    cy.intercept('POST', 'https://auth.yuzee.click/users/api/v1/public/users/signup').as('signupRequest');
    
    cy.visit(url);

    // 1. click the Join Yuzee button
    cy.get('button[class="btn theme-btn btn-blue mr-3"]').click();

    // 2. fill in the name fields
    cy.get('input[formcontrolname="firstName"]').type('Test');
    cy.get('input[formcontrolname="lastName"]').type('Bot');

    // 3. fill in the date fields
    cy.get('input[placeholder="Select a date"]').click()
    cy.get('select.custom-select[aria-label="Select year"]').select('2002');
    cy.get('select.custom-select[aria-label="Select month"]').select('8');
    cy.get('div[class="btn-light ng-star-inserted"]').contains('2').click();

    // 4. fill in the gender fields
    cy.get('ng-select[formcontrolname="gender"]').click()
    cy.get('div[role="option"]').contains('Male').click();

    const serverID = "ohladkcn"
    const emailDomain = `@${serverID}.mailosaur.net`

    const randomString = new Date().getTime();
    let emailAddress = `a${randomString}${emailDomain}`;

    // 5. fill in the rest of fields
    cy.get('input[formcontrolname="postal_code"]').type('3000');
    cy.get('input[formcontrolname="email"]').clear().type(emailAddress);
    cy.get('input[formcontrolname="password"]').clear().type('Password@123');
    cy.get('input[formcontrolname="confirmPassword"]').type('Password@123');

    // 5. submit form
    cy.get('button[class="btn btn-blue theme-btn w-50"]').click();

    cy.wait('@signupRequest', { timeout: 60000 }).then((interception) => {

      let statusCode;
      let msg;

      statusCode = interception.response.statusCode;
      msg = interception.response.body.message;
      cy.log(`MESSAGE: ${msg}`);
      cy.log(`API STATUS IS ${statusCode}`);
  
  
  
      if (statusCode === 200) {
  
        cy.contains("Verification Code");
        cy.contains(emailAddress);
  
        cy.mailosaurGetMessage(serverID, {
          sentTo: emailAddress
        })
        .then(email => {
          expect(email.subject).to.equal('Welcome to Yuzee');
          
        }).then(email => {
          const htmlCodes = email.html.codes.map(code => code.value);
          let OTP;
          OTP = htmlCodes;
  
  
          cy.intercept('POST', `https://auth.yuzee.click/users/api/v1/onboarding/user/email/verify-code?code=${OTP}`).as('otpinfoRequest');
  
  
          for (let i = 1; i <= 6; i++) {
            cy.get(`input[formcontrolname="digit${i}"]`).type(`${OTP[i - 1]}`)
          }
          cy.get('button[type="submit"]').contains("Continue").click();
          cy.get(".close").click();
  
        });
  
  
      } else {
  
        cy.log(`API status is: ${statusCode}. Error encountered.`);
        cy.get('.close').eq(0).click();
        cy.contains("Yes").click();
        cy.contains("Sign in").click();
        cy.get('input[formcontrolname="email"]').clear().type(emailAddress);
        cy.get('input[formcontrolname="password"]').clear().type("Mufugi01!");
        cy.get('button[type="submit"]').contains("Sign in").click();
  
  
      }
    });



/////////////////////////////////////////////////////////////////////////////////

    // const otp = [];

    // // 14.1 enter into the OTP digit1 field, assert the new input
    // cy.get('input[formcontrolname="digit1"]')
    //   .type(otp[0])
    //   .should('have.value', otp[0]);

    // // 14.2 enter into the OTP digit2 field, assert the new input
    // cy.get('input[formcontrolname="digit2"]')
    //   .type(otp[1])
    //   .should('have.value', otp[1]);

    // // 14.3 enter into the OTP digit3 field, assert the new input
    // cy.get('input[formcontrolname="digit3"]')
    //   .type(otp[2])
    //   .should('have.value', otp[2]);

    // // 14.4 enter into the OTP digit4 field, assert the new input
    // cy.get('input[formcontrolname="digit4"]')
    //   .type(otp[3])
    //   .should('have.value', otp[3]);

    // // 14.5 enter into the OTP digit5 field, assert the new input
    // cy.get('input[formcontrolname="digit5"]')
    //   .type(otp[4])
    //   .should('have.value', otp[4]);

    // // 14.6 enter into the OTP digit6 field, assert the new input
    // cy.get('input[formcontrolname="digit6"]')
    //   .type(otp[5])
    //   .should('have.value', otp[5]);

    // // 15. assert the OTP-submit button click-ability
    // cy.get('button["class="btn btn-blue theme-btn"]')
    //   .should('not.have.attr', 'disabled')

    // // 16. submit the OTP
    // cy.get('button["class="btn btn-blue theme-btn"]')
    //   .click();

    // // 17. assert the OTP-submit button click-ability
    // cy.get('button["class="btn btn-blue theme-btn"]')
    //   .should('not.have.attr', 'disabled')

    // // 18. submit the OTP
    // cy.get('button["class="btn btn-blue theme-btn"]')
    //   .click();
    
  });

});