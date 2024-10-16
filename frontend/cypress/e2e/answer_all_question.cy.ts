import { expect } from 'chai';
import _ from 'lodash'

describe('Full test', () => {
    it('passes', () => {
        cy.viewport(1280, 1024)
        cy.visit('http://localhost:3000/questionaire/1/10')

        let total = 240
        let limit = 10

        let perpage = total / limit

        for (let page = 0; page < perpage; page++) {
            for (let item = 0; item < 10; item++) {
                const selected = _.random(1, 2)
                cy.get(`.mt-5 > :nth-child(${item + 1}) > .grid > :nth-child(${selected})`).click()
                cy.wait(500)
            }

            if (page + 1 !== perpage) cy.get('.justify-self-end > p').click()
            cy.wait(500)
        }
    })
})
