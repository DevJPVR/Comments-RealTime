import { useEffect } from 'react';
import { VscGithubInverted } from 'react-icons/vsc';

import { api } from '../../services/api';

import styles from './styles.module.scss';

type AuthResponse = {
   token: string,
   user: {
      id: string,
      avatar_url: string,
      name: string,
      login: string;
   }
}

export function LoginBox(){
   const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=3f8478d6a999a4ec0237`;

   useEffect(() => {
      const url = window.location.href;
      const hasGitHubCode = url.includes('?code=');

      async function signIn (githubCode: string) {
         const response = await api.post<AuthResponse>('authenticate', {
            code: githubCode,
         })

         const { token, user } = response.data;

         localStorage.setItem('@dowhile:token', token);

         console.log(user);
      }

      if (hasGitHubCode) {
         const [urlWithoutCode, githubCode] = url.split('?code=')

         window.history.pushState({}, '', urlWithoutCode);

         signIn(githubCode);
      }

   }, [])

   return(
      <div className={styles.loginBoxWrapper}>
            <strong>Entre e compartilhe sua mensagem</strong>
            <a href={signInUrl} className={styles.signInWithGithub}>
               <VscGithubInverted size="24px" />
               Entrar com Github
            </a>
      </div>
   )
}