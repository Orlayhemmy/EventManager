import shortid from 'shortid';

/**
 * @returns {object} code generated
 */
export default function generateShortCode() {
  const shortCode = shortid.generate();
  return shortCode;
}
