import { Input } from '../../src/components/UI'

describe('<Input />', () => {
    const errorMessage = 'Error message'
    const label = 'Test label'
    const options = [
        { value: 'option1', label: 'option 1' },
        { value: 'option2', label: 'option 2' }
    ]

    beforeEach(() => {
        cy.mount(
            <Input label={label} options={options} />
        )
    })

    it("should have label", () => {
        cy.get('[data-cy="input__select"]').should('be.visible')
    })

    it("should select input have all given options", () => {
        cy.get('[data-cy="input__select"]').click()

        cy.get('[data-cy="select__option"]').each((item, index, list) => {
            expect(list).to.have.length(options.length)
            expect(Cypress.$(item).text()).to.eq(options[index].label)
        })
    })

    it("should show selected value in input", () => {
        cy.get('[data-cy="input__select"]').click()
        cy.get('[data-cy="select__option"]').contains(options[0].label).click()
        cy.get('[data-cy="input__select"]').should('contain', options[0].label)
    })

    it("should show error message when given", () => {
        cy.mount(
            <Input label={label} options={options} errorMessage={errorMessage} />
        ) 
    })

})