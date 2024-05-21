import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';


Given('I navigate to {string}', (url) => {
  cy.visit(url);
});

When('I click on the {string} menu', (menuText) => {
  cy.contains('a', menuText).click();
});

// Definição de passo para navegar para um link específico
When('I navigate to the link {string}', (link) => {
  cy.scrollTo('bottom'); 
  cy.contains(link).should('contain.text', '/albums/1/photos');
});

Then('I capture the data displayed and save it to a JSON array', () => {
  cy.request('https://jsonplaceholder.typicode.com/albums/1/photos').then((response) => {
    const data = response.body; // Obtém o corpo da resposta
    cy.writeFile('cypress/fixtures/photos.json', data); // Escreve os dados em um arquivo JSON
  });
});

Then('I validate the data of the object with id {string}', (id) => {
  cy.readFile('cypress/fixtures/photos.json').then((data) => {
    cy.log('Dados lidos do arquivo JSON:', JSON.stringify(data, null, 2)); // Registra os dados lidos do arquivo JSON
    const item = data.find((item) => item.id == id); // Encontra o objeto com o ID especificado

    if (item) {
      cy.log(`Objeto com id ${id} encontrado:`, JSON.stringify(item, null, 2)); // Registra o objeto encontrado
    } else {
      cy.log(`Objeto com id ${id} não encontrado`); // Registra que o objeto não foi encontrado
    }

    // Verifica se o objeto existe e se suas propriedades são strings
    expect(item, `Validação da existência do objeto com id ${id}`).to.exist;
    expect(item.title, 'Validação do título').to.be.a('string');
    expect(item.url, 'Validação da URL').to.be.a('string');
    expect(item.thumbnailUrl, 'Validação da URL da miniatura').to.be.a('string');
    cy.screenshot('tela'); 
  });
});
