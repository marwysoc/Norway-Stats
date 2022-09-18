import { BrowserRouter as Router } from 'react-router-dom'

import { Header } from '../../src/components/Header'

describe('<Header />', () => {
    beforeEach(() => {
        cy.mount(
            <Router>
                <Header />
            </Router>
        )
        cy.viewport(1280, 720)
    })

    context('links check', () => {
        it('should have 3 links', () => {
            cy.get('[data-cy="desktop-menu-link"]').each((item, index, list) => {
                expect(list).to.have.length(3)
            })
        })

        it('should have Home, Library, Profile links', () => {
            const labels = [
                'Home',
                'Library',
                'Profile'
            ]

            cy.get('[data-cy="desktop-menu-link"]').each((item, index, list) => {
                expect(Cypress.$(item).text()).to.eq(labels[index])
            })
        })
    })

    context('mobile view', () => {
        beforeEach(() => {
            cy.viewport(500, 700)
        })

        it('should displays header with open drawer button', () => {
            cy.get('[data-cy="button__open-drawer"]').should('be.visible')
        })

        it('should open menu after click open drawer button', () => {
            cy.get('[data-cy="button__open-drawer"]').click()
            cy.get('[data-cy="drawer"]').should('be.visible')
        })
    })

    context('desktop view', () => {
        beforeEach(() => {
            cy.viewport(1280, 720)
        })

        it('should displays full header without open drawer button', () => {
            cy.get('[data-cy="button__open-drawer"]').should('not.be.visible')
        })

        it('should have 3 links', () => {
            cy.get('[data-cy="desktop-menu-link"]').each((item, index, list) => {
                expect(list).to.have.length(3);
            })
        })

        it('should have Home, Library, Profile links', () => {
            const labels = [
                'Home',
                'Library',
                'Profile'
            ]

            cy.get('[data-cy="desktop-menu-link"]').each((item, index, list) => {
                expect(Cypress.$(item).text()).to.eq(labels[index])
            })
        })
    })
})