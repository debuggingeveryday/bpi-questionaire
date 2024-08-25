import { expect } from 'chai';
import 'cypress-file-upload'

describe('Full test', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')

    cy.get(':nth-child(1) > button').as("openModal")
    cy.get('#uploadFile1').as("fileInput")
    cy.get('.text-slate-100').as("buttonSubmit")

    cy.get("@openModal").click()
    cy.get('@fileInput').attachFile('sample_test_bpi_result.txt');

    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('12345');
    });

    cy.get("@buttonSubmit").click()
  })
})
