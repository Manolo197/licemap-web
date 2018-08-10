import { LicemapWebPage } from './app.po';

describe('licemap-web App', function() {
  let page: LicemapWebPage;

  beforeEach(() => {
    page = new LicemapWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
