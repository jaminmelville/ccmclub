export const slug = (text) => {
  const parser = new DOMParser;
  const dom = parser.parseFromString(
      '<!doctype html><body>' + text,
      'text/html');
  const parsed = dom.body.textContent;
  return parsed.replace(/\W/g, '').toLowerCase();
}
