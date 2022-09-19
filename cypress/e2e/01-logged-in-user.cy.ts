describe('user is logged in', () => {
    const email = 'admin1@admin.pl'
    const password = 'admin1'
    const username = 'admin1'

    beforeEach(() => {
        // go to home page
        cy.visit('http://localhost:3000')
        cy.contains('Profile').click()
        cy.url().should('include', '/login')

        //login
        cy.get('[data-cy="input__email"]').type(email)
        cy.get('[data-cy="input__password"]').type(password)

        cy.get('[data-cy="button__login"]').click()

        cy.url().should('eq', 'http://localhost:3000/')
    })

    it('user can change username', () => {
        // go to profile page
        cy.contains('Profile').click()
        cy.url().should('include', '/profile')

        cy.get('[data-cy="button__open-modal"]').click()

        // change username
        cy.get('[data-cy="input__username"]').type(username)
        cy.get('[data-cy="button__save-username"]').click()

        cy.get('[data-cy="field__username"]').should('contain', 'admin1')
        cy.get('[data-cy="modal"]').click(0, 0) // close modal
    })

    it('user can generate price chart and save it in library', () => {
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

        // save stats to library
        cy.get('[data-cy="button__save-stats"]').click()

        // go to library page
        cy.visit('http://localhost:3000/lib')

        // chceck if saved stats are in library
        cy.get('[data-cy="table__cell__stat-owner"]').last().should('have.text', email)

    })

    it('user can add comments to stats and edit them', () => {
        // go to library page
        cy.visit('http://localhost:3000/lib')

        cy.get('[data-cy="button__open-modal"]').last().click()

        // add comment
        cy.get('[data-cy="button__comment-section"]').click()
        cy.get('[data-cy="input__comment"]').type('Some test comment from cypress')
        cy.get('[data-cy="button__comment-submit"]').click()

        // check if added comment exists
        cy.get('[data-cy="button__open-modal"]').last().click()
        cy.get('[data-cy="button__comment-section"]').click()
        cy.get('[data-cy="field__comment"]').should('be.visible').should('have.text', 'Some test comment from cypress')
        cy.get('[data-cy="field__comment-owner"]').should('be.visible').should('have.text', `comment added by: ${email}`)

        // edit added comment
        cy.get('[data-cy="button__edit-comment"]').click()
        cy.get('[data-cy="input__comment"]').type(' [edited]')
        cy.get('[data-cy="button__comment-submit"]').click()

        // check if comment been edited
        cy.get('[data-cy="button__open-modal"]').last().click()
        cy.get('[data-cy="button__comment-section"]').click()
        cy.get('[data-cy="field__comment"]').should('be.visible').should('have.text', 'Some test comment from cypress [edited]')

    })

    it('user can search for stats', () => {
        // go to library page
        cy.visit('http://localhost:3000/lib')

        // fill search form 
        cy.get('[data-cy="input__stat-search"]').type('2014')
        cy.get('[data-cy="checkbox__with-comments"]').click()
        cy.get('[data-cy="button__stat-search-submit"]').click()

        // only one result should be visibile when above search params given
        cy.get('[data-cy="table__cell__stat-owner"]').should('have.length', 1)

        // search owner info should be displayed
        cy.get('[data-cy="field__searched-by"]').should('have.text', `Searched by: ${email}`)

        // check if url contains search params
        cy.url().should('include', 'withComments=true')
        cy.url().should('include', '2014')
        cy.url().should('include', 'searchedBy=admin1')
    })

    it('user can logout', () => {
        // go to profile page
        cy.contains('Profile').click()
        cy.url().should('include', '/profile')

        // logout
        cy.get('[data-cy="button__logout"]').click()

        // should be on a login page after logout
        cy.location('pathname').should('eq', '/login')

        // login form should be empty (only helper text)
        cy.get('[data-cy="input__email"]').should('have.text', 'E-mail')
        cy.get('[data-cy="input__password"]').should('have.text', 'Password')
    })

})