import { ControleDeEstoquePage } from './app.po';

describe('controle-de-estoque App', function() {
  let page: ControleDeEstoquePage;

  beforeEach(() => {
    page = new ControleDeEstoquePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
