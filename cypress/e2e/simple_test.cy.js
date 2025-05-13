describe('CV Form Submission Test', () => {
    it('Fills and submits the CV form', () => {
      // Set token in localStorage before page load
      cy.visit('http://localhost:3000/add-new-cv', {
        onBeforeLoad(win) {
          win.localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjRiNTBhMjY5MmJkYzZmZTNmOWFlNiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc0Njg1ODUxNSwiZXhwIjoxNzQ2ODYyMTE1fQ.PHLdz_YrJEYlMxgtqXekNiTjvMewZReEGXFzQzDNHME');
        }
      });
  
      // Rest of your form code...
      cy.get('input[placeholder="Full Name"]').type('Anjana Hashan');
      cy.get('input[placeholder="Name with Initials"]').type('A. Hashan');
      cy.get('input[placeholder="NIC Number"]').type('123456789');
      cy.get('input[placeholder="Email"]').type('anjana@hashan.com');
      cy.get('input[placeholder="Postal Address"]').type('123 Main Street makadura , Mathara');
      cy.get('input[placeholder="District"]').type('Mathara');
      cy.get('input[placeholder="Date of Birth"]').type('2002-03-28');
      cy.get('input[placeholder="Mobile Number"]').type('0712345678');
      cy.get('input[placeholder="Landline Number (optional)"]').type('0112345678');
      cy.get('input[placeholder="Higher Education Institute"]').type('SLIIT University');
      cy.get('select').eq(0).select('Male');
  
      cy.get('select').eq(1).select('Internship');
      cy.get('input[placeholder="Higher Educational Qualifications"]').type('BSc in Computer Science');
      cy.get('input[placeholder="Internship Category"]').type('Software Engineering');
  
      cy.get('input[placeholder="Emergency Contact Name 1"]').type('Hashan Anjana');
      cy.get('input[placeholder="Emergency Mobile Number 1"]').type('0771234567');
      cy.get('input[placeholder="Emergency Contact Name 2"]').type('Halapage Anjana');
      cy.get('input[placeholder="Emergency Mobile Number 2"]').type('0751234567');
  
      cy.get('input[type="file"]').eq(0).selectFile('cypress/fixtures/abc.docx');
      cy.get('input[type="file"]').eq(1).selectFile('cypress/fixtures/abc.pdf');
  
      cy.contains('Submit CV').click();
    });
  });
  