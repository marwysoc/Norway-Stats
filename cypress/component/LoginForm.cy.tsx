import { BrowserRouter as Router } from 'react-router-dom'

import LoginForm from '../../src/components/LoginForm/LoginForm'

describe('<LoginForm />', () => {
  beforeEach(() => {
    cy.mount(
      <Router>
        <LoginForm />
      </Router>
    )
  })

  it("should have email and pass inputs", () => {
    cy.get('[data-cy="input__email"]').should('be.visible')
    cy.get('[data-cy="input__password"]').should('be.visible')
  })

  it("should have login and register button", () => {
    cy.get('[data-cy="button__login"]').should('be.visible')
    cy.get('[data-cy="button__register"]').should('be.visible')
  })

  it("should fail submit with empty inputs", () => {
    cy.get('[data-cy="input__email"]').should('have.value', '')
    cy.get('[data-cy="input__password"]').should('have.value', '')

    cy.get('[data-cy="button__login"]').click()

    cy.contains('Email is required').should('be.visible')
    cy.contains('Password is required').should('be.visible')
  })

  it("should pass submit with valid inputs", () => {
    cy.get('[data-cy="input__email"]').type('admin1@admin.pl')
    cy.get('[data-cy="input__password"]').type('admin1')

    cy.get('[data-cy="button__login"]').click()

    cy.contains('Email is required').should('not.exist')
    cy.contains('Password is required').should('not.exist')
  })

  it("should fail submit with empty email", () => {
    cy.get('[data-cy="input__password"]').type('admin1')

    cy.get('[data-cy="button__login"]').click()

    cy.contains('Email is required').should('be.visible')
    cy.contains('Password is required').should('not.exist')
  })

  it("should fail submit with empty password", () => {
    cy.get('[data-cy="input__email"]').type('admin1@admin.pl')

    cy.get('[data-cy="button__login"]').click()

    cy.contains('Email is required').should('not.exist')
    cy.contains('Password is required').should('be.visible')
  })

  it("should fail submit with invalid inputs", () => {
    cy.get('[data-cy="input__email"]').type('admin1@admin.pl')
    cy.get('[data-cy="input__password"]').type('admin123')

    cy.get('[data-cy="button__login"]').click()

    cy.contains('Invalid email or password').should('be.visible')
  })

  it("should register button work", () => {
    cy.get('[data-cy="button__register"]').click()
    cy.url().should('include', '/register')
  })

})