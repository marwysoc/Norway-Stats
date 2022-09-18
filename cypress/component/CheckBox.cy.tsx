import { CheckBox } from '../../src/components/UI'

describe('<CheckBox />', () => {
    const testLabel = 'label'

    beforeEach(() => {
        cy.mount(
            <CheckBox label={testLabel} />
        )
    })

    it("should have label", () => {
        cy.get('[data-cy="label__checkbox"]').should('have.text', testLabel)
    })

    it("should checked after click checkbox", () => {
        cy.get('[data-cy="checkbox"]').click()
    })

    it("should unchecked after click checkbox again", () => {
        cy.get('[data-cy="checkbox"]').click()
        cy.get('[data-cy="checkbox"]').click()
    })
})