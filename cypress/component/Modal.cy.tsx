import { BasicModal } from '../../src/components/UI'

describe('<Modal />', () => {
    const buttonLabel = 'Open modal'
    const modalBody = <div>
        <p>Hello from modal</p>
    </div>

    beforeEach(() => {
        cy.mount(
            <BasicModal
                buttonLabel={buttonLabel}
                modalBody={modalBody}
            />
        )
    })

    it("should have open modal button", () => {
        cy.get('[data-cy="button__open-modal"]').should('be.visible')
    })

    it("should open modal after button clicked", () => {
        cy.get('[data-cy="button__open-modal"]').click()
        cy.get('[data-cy="modal-body"]').should('be.visible')
    })

    it("should close modal after background clicked", () => {
        cy.get('[data-cy="button__open-modal"]').click()
        cy.get('[data-cy="modal-body"]').should('be.visible')

        cy.get('[data-cy="modal"]').click(0, 0)
        cy.get('[data-cy="modal-body"]').should('not.exist')
    })

})