import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { useForm } from 'react-hook-form'
import { FeedbackInputs } from '@/types/feedbackForm'
import { MutableRefObject, useRef } from 'react'
import PhoneInput from './PhoneInput'
import EmailInput from './EmailInput'
import NameInput from './NameInput'
import MessageInput from './MessageInput'
import styles from '@/styles/feedbackForm/index.module.scss'

const FeedbackForm = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedbackInputs>()
  const formRef = useRef() as MutableRefObject<HTMLFormElement>

  const submitForm = (data: FeedbackInputs) => {
    console.log(data)
  }

  return (
    <div className={`${styles.feedback_form} ${darkModeClass}`}>
      <h3 className={`${styles.feedback_form__title} ${darkModeClass}`}>
        Feedback form
      </h3>
      <form
        className={styles.feedback_form__form}
        onSubmit={handleSubmit(submitForm)}
        ref={formRef}
      >
        <NameInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />
        <PhoneInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />
        <EmailInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />
        <MessageInput
          register={register}
          errors={errors}
          darkModeClass={darkModeClass}
        />
        <div className={styles.feedback_form__form__btn}>
          <button>Send message</button>
        </div>
      </form>
    </div>
  )
}

export default FeedbackForm
