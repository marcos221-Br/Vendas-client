import { IonAvatar, IonButton, IonContent, IonHeader, IonInput, IonItem, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import './Users.css';
import avatar from '../images/user-line_white.svg';
import lock from '../images/lock-2-line.svg';

const Users: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Usuários</IonTitle>
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
            <IonToolbar>
              <IonSearchbar placeholder='Digite o nome de Usuário'></IonSearchbar>
            </IonToolbar>
          </div>
          <div>
            <IonItem>
              <IonAvatar aria-hidden="true" slot="start">
                <img alt="User Image" src={avatar} />
              </IonAvatar>
              <IonInput label="Nome de Usuário" placeholder="Digite o nome" required clearInput={true}></IonInput>
            </IonItem>
            <IonItem>
              <IonAvatar aria-hidden="true" slot="start">
                <img alt="Key Image" src={lock} />
              </IonAvatar>
              <IonInput label="Senha" placeholder="Digite a senha" type='password' required maxlength={16} clearInput={true}></IonInput>
            </IonItem>
          </div>
          <br/>
          <div className='buttons'>
            <IonButton size='default'>Cadastrar</IonButton>
            <IonButton size='default'>Atualizar</IonButton>
            <IonButton size='default'>Excluir</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Users;
