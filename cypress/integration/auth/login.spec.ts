describe(
  'Login',
  {
    retries: {
      runMode: 3,
      openMode: 2,
    },
  },
  () => {
    before(() => {
      cy.visit('/auth/login')
    })

    it('should redirect unauthenticated user to login page', () => {
      cy.visit('/admin/dashboard')
      cy.contains('Sign in to your account').should('be.visible')
    })

    it('should showcase error if login failed', () => {
      cy.get('form').find("[type='submit']").click()
      cy.contains('Email is required').should('be.visible')
      cy.contains('Password is required').should('be.visible')
      cy.get('#email').clear().type('alexjohnsuarez@gmail.com')
      cy.get('#password').clear().type('qwe1234')
      cy.get('form').find("[type='submit']").click()
      cy.contains('Login Failed').should('be.visible')
    })

    it('should redirect to dashboard if user login successful', () => {
      cy.get('#email').clear().type('alexjohnsuarez@gmail.com')
      cy.get('#password').clear().type('qwe123')
      cy.get('form').find("[type='submit']").click()
      cy.contains('Dashboard').should('be.visible')
    })

    it('should redirect to login if cookies is cleared', () => {
      cy.clearCookie('auth')
      cy.getCookie('auth').should('be.null')
      cy.visit('/admin/profile')
      cy.contains('Sign in to your account').should('be.visible')
    })
  },
)

export {}
