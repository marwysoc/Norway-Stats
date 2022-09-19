describe('no user is logged in', () => {
    beforeEach(() => {
        // go to home page
        cy.visit('http://localhost:3000')
    })

    it('user sees login form after go to profile page', () => {
        // go to profile page
        cy.contains('Profile').click()
        cy.url().should('include', '/login')

        cy.get('[data-cy="form__login"]').should('not.exist')
    })

    it('user can generate price chart but cant save it in library', () => {
        // go to home page with price form
        cy.visit('http://localhost:3000')

        // fill the form with data
        const startY = '2018'
        const startQ = '1st'
        const endY = '2021'
        const endQ = '4th'
        const houseType = 'Detached houses'

        cy.get('[data-cy="start-year"]').first().click()
        cy.get('[data-cy="select__option"]').contains(startY).click()
        cy.get('[data-cy="start-quarter"]').first().click()
        cy.get('[data-cy="select__option"]').contains(startQ).click()

        cy.get('[data-cy="end-year"]').first().click()
        cy.get('[data-cy="select__option"]').contains(endY).click()
        cy.get('[data-cy="end-quarter"]').first().click()
        cy.get('[data-cy="select__option"]').contains(endQ).click()

        cy.get('[data-cy="house-type"]').first().click()
        cy.get('[data-cy="select__option"]').contains(houseType).click()

        // generate chart
        cy.get('[data-cy="button__get-stats"]').click()

        // check url
        cy.location('pathname').should('eq', '/2018K1-2021K4/Detached%20houses')

        // button save stats is not visible
        cy.get('[data-cy="button__save-stats"]').should('not.exist')

    })

    it('user can read comments to stats but cant edit them', () => {
        // go to library page
        cy.visit('http://localhost:3000/lib')

        // stat without comment
        cy.get('[data-cy="button__open-modal"]').last().click()
        cy.get('[data-cy="button__comment-section"]').should('not.exist')
        cy.get('[data-cy="modal"]').click(0, 0) // close modal

        // stat with comment
        cy.get('[data-cy="button__open-modal"]').first().click()

        // show comment
        cy.get('[data-cy="button__comment-section"]').click()
        cy.get('[data-cy="input__comment"]').should('not.exist')
        cy.get('[data-cy="button__comment-submit"]').should('not.exist')

        // edit comment button doesn't exist
        cy.get('[data-cy="button__edit-comment"]').should('not.exist')

        // user can toggle comment
        cy.get('[data-cy="button__comment-section"]').click()
        cy.get('[data-cy="button__comment-section"]').click()
        cy.get('[data-cy="button__comment-section"]').click()

    })

    it.only('user can search for stats', () => {
        // go to library page
        cy.visit('http://localhost:3000/lib')

        // fill search form 
        cy.get('[data-cy="input__stat-search"]').type('2014')
        cy.get('[data-cy="checkbox__with-comments"]').click()
        cy.get('[data-cy="button__stat-search-submit"]').click()

        // only one result should be visibile when above search params given
        cy.get('[data-cy="table__cell__stat-owner"]').should('have.length', 1)

        // search owner info should not be displayed
        cy.get('[data-cy="field__searched-by"]').should('have.text', '')

        // check if url contains search params
        cy.url().should('include', 'withComments=true')
        cy.url().should('include', '2014')
        cy.url().should('include', 'null')
    })

})