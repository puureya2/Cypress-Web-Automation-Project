const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");


module.exports = defineConfig({

 e2e: {

  baseUrl: 'https://env3.yuzee.click',

  specPattern: [
    'cypress/e2e/**/*.cy.js',
    'cypress/e2e/**/*.feature',
  ],

  env: {"MAILOSAUR_API_KEY": "7CXFeVNmhbJI7JY4t5F9GHqt2jHYrljV"},

  async setupNodeEvents(on, config) {

    await addCucumberPreprocessorPlugin(on, config);
    on(
      "file:preprocessor",
      createBundler({
        plugins: [createEsbuildPlugin(config)],
      })
    );
    
    return config;

   },

 },

});




