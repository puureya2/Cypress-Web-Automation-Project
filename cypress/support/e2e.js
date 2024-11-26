// cypress/support/commands.js

Cypress.Commands.add('login', (email, password) => {

    cy.wait(20000).then(() => {
        cy.get('button[class="btn theme-btn"]').contains("Sign in").click();
    });


    cy.get('input[formcontrolname="email"]').clear().type(email);
    cy.get('input[formcontrolname="password"]').clear().type(password);

    cy.get('button[type="submit"]').contains('Sign in').click();
});

Cypress.Commands.add('inputRandomText', (inputSelector, minLength, maxLength) => {
    const randomParagraph = generateRandomParagraph(minLength, maxLength);
    cy.get(inputSelector).type(randomParagraph);
});

Cypress.Commands.add('selectRandomOption', (selector, optionsSelector, minOptions = 0, maxOptions, maxIterations = 1) => {

    cy.get(selector).click();

    const iterations = Math.floor(Math.random() * maxIterations) + 1;
    for (let i = 0; i < iterations; i++) {

        const randomOptionIndex = Math.floor(Math.random() * (maxOptions - minOptions + 1)) + minOptions;
        const optionId = `${optionsSelector}-${randomOptionIndex}`; // Construct the option ID
    
        cy.get(`#${optionId}`).click();
        
    }

});

  
function generateRandomParagraph(minLength, maxLength) {

    const words = [
        'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 
        'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 
        'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 
        'aliqua', 'ut', 'enim', 'ad', 'minim', 'veniam', 
        'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 
        'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 
        'consequat', 'duis', 'aute', 'irure', 'dolor', 
        'in', 'reprehenderit', 'in', 'voluptate', 'velit', 
        'esse', 'cillum', 'dolore', 'eu', 'fugiat', 
        'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 
        'cupidatat', 'non', 'proident', 'sunt', 'in', 
        'culpa', 'qui', 'officia', 'deserunt', 'mollit', 
        'anim', 'id', 'est', 'laborum' 
    ];

    let paragraph = '';
    let currentLength = 0;

    while (currentLength < minLength || currentLength > maxLength) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        paragraph += randomWord + ' ';
        currentLength = paragraph.length;
    }

    return paragraph.trim();

}