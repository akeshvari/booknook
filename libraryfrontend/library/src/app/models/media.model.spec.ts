import { Media } from './media.model';

describe('Media', () => {
  it('should create an instance', () => {
    expect(new Media("title", "author", "genre", "mediatype", 1, 5, "image", "description")).toBeTruthy();
  });
});
