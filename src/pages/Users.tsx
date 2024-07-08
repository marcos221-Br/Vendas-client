import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonPage, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import './Users.css';
import avatar from '../images/user-line_white.svg';
import lock from '../images/lock-2-line.svg';
import card from '../images/id-card-line.svg';
import { UserController } from '../Controllers/UserController';
import { User } from '../Models/User';

var userController = new UserController();
var user = new User();

function verifyLogin(){
  if(sessionStorage.getItem('username') == null){
    window.location.href = '/'
  }else if(sessionStorage.getItem('role') != 'administrator'){
    window.location.href = '/client'
  }
}

function findUser(){
  let name = (document.getElementById('searchBar') as HTMLInputElement).value;
  if(name != ''){
    clearInputs()
    userController.findUser(name).then(function(response){
      if(response.id !== undefined){
        (document.getElementById('searchBar') as HTMLInputElement).value = '';
        (document.getElementById('id') as HTMLInputElement).value = response.id;
        (document.getElementById('name') as HTMLInputElement).value = response.name;
        (document.getElementById('role') as HTMLInputElement).value = response.role;
        (document.getElementById('password') as HTMLInputElement).value = '';
      }else{
        (document.getElementById('message') as HTMLTextAreaElement).innerHTML = 'Usuário não encontrado!';
      }
    })
  }
}

function clearInputs(){
  (document.getElementById('message') as HTMLTextAreaElement).innerHTML = '';
  (document.getElementById('searchBar') as HTMLInputElement).value = '';
  (document.getElementById('id') as HTMLInputElement).value = '0';
  (document.getElementById('name') as HTMLInputElement).value = '';
  (document.getElementById('role') as HTMLInputElement).value = '';
  (document.getElementById('password') as HTMLInputElement).value = '';
}

function createUser(){
  user.setName((document.getElementById('name') as HTMLInputElement).value);
  user.setPassword((document.getElementById('password') as HTMLInputElement).value);
  user.setRole((document.getElementById('role') as HTMLInputElement).value);
  userController.createUser(user).then(function(){
    (document.getElementById('message') as HTMLTextAreaElement).innerHTML = "Usuário criado com sucesso!"
  })
}

function updateUser() {
  user.setId(parseInt((document.getElementById('id') as HTMLInputElement).value));
  user.setName((document.getElementById('name') as HTMLInputElement).value);
  user.setPassword((document.getElementById('password') as HTMLInputElement).value);
  user.setRole((document.getElementById('role') as HTMLInputElement).value);
  userController.updateUser(user).then(function(){
    (document.getElementById('message') as HTMLTextAreaElement).innerHTML = "Usuário atualizado com sucesso!"
  })
}

function deleteUser() {
  user.setId(parseInt((document.getElementById('id') as HTMLInputElement).value));
  userController.deleteUser(user).then(function(){
    (document.getElementById('message') as HTMLTextAreaElement).innerHTML = "Usuário excluido com sucesso!"
    clearInputs()
  })
}

function logOut(){
  localStorage.clear()
  window.location.href = '/'
}

const Users: React.FC = () => {
  verifyLogin()
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Usuários</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={logOut}>Sair</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Usuários</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className='mainUsers'>
          <h1>Usuário</h1>
          <div>
            <IonToolbar>
              <IonSearchbar placeholder='Digite o nome de Usuário' onIonChange={findUser} id='searchBar'></IonSearchbar>
            </IonToolbar>
          </div>
          <div>
            <IonItem>
              <IonInput label="Número de Usuário" id='id' disabled></IonInput>
            </IonItem>
            <IonItem>
              <IonAvatar aria-hidden="true" slot="start">
                <img alt="User Image" src={avatar} />
              </IonAvatar>
              <IonInput label="Nome de Usuário" placeholder="Digite o nome" required clearInput={true} id='name'></IonInput>
            </IonItem>
            <IonItem>
              <IonAvatar aria-hidden="true" slot="start">
                <img alt="Key Image" src={lock} />
              </IonAvatar>
              <IonInput label="Senha" placeholder="Digite a senha" type='password' required maxlength={16} clearInput={true} id='password'></IonInput>
            </IonItem>
            <IonItem>
              <IonAvatar aria-hidden="true" slot="start">
                <img alt="User Image" src={card} />
              </IonAvatar>
              <IonSelect label="Cargo" placeholder="Tipo de usuário" id='role'>
                <IonSelectOption value="administrator">Administrador</IonSelectOption>
                <IonSelectOption value="user">Usuário</IonSelectOption>
              </IonSelect>
            </IonItem>
            <p id='message'></p>
          </div>
          <br/>
          <div className='buttons'>
            <IonButton size='default' onClick={createUser}>Cadastrar</IonButton>
            <IonButton size='default' onClick={updateUser}>Atualizar</IonButton>
            <IonButton size='default' onClick={deleteUser}>Excluir</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Users;
