import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextField = ({ field, id, type, placeholder, value, onChange, error}) => {
  return  (
    <div id="input text-center" className="pb-2">
      {error && <span className="help-block">{error}</span>}
      <input 
      id={id}
      type={type} 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange} required/>
    <border></border>
    </div>
  );
}

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired, 
  error: PropTypes.string,
}

TextField.defaultProps = {
  type: 'text'
}

export default TextField;