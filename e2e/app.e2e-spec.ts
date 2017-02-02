import { RunDownPage } from './app.po';

describe('run-down App', function() {
  let page: RunDownPage;

  beforeEach(() => {
    page = new RunDownPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
