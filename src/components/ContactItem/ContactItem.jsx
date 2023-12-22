import propTypes from 'prop-types';
import css from './ContactItem.module.css'

export const ContactItem = ({ id, name, number, onDelete }) =>  {
  return (
    <div className={css.item}>
      <span>{name}:</span>
      <span>{number}</span>
      <button className={css.delButton} type="button" onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
};

ContactItem.propTypes = {
  name: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  number: propTypes.string.isRequired,
  onDelete: propTypes.func.isRequired,
};