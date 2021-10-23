import { FormEvent, useContext, useState } from 'react'
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc'
import { AuthContext } from '../../contexts/auth'
import { api } from '../../services/api'
import styles from './styles.module.scss'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function SendMessageForm() {

  const { user, signOut } = useContext(AuthContext)
  const [message, setMessage] = useState('')

  async function handleSendMessage(event: FormEvent) {
    event.preventDefault()

    if (!message.trim()) {
      return
    }

    await api.post('messages', {
      message
    })

    setMessage('')
    toast.success('Message sent!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      // icon: "🚀"
      });
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={signOut} className={styles.signOutButton}>
        <VscSignOut size="32" />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt="" />
        </div>
          <strong className={styles.userName}>{user?.name}</strong>
          <span className={styles.userGithub}>
            <VscGithubInverted size="16"/>
            {user?.login}
          </span>
      </header>

      <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <label htmlFor="message">Mensagem</label>
        <textarea
        name="message"
        id="message"
        placeholder="Qual a sua expectativa para o evento?"
        onChange={event => setMessage(event.target.value)}
        value={message}
        />
        <button type="submit">Enviar Mensagem</button>
      </form>
    </div>
  )
}