import { BrowserRouter as Router } from 'react-router-dom'

import RegisterForm from '../../src/components/RegisterForm/RegisterForm'

describe('<RegisterForm />', () => {
  beforeEach(() => {
    cy.mount(
      <Router>
        <RegisterForm />
      </Router>
    )
  })

  it("should have email, pass and repeat pass inputs", () => {
    cy.get('[data-cy="input__register-email"]').should('be.visible')
    cy.get('[data-cy="input__register-password"]').should('be.visible')
    cy.get('[data-cy="input__register-password-repeat"]').should('be.visible')
  })

  it("should have register and back to login button", () => {
    cy.get('[data-cy="button__register-btn"]').should('be.visible')
    cy.get('[data-cy="button__back-to-login"]').should('be.visible')
  })

  it("should fail submit with empty inputs", () => {
    cy.get('[data-cy="input__register-email"]').should('have.value', '')
    cy.get('[data-cy="input__register-password"]').should('have.value', '')
    cy.get('[data-cy="input__register-password-repeat"]').should('have.value', '')

    cy.get('[data-cy="button__register-btn"]').click()

    cy.contains('Email is required').should('be.visible')
    cy.contains('Password is required').should('be.visible')
  })

  it("should pass submit with valid inputs", () => {
    cy.get('[data-cy="input__register-email"]').type('newuser@admin.pl')
    cy.get('[data-cy="input__register-password"]').type('newuser123')
    cy.get('[data-cy="input__register-password-repeat"]').type('newuser123')

    cy.get('[data-cy="button__register-btn"]').click()

    cy.contains('Email is required').should('not.exist')
    cy.contains('Password is required').should('not.exist')
  })

  it("should fail submit with empty email", () => {
    cy.get('[data-cy="input__register-password"]').type('newuser123')
    cy.get('[data-cy="input__register-password-repeat"]').type('newuser123')

    cy.get('[data-cy="button__register-btn"]').click()

    cy.contains('Email is required').should('be.visible')
    cy.contains('Password is required').should('not.exist')
  })

  it("should fail submit with empty password (both password inputs)", () => {
    cy.get('[data-cy="input__register-email"]').type('newuser@admin.pl')

    cy.get('[data-cy="button__register-btn"]').click()

    cy.contains('Email is required').should('not.exist')
    cy.contains('Password is required').should('be.visible')
  })

  it("should fail submit with empty repeat password input", () => {
    cy.get('[data-cy="input__register-email"]').type('newuser@admin.pl')
    cy.get('[data-cy="input__register-password"]').type('newuser123')

    cy.get('[data-cy="button__register-btn"]').click()

    cy.contains('Email is required').should('not.exist')
    cy.contains('Password is required').should('be.visible')
  })

  it("should fail submit with not the same passwords", () => {
    cy.get('[data-cy="input__register-email"]').type('example@admin.pl')
    cy.get('[data-cy="input__register-password"]').type('example1')
    cy.get('[data-cy="input__register-password-repeat"]').type('example2')

    cy.get('[data-cy="button__register-btn"]').click()

    cy.contains('Passwords must be the same').should('be.visible')
  })

  it("should fail submit with already existing user", () => {
    cy.get('[data-cy="input__register-email"]').type('admin1@admin.pl')
    cy.get('[data-cy="input__register-password"]').type('admin123')
    cy.get('[data-cy="input__register-password-repeat"]').type('admin123')

    cy.get('[data-cy="button__register-btn"]').click()

    cy.contains('User with email admin1@admin.pl already exists, try to login').should('be.visible')
  })

  it("should back to login button work", () => {
    cy.get('[data-cy="button__back-to-login"]').click()
    cy.url().should('include', '/login')
  })

})