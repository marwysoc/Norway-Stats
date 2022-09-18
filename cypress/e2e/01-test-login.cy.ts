describe('login and change username', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.contains('Profile').click()
        cy.url().should('include', '/login')

        cy.get('[data-cy="input__email"]').type('admin1@admin.pl')
        cy.get('[data-cy="input__password"]').type('admin1')

        cy.get('[data-cy="button__login"]').click()

        cy.url().should('eq', 'http://localhost:3000/')
    })

    it('change username', () => {
        cy.contains('Profile').click()
        cy.url().should('include', '/profile')

        cy.get('[data-cy="button__open-modal"]').click()

        cy.get('[data-cy="input__username"]').type('admin1')
        cy.get('[data-cy="button__save-username"]').click()

        cy.get('[data-cy="field__username"]').should('contain', 'admin1')
        cy.get('[class="MuiBackdrop-root css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop"]').last().click({ force: true })
    })
})