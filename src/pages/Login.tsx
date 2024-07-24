import { IonAvatar, IonButton, IonContent, IonHeader, IonInput, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Login.css';
import avatar from '../Images/user-line_white.svg';
import lock from '../Images/lock-2-line.svg';
import { sendJson, setHeader } from '../components/Json';

function setLogin() {
  let name = (document.getElementById('name') as HTMLInputElement).value
  let password = (document.getElementById('password') as HTMLInputElement).value
  let token = btoa(name + ':' + password)
  let json = JSON.stringify({ name: name, password: password})
  setHeader('Authorization','Basic ' + token)
  sendJson('/login','POST',json)?.then(function(response:any) {
    if(response !== undefined){
      sessionStorage.setItem('username',name)
      sessionStorage.setItem('role',response.role)
      sessionStorage.setItem('token','Basic ' + token)
      window.location.href = '/client'
    }else{
      (document.getElementById('message') as HTMLTextAreaElement).innerHTML = 'Usuário ou senha incorretos!'
    }
  })
}

function verifyLogin(){
  if(sessionStorage.getItem('token') != null){
    window.location.href = '/client'
  }
}

const Login: React.FC = () => {
  verifyLogin();
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
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className='main'>
          <h1>Entrar</h1>
          <div>
            <IonItem>
              <IonAvatar aria-hidden="true" slot="start">
                <img alt="User Image" src={avatar} />
              </IonAvatar>
              <IonInput label="Nome de Usuário" placeholder="Digite seu nome" required id='name' labelPlacement='stacked'></IonInput>
            </IonItem>
            <IonItem>
              <IonAvatar aria-hidden="true" slot="start">
                <img alt="Lock Image" src={lock} />
              </IonAvatar>
              <IonInput label="Senha" placeholder="Digite sua senha" type='password' required maxlength={16} clearInput={true} id='password' labelPlacement='stacked'></IonInput>
            </IonItem>
            <p id='message'></p>
          </div>
          <br/>
          <div className='buttons'>
            <IonButton size='default' onClick={setLogin}>Entrar</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;