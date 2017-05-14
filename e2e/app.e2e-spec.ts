import { CodingInformationAlgorithmsPage } from './app.po';

describe('coding-information-algorithms App', () => {
  let page: CodingInformationAlgorithmsPage;

  beforeEach(() => {
    page = new CodingInformationAlgorithmsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
