import { Error } from '../../src/components/UI'

describe('<Error />', () => {
    const errorMessage = 'Error Message'
    const buttonLabel = 'Click me'

    beforeEach(() => {
        cy.mount(
            <Error
                errorMessage={errorMessage}
                buttonLabel={buttonLabel}
                onButtonClick={() => console.log('Error button clicked')}
            />
        )
    })

    it("should have button to dissmiss error", () => {
        cy.get('[data-cy="button__error-dismiss"]').should('be.visible')
    })

    it("should button has text Click me", () => {
        cy.get('[data-cy="button__error-dismiss"]').should('have.text', buttonLabel)
    })

    it("should have message", () => {
        cy.get('[data-cy="button__error-message"]').should('be.visible')
    })

    it("should message has text Error Message", () => {
        cy.get('[data-cy="button__error-message"]').should('have.text', errorMessage)
    })

})