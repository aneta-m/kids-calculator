import React from 'react'
import styles from './Display.module.scss';

const Display = ({value}: {value: string}) => {
    const isValueNaN = value.includes('Infinity') || value === 'NaN';
    
  return (
    isValueNaN ?
    <p className={`${styles.display} ${styles.warning}`}>You cannot divide by 0!</p>
:
    <p className={styles.display}>{value}</p>
  )
}

export default Display