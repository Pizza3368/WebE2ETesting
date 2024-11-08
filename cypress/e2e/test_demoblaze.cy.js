describe('User Registration, Login, Product Search, Checkout, Navigation, and Contact Form Tests', () => {
    const username = 'testuser' + Math.floor(Math.random() * 1000);
    const password = 'testpassword';
  
    beforeEach(() => {
      cy.visit('https://www.demoblaze.com/');
    });
  
    // Existing tests for sign-up, login, product search, checkout, and navigation
  
    it('Should successfully register a new user (Positive Test)', () => {
      cy.get('#signin2').click();
      cy.wait(500);
  
      cy.get('#sign-username').type(username);
      cy.get('#sign-password').type(password);
  
      cy.get("button[onclick='register()']").click();
  
      cy.on('window:alert', (text) => {
        expect(text).to.equal('Sign up successful.');
      });
    });
  
    it('Should show an error for duplicate user registration (Negative Test)', () => {
      cy.get('#signin2').click();
      cy.wait(500);
  
      cy.get('#sign-username').type(username);
      cy.get('#sign-password').type(password);
  
      cy.get("button[onclick='register()']").click();
  
      cy.on('window:alert', (text) => {
        expect(text).to.equal('This user already exist.');
      });
    });
  
    it('Should not allow login with incorrect credentials (Negative Test)', () => {
      cy.get('#login2').click();
      cy.wait(500);
  
      cy.get('#loginusername').type('wronguser');
      cy.get('#loginpassword').type('wrongpassword');
  
      cy.get("button[onclick='logIn()']").click();
  
      cy.on('window:alert', (text) => {
        expect(text).to.equal('User does not exist.');
      });
    });
  
    it('Should log in successfully with the correct credentials (Positive Test)', () => {
      cy.get('#login2').click();
      cy.wait(500);
  
      cy.get('#loginusername').type(username);
      cy.get('#loginpassword').type(password);
  
      cy.get("button[onclick='logIn()']").click();
  
      cy.contains(`Welcome ${username}`);
    });
  
    // Product Search tests
    it('Should display Phones category products when Phones is clicked', () => {
      cy.contains('Phones').click();
      cy.wait(500);
      cy.get('.card-title').should('contain', 'Samsung galaxy s6');
    });
  
    it('Should display Laptops category products when Laptops is clicked', () => {
      cy.contains('Laptops').click();
      cy.wait(500);
      cy.get('.card-title').should('contain', 'Sony vaio i5');
    });
  
    it('Should display Monitors category products when Monitors is clicked', () => {
      cy.contains('Monitors').click();
      cy.wait(500);
      cy.get('.card-title').should('contain', 'Apple monitor 24');
    });
  
    // Checkout Tests
    it('Should not allow checkout with an empty cart (Negative Test)', () => {
      cy.contains('Cart').click();
      cy.wait(500);
  
      cy.contains('Place Order').click();
  
      cy.get('.modal-dialog').should('not.exist'); // Ensure Place Order modal doesn't open
    });
  
    it('Should show error for invalid checkout details (Negative Test)', () => {
      cy.contains('Samsung galaxy s6').click();
      cy.contains('Add to cart').click();
      cy.on('window:alert', (text) => {
        expect(text).to.equal('Product added');
      });
  
      cy.contains('Cart').click();
      cy.wait(500);
      cy.contains('Place Order').click();
  
      cy.get('#name').type('Test User');
      cy.get('#country').type('Country');
      cy.get('#city').type('City');
      cy.get('#card').type('invalidcard'); // Invalid credit card format
      cy.get('#month').type('Month');
      cy.get('#year').type('Year');
      cy.contains('Purchase').click();
  
      cy.on('window:alert', (text) => {
        expect(text).not.to.equal('Thank you for your purchase!');
      });
    });
  
    it('Should successfully checkout with valid details (Positive Test)', () => {
      cy.contains('Samsung galaxy s6').click();
      cy.contains('Add to cart').click();
      cy.on('window:alert', (text) => {
        expect(text).to.equal('Product added');
      });
  
      cy.contains('Cart').click();
      cy.wait(500);
      cy.contains('Place Order').click();
  
      cy.get('#name').type('Test User');
      cy.get('#country').type('Country');
      cy.get('#city').type('City');
      cy.get('#card').type('1234567890123456');
      cy.get('#month').type('12');
      cy.get('#year').type('2025');
      cy.contains('Purchase').click();
  
      cy.on('window:alert', (text) => {
        expect(text).to.equal('Thank you for your purchase!');
      });
    });
  
    // New Contact Form Tests
  
    it('Should successfully send a message with filled contact form (Positive Test)', () => {
      cy.contains('Contact').click(); // Open the Contact modal
      cy.wait(500); // Wait for the modal to appear
  
      // Fill out the contact form with valid details
      cy.get('#recipient-email').type('test@example.com');
      cy.get('#recipient-name').type('Test User');
      cy.get('#message-text').type('This is a test message.');
  
      cy.contains('Send message').click(); // Click the Send message button
  
      // Verify success message
      cy.on('window:alert', (text) => {
        expect(text).to.equal('Thanks for the message!!');
      });
    });
  
    it('Should not send a message with empty contact form (Negative Test)', () => {
      cy.contains('Contact').click(); // Open the Contact modal
      cy.wait(500); // Wait for the modal to appear
  
      // Leave the form fields empty
      cy.contains('Send message').click(); // Click the Send message button
  
      // Ensure no success message is displayed as the form is empty
      cy.on('window:alert', (text) => {
        expect(text).not.to.equal('Thanks for the message!!'); // Expect the alert NOT to show the success message
      });
    });
  });
  