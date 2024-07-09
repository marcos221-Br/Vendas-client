import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Orders.css';
import survey from '../Images/survey-line.svg';
import add from '../Images/add-line.svg';
import pencil from '../Images/pencil-line.svg';
import trashCan from '../Images/delete-bin-5-line.svg';
import { Item } from '../Models/Item';

var item = new Item();

function verifyLogin(){
  if(sessionStorage.getItem('username') == null){
    window.location.href = "/"
  }
}

function logOut(){
  sessionStorage.clear()
  window.location.href = '/'
}

function addItem(){
  let list = (document.getElementById('listItens') as HTMLIonListElement);
  let quantity = document.createElement('ion-input');
  let description = document.createElement('ion-input');
  let value = document.createElement('ion-input');
  let editButton = document.createElement('ion-button');
  let editIcon = document.createElement('ion-icon');
  let deleteButton = document.createElement('ion-button');
  let deleteIcon = document.createElement('ion-icon');
  quantity.value = '1';
  description.value = 'tste';
  value.value = '5';
  quantity.setAttribute('className','itemQuantity');
  editIcon.setAttribute('icon',pencil);
  editButton.setAttribute('color','warning');
  editButton.appendChild(editIcon);
  //editButton.setAttribute('id','A fazer');
  //editButton.addEventListener('click',editOrder);
  deleteIcon.setAttribute('icon',trashCan);
  deleteButton.setAttribute('color','danger');
  deleteButton.appendChild(deleteIcon);
  //deleteButton.setAttribute('id','A fazer');
  //deleteButton.addEventListener('click',deleteOrder);
  let item = document.createElement('ion-item');
  item.setAttribute('id','0')
  item.setAttribute('lines','full')
  item.appendChild(quantity);
  item.appendChild(description);
  item.appendChild(value);
  item.appendChild(editButton);
  item.appendChild(deleteButton);
  list.appendChild(item);
}

function findItens(){
  if(sessionStorage.getItem('orderId') != null){
    (document.getElementById('idOrder') as HTMLTextAreaElement).value = sessionStorage.getItem('orderId')+'';

  }
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
        <div className='mainOrder'>
          <div>
            <IonItem>
              <IonInput label="Número do Pedido" id='idOrder' disabled></IonInput>
            </IonItem>
            <IonItem>
              <IonAvatar aria-hidden="true" slot="start">
                <img alt="Survey Image" src={survey} />
              </IonAvatar>
              <IonInput label='Quant. de itens' labelPlacement='stacked' className='itemQuantity'></IonInput>
              <IonInput label='Itens do Pedido' labelPlacement='stacked'></IonInput>
              <IonInput label='Valor Unit.' labelPlacement='stacked' className='itemValue'></IonInput>
              <IonButton size='small' slot='end' shape='round' onClick={addItem}>
                <IonIcon slot='icon-only' icon={add}></IonIcon>
              </IonButton>
            </IonItem>
          </div>
          <div id='itensList'>
            <IonList id='listItens'>
            </IonList>
          </div>
          <p id='message'>Nenhum pedido foi selecionado!</p>
        </div>
        <IonButton onClick={findItens}>Teste</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Orders;
