import { useContext }  from 'react';

import { MessageList } from './components/MessageList';
import { LoginBox } from './components/LoginBox';
import { SendMessageForm } from './components/SendMessageForm';
import { AuthContext } from './contexts/auth';

import styles from './App.module.scss';

export function App() {
  const { user } = useContext(AuthContext);

  return (
   <main className={styles.contentWrapper}>
      <MessageList />
     { !!user ? <SendMessageForm/> : <LoginBox />}
   </main>
  )
}