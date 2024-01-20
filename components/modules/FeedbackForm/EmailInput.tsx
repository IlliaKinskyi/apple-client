import { IFeedbackInput } from '@/types/feedbackForm'
import styles from '@/styles/feedbackForm/index.module.scss'

const PhoneInput = ({ register, errors, darkModeClass }: IFeedbackInput) => (
  <label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
    <span>Email *</span>
    <input
      className={styles.feedback_form__form__input}
      placeholder="+3 8099 999 99 99"
      {...register('phone', {
        required: 'Enter your phone number',
        minLength: 11,
        maxLength: 11,
        pattern: {
          value: /^\d*[1-9]\d*$/,
          message: 'Invalid value!',
        },
      })}
      type="tel"
    />
    {errors.phone && (
      <span className={styles.error_alert}>{errors.phone?.message}</span>
    )}
    {errors.phone && errors.phone.type === 'minLength' && (
      <span className={styles.error_alert}>Minimum 11 numbers!</span>
    )}
    {errors.phone && errors.phone.type === 'maxLength' && (
      <span className={styles.error_alert}>No more than 11 numbers!</span>
    )}
  </label>
)

export default PhoneInput
