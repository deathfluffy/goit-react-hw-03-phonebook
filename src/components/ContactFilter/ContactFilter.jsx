import propTypes from 'prop-types';

import css from './ContactFilter.module.css'

export default function ContactFilter ({ filter, onFilter })  {
  return (
    <section className={css.FilterSection}>
      <form className={css.FormLabel} htmlFor="filter">Find contacts by name</form>
      <div>
        <input className={css.inputfilter}
          type="text"
          name="filter"
          value={filter}
          onChange={onFilter}
        />
      </div>
    </section>
  );
};

ContactFilter.propTypes = {
  onFilter: propTypes.func,
  filter: propTypes.string,
};