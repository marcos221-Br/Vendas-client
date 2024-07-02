import { IonAvatar, IonButton, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Users.css';
import avatar from '../images/user-line_white.svg';
import lock from '../images/lock-2-line.svg';
import { sendJson, setHeader } from '../components/Json';
import { Route } from 'react-router-dom';
import Clients from './Clients';

function setLogin() {
  let name = (document.getElementById('name') as HTMLInputElement).value
  let password = (document.getElementById('password') as HTMLInputElement).value
  let token = btoa(name + ':' + password)
  let json = JSON.stringify({ name: name, password: password})
  setHeader('Authorization','Basic ' + token)
  sendJson('/login','POST',json)?.then(function(response:any) {
    if(response !== undefined){
      localStorage.setItem('username',name)
      localStorage.setItem('role',response.role)
      localStorage.setItem('token','Basic ' + token)
      window.location.href = "/client"
    }else{
      (document.getElementById('message') as HTMLTextAreaElement).innerHTML = 'Usuário ou senha incorretos!'
    }
  })
}

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Usuários</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className='main'>
          <div>
            <IonItem>
              <IonAvatar aria-hidden="true" slot="start">
                <img alt="User Image" src={avatar} />
              </IonAvatar>
              <IonInput label="Nome de Usuário" placeholder="Digite seu nome" required clearInput={true} id='name'></IonInput>
            </IonItem>
            <IonItem>
              <IonAvatar aria-hidden="true" slot="start">
                <img alt="Key Image" src={lock} />
              </IonAvatar>
              <IonInput label="Senha" placeholder="Digite sua senha" type='password' required maxlength={16} clearInput={true} id='password'></IonInput>
            </IonItem>
            <p id='message'></p>
          </div>
          <br/>
          <div className='buttons'>
            <IonButton size='default' onClick={setLogin}>Entrar</IonButton>
          </div>
        </div>
        <Route exact path="/clients">
            <Clients />
        </Route>
      </IonContent>
    </IonPage>
  );
};

export default Login;