import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import './Clients.css';
import avatar from '../Images/user-line_white.svg';
import smartphone from '../Images/smartphone-line.svg';
import pencil from '../Images/pencil-line.svg';
import trashCan from '../Images/delete-bin-5-line.svg';
import { ClientController } from '../Controllers/ClientController';
import { Client } from '../Models/Client';
import { OrderController } from '../Controllers/OrderController';
import { Order } from '../Models/Order';

var clientController = new ClientController();
var client = new Client();
var orderController = new OrderController();
var order = new Order();

function verifyLogin(){
  if(sessionStorage.getItem('username') == null){
    window.location.href = '/'
  }
}

function logOut(){
  sessionStorage.clear()
  window.location.href = '/'
}

function findClient(){
  let cellphone = (document.getElementById('searchBar') as HTMLInputElement).value;
  if(cellphone != ''){
    clearInputs()
    clientController.findClient(cellphone).then(function(response){
      if(response.id !== undefined){
        (document.getElementById('searchBar') as HTMLInputElement).value = '';
        (document.getElementById('idClient') as HTMLInputElement).value = response.id;
        (document.getElementById('name') as HTMLInputElement).value = response.name;
        (document.getElementById('cellphone') as HTMLInputElement).value = response.cellphone;
        findOrders(response.id);
      }else{
        (document.getElementById('clientMessage') as HTMLTextAreaElement).innerHTML = 'Cliente não encontrado!';
      }
    })
  }
}

function createClient(){
  client.setName((document.getElementById('name') as HTMLInputElement).value);
  client.setCellphone((document.getElementById('cellphone') as HTMLInputElement).value);
  clientController.createClient(client).then(function(response){
    (document.getElementById('idClient') as HTMLInputElement).value = response.id;
    (document.getElementById('clientMessage') as HTMLTextAreaElement).innerHTML = "Cliente criado com sucesso!"
  })
}

function updateClient() {
  client.setId(parseInt((document.getElementById('idClient') as HTMLInputElement).value));
  client.setName((document.getElementById('name') as HTMLInputElement).value);
  client.setCellphone((document.getElementById('cellphone') as HTMLInputElement).value);
  clientController.updateClient(client).then(function(){
    (document.getElementById('clientMessage') as HTMLTextAreaElement).innerHTML = "Cliente atualizado com sucesso!"
  })
}

function deleteClient() {
  client.setId(parseInt((document.getElementById('idClient') as HTMLInputElement).value));
  clientController.deleteClient(client).then(function(){
    (document.getElementById('clientMessage') as HTMLTextAreaElement).innerHTML = "Cliente excluido com sucesso!"
    clearInputs()
  })
}

function deleteOrder(value:any) {
  order.setId(value.target.id);
  orderController.deleteOrder(order).then(function(){
    findOrders(parseInt((document.getElementById('idClient') as HTMLInputElement).value));
    (document.getElementById('orderMessage') as HTMLInputElement).innerHTML = "Pedido excluido com sucesso!";
  })
}

function editOrder(value:any) {
  sessionStorage.setItem('orderId',value.target.id);
  window.location.href = '/order';
}

function findOrders(idClient:Number){
  let list = (document.getElementById('listOrders') as HTMLIonListElement)
  orderController.findOrders(idClient).then(function(orders) {
    if(orders.length > 0){
      for (let i = 0; i < orders.length; i++) {
        let id = document.createElement('ion-label');
        let date = document.createElement('ion-label');
        let editButton = document.createElement('ion-button');
        let editIcon = document.createElement('ion-icon');
        let deleteButton = document.createElement('ion-button');
        let deleteIcon = document.createElement('ion-icon');
        editIcon.setAttribute('icon',pencil);
        editButton.setAttribute('color','warning');
        editButton.appendChild(editIcon);
        editButton.setAttribute('id',orders[i].id);
        editButton.addEventListener('click',editOrder);
        deleteIcon.setAttribute('icon',trashCan);
        deleteButton.setAttribute('color','danger');
        deleteButton.appendChild(deleteIcon);
        deleteButton.setAttribute('id',orders[i].id);
        deleteButton.addEventListener('click',deleteOrder);
        id.innerHTML = orders[i].id;
        date.innerHTML = orders[i].date;
        let item = document.createElement('ion-item');
        item.setAttribute('lines','full')
        item.appendChild(id);
        item.appendChild(date);
        item.appendChild(editButton);
        item.appendChild(deleteButton);
        if(i == 0){
          list.replaceChildren(item);
        }else{
          list.appendChild(item);
        }
      }
    }else{
      let message = document.createElement('ion-label');
      message.innerHTML = 'O Cliente não possui pedidos registrados!'
      let item = document.createElement('ion-item');
        item.setAttribute('lines','full')
        item.appendChild(message);
      list.replaceChildren(item);
    }
  })
}

function createOrder(){
  if((document.getElementById('idClient') as HTMLInputElement).value != '' && (document.getElementById('idClient') as HTMLInputElement).value != '0'){
    order.setIdClient(parseInt((document.getElementById('idClient') as HTMLInputElement).value));
    orderController.createOrder(order).then(function(response){
      (document.getElementById('orderMessage') as HTMLTextAreaElement).innerHTML = "Pedido criado com sucesso!";
      sessionStorage.setItem('orderId',response.id);
      window.location.href = '/order';
    })
  }else{
    (document.getElementById('orderMessage') as HTMLTextAreaElement).innerHTML = "Necessário fornecer um cliente!";
  }
}

function clearInputs(){
  (document.getElementById('clientMessage') as HTMLTextAreaElement).innerHTML = '';
  (document.getElementById('searchBar') as HTMLInputElement).value = '';
  (document.getElementById('idClient') as HTMLInputElement).value = '0';
  (document.getElementById('name') as HTMLInputElement).value = '';
  (document.getElementById('cellphone') as HTMLInputElement).value = '';
  (document.getElementById('orderMessage') as HTMLInputElement).innerHTML = '';
  let list = (document.getElementById('listOrders') as HTMLIonListElement);
  let p = document.createElement('p');
  p.innerHTML = 'A lista está vazia'
  let item = document.createElement('ion-item');
  item.appendChild(p);
  list.replaceChildren(item);
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
        <div className='mainClient'>
          <h1>Cliente</h1>
          <div>
            <IonToolbar>
              <IonSearchbar placeholder='Digite o número de telefone' onIonChange={findClient} id='searchBar'></IonSearchbar>
            </IonToolbar>
          </div>
          <div>
            <IonItem>
              <IonInput label="Número de Cliente" id='idClient' disabled labelPlacement='stacked'></IonInput>
            </IonItem>
            <IonItem>
              <IonAvatar aria-hidden="true" slot="start">
                <img alt="User Image" src={avatar} />
              </IonAvatar>
              <IonInput label="Nome" placeholder="Digite o nome do cliente" required clearInput={true} id='name' labelPlacement='stacked'></IonInput>
            </IonItem>
            <IonItem>
              <IonAvatar aria-hidden="true" slot="start">
                <img alt="Smartphone Image" src={smartphone} />
              </IonAvatar>
              <IonInput label="Telefone" placeholder="Digite o telefone do cliente" type='tel' required clearInput={true} id='cellphone' labelPlacement='stacked'></IonInput>
            </IonItem>
            <p id='clientMessage'></p>
          </div>
          <h1>Pedidos</h1>
          <IonItem>
            <IonButton size='small' onClick={createOrder} slot='end'>Novo Pedido</IonButton>
          </IonItem>
          <div id='ordersList'>
            <IonList id='listOrders'>
              <IonItem>
                <p>A lista está vazia</p>
              </IonItem>
            </IonList>
          </div>
          <p id='orderMessage'></p>
          <br/>
          <div className='buttons'>
            <IonButton size='default' onClick={createClient}>Cadastrar</IonButton>
            <IonButton size='default' onClick={updateClient}>Atualizar</IonButton>
            <IonButton size='default' onClick={deleteClient}>Excluir</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Clients;
