import { useForm } from 'react-hook-form'
import NameInput from '@/components/elements/AuthPage/NameInput'
import { IInputs } from '@/types/auth'
import PasswordInput from '@/components/elements/AuthPage/PasswordInput'
import { signInFx } from '@/app/api/auth'
import { useState } from 'react'
import { showAuthError } from '@/utils/errors'
import styles from '@/styles/auth/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import { useStore } from 'effector-react'
import { $mode } from '@/context/mode'
import { useRouter } from 'next/router'

const SignInForm = () => {
  const [spinner, setSpinner] = useState(false)
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm<IInputs>()

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const route = useRouter()

  const onSubmit = async (data: IInputs) => {
    try {
      setSpinner(true)
      await signInFx({
        url: '/users/login',
        username: data.name,
        password: data.password,
      })

      resetField('name')
      resetField('password')
      route.push('/dashboard')
    } catch (error) {
      showAuthError(error)
    } finally {
      setSpinner(false)
    }
  }

  return (
    <form
      className={`${styles.form} ${darkModeClass}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className={`${styles.form_title} ${styles.title} ${darkModeClass}`}>
        Login
      </h2>
      <NameInput register={register} errors={errors} />
      <PasswordInput register={register} errors={errors} />
      <button
        className={`${styles.form__button} ${styles.button} ${styles.submit} ${darkModeClass}`}
      >
        {spinner ? <div className={spinnerStyles.spinner}></div> : 'SIGN IN'}
      </button>
    </form>
  )
}

export default SignInForm
