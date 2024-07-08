import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Orders.css';

function verifyLogin(){
  if(sessionStorage.getItem('username') == null){
    window.location.href = "/"
  }
}

function logOut(){
  localStorage.clear()
  window.location.href = '/'
}

const Orders: React.FC = () => {
  verifyLogin()
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pedidos</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={logOut}>Sair</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Pedidos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Pedidos" />
      </IonContent>
    </IonPage>
  );
};

export default Orders;
