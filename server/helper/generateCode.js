import shortid from 'shortid';

export default function generateShortCode() {
  const shortCode = shortid.generate();
  return shortCode;
}
