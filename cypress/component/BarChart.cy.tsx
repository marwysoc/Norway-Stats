import { BrowserRouter as Router } from 'react-router-dom'

import { BarChart } from '../../src/components/BarChart'
import LoginForm from '../../src/components/LoginForm/LoginForm'

// Test data 
const labels = ['2016', '2017', '2018', '2019', '2020', '2021', '2022']
const prices = [1322, 2313, 5343, 5432, 5643, 6012, 6200]
const house = 'Detatched house'
const start = labels[0]
const end = labels[labels.length - 1]

describe('<BarChart /> - no user', () => {
    it('should show chart with test data', () => {        
        cy.mount(
            <BarChart
                labels={labels}
                dataSet={prices}
                houseType={house}
                start={start}
                end={end}
                showSaveBtn={true}
                showCommentBtn={false}
            />
        )
    })

    it('should Save statistics button not be visible when no user logged in', () => {
        cy.get('[data-cy="button__save-stats"]').should('not.exist')
    })
})

describe('<BarChart /> - with user logged in', () => {
     // Login in before test save stats button
     beforeEach(() => {
        cy.mount(
            <Router>
                <LoginForm />
            </Router>
        )
        cy.get('[data-cy="input__email"]').type('admin1@admin.pl')
        cy.get('[data-cy="input__password"]').type('admin1')

        cy.get('[data-cy="button__login"]').click()

        cy.mount(
            <BarChart
                labels={labels}
                dataSet={prices}
                houseType={house}
                start={start}
                end={end}
                showSaveBtn={true}
                showCommentBtn={false}
            />
        )
    })

    it('should Save statistics button be visible when user logged in', () => {
        cy.get('[data-cy="button__save-stats"]').should('be.visible')
    })

    it('should snackbar show after click save stats button', () => {
        cy.get('[data-cy="button__save-stats"]').click()
        cy.get('[data-cy="snackbar"]').should('be.visible')
    })

    it('should snackbar message has text Saved in library!', () => {
        cy.get('[data-cy="button__save-stats"]').click()
        cy.get('[data-cy="snackbar-message"]').should('have.text', 'Saved in library!')
    })
})