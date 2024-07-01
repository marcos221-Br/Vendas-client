import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Clients.css';

function verifyLogin(){
  if(localStorage.getItem('login') == null){
    window.location.href = "/"
  }
}

const Clients: React.FC = () => {
  verifyLogin()
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Clientes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Clientes</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Clientes" />
      </IonContent>
    </IonPage>
  );
};

export default Clients;
