import { e2e } from '../../../../cypress.config';


const url = e2e.baseUrl;

describe('Location API', () => {
    it('should retry with random string inputs until a successful response', () => {

        cy.visit(url);

        // Login steps
        cy.get('button[class="btn theme-btn"]').click();
        cy.get('input[formcontrolname="email"]').clear().type("kevinnanashe@gmail.com");
        cy.get('input[formcontrolname="password"]').clear().type("Password@123");
        cy.get('button[type="submit"]').contains('Sign in').click();

        // Start Looping
        for (let i = 0; i < 10; i++) {

            const input = getRandomString(10);
            cy.intercept('GET', `https://auth.yuzee.click/google-places/maps/api/place/autocomplete/json?input=${input}&types=(cities)`).as('locationGET');

            cy.visit("https://env3.yuzee.click/user/000fffba-46ab-4d95-baa3-15c4d7b2ff5a/profile");

            cy.wait(10000).then(() => {
                cy.get('button[class="btn custom-add-pd theme-btn"]').click()
            });

            cy.get('input[placeholder="Search location"]').click().type(input);

            cy.wait('@locationGET', { timeout: 10000 }).then(interception => {

                let statusCode;
                let msg;
    
                statusCode = interception.response.statusCode;
                msg = interception.response.body.message;

                cy.log(`MESSAGE: ${msg}`);
                cy.log(`API STATUS IS ${statusCode}`);

                cy.expect(interception.request.url).to.include(`input=${input}`);

                if (statusCode === 200) {
                    cy.log(`Successful request with input: ${input}`);
                    return; // Exit the loop if the request was successful
                } else {
                    cy.log(`API status is: ${statusCode}. Error encountered.`);
                    // Continue to the next iteration of the loop to try a new input
                }
            });
        }
    });
});

function getRandomString(maxLength) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const length = Math.floor(Math.random() * maxLength) + 1; // Random length between 1 and maxLength
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}