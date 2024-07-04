import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import './Clients.css';
import { ClientController } from '../Controllers/ClientController';

var clientController = new ClientController();

function verifyLogin(){
  if(localStorage.getItem('username') == null){
    window.location.href = "/"
  }
}

function logOut(){
  localStorage.clear()
  window.location.href = '/'
}

function findClient(){
  let name = (document.getElementById('searchBar') as HTMLInputElement).value;
  if(name != ''){
    clearInputs()
    clientController.findClient(name).then(function(response){
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

const Clients: React.FC = () => {
  verifyLogin()
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Clientes</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={logOut}>Sair</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Clientes</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className='main'>
          <IonToolbar>
            <IonSearchbar placeholder='Digite o número de telefone' onIonChange={findClient} id='searchBar'></IonSearchbar>
          </IonToolbar>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Clients;
