import { IFeedbackInput } from '@/types/feedbackForm'
import styles from '@/styles/feedbackForm/index.module.scss'

const PhoneInput = ({ register, errors, darkModeClass }: IFeedbackInput) => (
  <label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
    <span>Phone *</span>
    <input
      className={styles.feedback_form__form__input}
      type="phone"
      placeholder="+38 099 99 99 999"
      {...register('phone', {
        required: 'Enter your phone number',
        pattern: {
          value: /^\d*[1-9]\d*$/,
          message: 'Incorrect phone number!',
        },
        minLength: 11,
        maxLength: 11,
      })}
    />
    {errors.phone && (
      <span className={styles.error_alert}>{errors.phone?.message}</span>
    )}
    {errors.phone && errors.phone.type === 'minLength' && (
      <span className={styles.error_alert}>Minimum 11 digits!</span>
    )}
    {errors.phone && errors.phone.type === 'maxLength' && (
      <span className={styles.error_alert}>No more than 11 digits!</span>
    )}
  </label>
)

export default PhoneInput
