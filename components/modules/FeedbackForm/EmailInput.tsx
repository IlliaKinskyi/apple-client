import { IFeedbackInput } from '@/types/feedbackForm'
import styles from '@/styles/feedbackForm/index.module.scss'

const PhoneInput = ({ register, errors, darkModeClass }: IFeedbackInput) => (
  <label className={`${styles.feedback_form__form__label} ${darkModeClass}`}>
    <span>Email *</span>
    <input
      className={styles.feedback_form__form__input}
      placeholder="john@gmail.com"
      {...register('email', {
        required: 'Enter your email',
        pattern: {
          value: /\S+@\S+\.\S+/,
          message: 'Incorrect email!',
        },
      })}
      type="email"
    />
    {errors.email && (
      <span className={styles.error_alert}>{errors.email?.message}</span>
    )}
  </label>
)

export default PhoneInput
