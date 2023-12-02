import PropTypes from 'prop-types';
import './pointInput.styles.css';

const PointInput = (props) => {
  return (
    <div className="inputContainer">
      <label>{props.label}</label>
      <input onChange={(e) => props.onChange(e.target.value)} />
    </div>
  );
};

PointInput.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
};

export default PointInput;
