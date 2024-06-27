import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Orders.css';

const Orders: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Pedidos</IonTitle>
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
