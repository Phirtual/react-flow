describe('Basic Flow Rendering', () => {
  it('renders a flow with three nodes', () => {
    cy.visit('/index.html');

    cy.get('.react-graph__renderer');
    cy.get('.react-graph__node').should('have.length', 3);
    cy.get('.react-graph__edge').should('have.length', 2);
  });

  it('all nodes have handles', () => {
    cy.get('.react-graph__node').children('div').children('.react-graph__handle');
  });

  it('selects a node', () => {
    cy.get('.react-graph__node:first').click().should('have.class', 'selected');
  });

  it('selects an edge', () => {
    cy.get('.react-graph__edge:first').click().should('have.class', 'selected');
  });

  it('drags a node', () => {
    const styleBeforeDrag = Cypress.$('.react-graph__node:first').css('transform');

    cy.drag('.react-graph__node:first', { x: 500, y: 25 })
      .then($el => {
        const styleAfterDrag = $el.css('transform');
        expect(styleBeforeDrag).to.not.equal(styleAfterDrag);
      });
  });

  it('removes a node', () => {
    cy.get('.react-graph__node:last').click();
    cy.get('body').type('{backspace}');

    cy.get('.react-graph__node').should('have.length', 2);
    cy.get('.react-graph__edge').should('have.length', 1);
  });
});