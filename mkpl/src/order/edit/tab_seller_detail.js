/* eslint-disable */
import { FormInput } from 'spark-form';
import styles from './tab.modules.css';

export const SellerDetail = () => {
  const disabled = true;
  return (
    <div className={styles.tabHeader}>
      <p className={styles.text} style={{ margin: '1em 1em 1em 1em' }}>
        Seller Organization Name
      </p>
      <FormInput
        disabled={disabled}
        className={styles.searchInput}
        style={{ marginLeft: '1em', width: '300px' }}
      />
    </div>
  );
};

export default SellerDetail;
