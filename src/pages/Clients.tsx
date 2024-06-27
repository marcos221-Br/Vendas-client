import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Clients.css';

const Clients: React.FC = () => {
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
