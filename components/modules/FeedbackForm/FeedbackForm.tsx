import { $mode } from '@/context/mode'
import { useStore } from 'effector-react'
import { useForm } from 'react-hook-form'
import emailjs from '@emailjs/browser'
import { FeedbackInputs } from '@/types/feedbackForm'
import { MutableRefObject, useRef, useState } from 'react'
import PhoneInput from './PhoneInput'
import EmailInput from './EmailInput'
import NameInput from './NameInput'
import MessageInput from './MessageInput'
import styles from '@/styles/feedbackForm/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { toast } from 'react-toastify'

const FeedbackForm = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedbackInputs>()
  const [spinner, setSpinner] = useState(false)
  const formRef = useRef() as MutableRefObject<HTMLFormElement>

  const submitForm = () => {
    setSpinner(true)
    emailjs
      .sendForm(
        'service_x8fc49m',
        'template_ju8lwsc',
        formRef.current,
        'blhmJpNd6OypszIw-'
      )
      .then((result) => {
        setSpinner(false)
        toast.success(`Message sent! ${result.text}`)
      })
      .catch((error) => {
        setSpinner(false)
        toast.error(`Something went wrong! ${error.text}`)
      })

    formRef.current.reset()
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
          <button>
            {spinner ? (
              <span
                className={spinnerStyles.spinner}
                style={{ top: '6px', left: '47%' }}
              />
            ) : (
              'Send message'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FeedbackForm
