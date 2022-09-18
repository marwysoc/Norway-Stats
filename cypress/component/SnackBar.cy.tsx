import { SnackBar } from '../../src/components/UI'

describe('<SnackBar />', () => {
    const message = 'SnackBar Message'

    beforeEach(() => {
        cy.mount(
            <SnackBar
                isOpen={true}
                message={message}
            />
        )
    })

    it("should be visible", () => {
        cy.get('[data-cy="snackbar"]').should('be.visible')
    })

    it("should have given message", () => {
        cy.get('[data-cy="snackbar-message"]').should('have.text', message)
    })
    
})