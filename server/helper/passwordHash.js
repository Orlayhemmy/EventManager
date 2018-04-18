import bcrypt from 'bcryptjs';

/**
 * @param  {object} password
 * @returns {object} hash
 */
export default function passwordHash(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}
