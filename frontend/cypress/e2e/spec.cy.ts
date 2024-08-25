import { expect } from 'chai';

describe('Full test', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
   
    cy.get('.bg-red-500').click()
    cy.get('.bg-sky-500').click()

    cy.get('h1.text-2xl').invoke('text').then(value => {
      const [_, maxPageCount] = value.split('/')
      let answeredCount = 0;
 
      for (let i = 0; i < maxPageCount; i++) {
        answeredCount++
        const randomNumber = Math.floor(Math.random() * 2) + 1

        if (randomNumber === 2) cy.get('.gap-x-16 > .justify-self-end').click()
        if (randomNumber === 1) cy.get('.gap-x-16 > .justify-self-start').click()

        if (+maxPageCount !== answeredCount) cy.get('.place-self-end > .flex').click()
        cy.wait(500)
      }
    })    
  })
})
