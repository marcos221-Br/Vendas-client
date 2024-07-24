import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import './Clients.css';
import avatar from '../Images/user-line_white.svg';
import smartphone from '../Images/smartphone-line.svg';
import pencil from '../Images/pencil-line.svg';
import trashCan from '../Images/delete-bin-5-line.svg';
import { ClientController } from '../Controllers/ClientController';
import { Client } from '../Models/Client';
import { OrderController } from '../Controllers/OrderController';
import { Order } from '../Models/Order';
import { useMaskito } from '@maskito/react';
import { MaskitoOptions, maskitoTransform } from '@maskito/core';
import { ItemController } from '../Controllers/ItemController';

var clientController = new ClientController();
var client = new Client();
var orderController = new OrderController();
var order = new Order();
var itemController = new ItemController();

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
  let search = (document.getElementById('searchBar') as HTMLInputElement).value;
  if(search != ''){
    clearInputs()
    clientController.findClient(search).then(function(response){
      if(response.id !== undefined){
        (document.getElementById('searchBar') as HTMLInputElement).value = '';
        (document.getElementById('idClient') as HTMLInputElement).value = response.id;
        (document.getElementById('name') as HTMLInputElement).value = response.name;
        (document.getElementById('cellphone') as HTMLInputElement).value = maskitoTransform(response.cellphone,{mask: ['(',/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/],});
        findOrders(response.id);
      }else{
        (document.getElementById('clientMessage') as HTMLTextAreaElement).innerHTML = 'Cliente não encontrado!';
      }
    })
  }
}

function createClient(){
  client.setName((document.getElementById('name') as HTMLInputElement).value);
  client.setCellphone((document.getElementById('cellphone') as HTMLInputElement).value.replace('(','').replace(')','').replace('-','').replace(' ',''));
  console.log(client);
  clientController.createClient(client).then(function(response){
    (document.getElementById('idClient') as HTMLInputElement).value = response.id;
    (document.getElementById('clientMessage') as HTMLTextAreaElement).innerHTML = "Cliente criado com sucesso!"
  })
}

function updateClient() {
  client.setId(parseInt((document.getElementById('idClient') as HTMLInputElement).value));
  client.setName((document.getElementById('name') as HTMLInputElement).value);
  client.setCellphone((document.getElementById('cellphone') as HTMLInputElement).value.replace('(','').replace(')','').replace('-','').replace(' ',''));
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
        let id = document.createElement('ion-input');
        id.setAttribute('label','Número');
        id.setAttribute('label-placement','stacked');
        id.readonly = true;
        id.setAttribute('class','idOrder');
        let date = document.createElement('ion-input');
        date.setAttribute('label','Data de criação');
        date.setAttribute('label-placement','stacked');
        date.readonly = true;
        date.setAttribute('class','dateOrder');
        date.setAttribute('id','orderDate' + orders[i].id);
        let totalValue = document.createElement('ion-input');
        totalValue.setAttribute('label','Valor total');
        totalValue.setAttribute('label-placement','stacked');
        totalValue.setAttribute('class','valueOrder');
        totalValue.readonly = true;
        let value = 0;
        itemController.findItens(orders[i].id).then(function(itens){
          if(itens.length > 0){
            for(let i = 0; i < itens.length; i++){
              value += itens[i].value;
            }
            totalValue.value = ('R$ ' + value.toFixed(2)).replace('.',',');
          }
        })
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
        id.value = orders[i].id;
        date.value = orders[i].date;
        let progress = document.createElement('ion-radio-group');
        let ongoing = document.createElement('ion-radio');
        ongoing.setAttribute('slot','start');
        ongoing.setAttribute('class','radio');
        ongoing.setAttribute('value','ongoing');
        ongoing.setAttribute('id',orders[i].id);
        ongoing.addEventListener('click',updateOrder);
        ongoing.innerHTML = 'Em andamento';
        let finished = document.createElement('ion-radio');
        finished.setAttribute('slot','start');
        finished.setAttribute('class','radio');
        finished.setAttribute('value','finished');
        finished.setAttribute('id',orders[i].id);
        finished.addEventListener('click',updateOrder);
        finished.innerHTML = 'Finalizado';
        let delivered = document.createElement('ion-radio');
        delivered.setAttribute('slot','start');
        delivered.setAttribute('class','radio');
        delivered.setAttribute('value','delivered');
        delivered.setAttribute('id',orders[i].id);
        delivered.addEventListener('click',updateOrder);
        delivered.innerHTML = 'Entregue';
        progress.setAttribute('value',orders[i].progress);
        progress.appendChild(ongoing);
        progress.appendChild(finished);
        progress.appendChild(delivered);
        let item = document.createElement('ion-item');
        item.setAttribute('lines','full')
        item.appendChild(id);
        item.appendChild(date);
        item.appendChild(progress);
        item.appendChild(totalValue);
        item.appendChild(editButton);
        item.appendChild(deleteButton);
        if(i == 0){
          list.replaceChildren(item);
        }else{
          list.insertBefore(item,list.firstChild)
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
    order.setProgress('ongoing');
    orderController.createOrder(order).then(function(response){
      (document.getElementById('orderMessage') as HTMLTextAreaElement).innerHTML = "Pedido criado com sucesso!";
      sessionStorage.setItem('orderId',response.id);
      window.location.href = '/order';
    })
  }else{
    (document.getElementById('orderMessage') as HTMLTextAreaElement).innerHTML = "Necessário fornecer um cliente!";
  }
}

function updateOrder(value:any){
  order.setId(value.target.id)
  order.setProgress(value.target.value);
  order.setIdClient(parseInt((document.getElementById('idClient') as HTMLInputElement).value));
  order.setDate((document.getElementById('orderDate' + value.target.id) as HTMLInputElement).value);
  orderController.updateOrder(order).then(function(){
    findOrders(parseInt((document.getElementById('idClient') as HTMLInputElement).value));
    (document.getElementById('orderMessage') as HTMLInputElement).innerHTML = "Pedido atualizado com sucesso!";
  })
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
  let phoneMaskOptions: MaskitoOptions = {
    mask: ['(',/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/],
  };
  let phoneMask = useMaskito({options: phoneMaskOptions});

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
              <IonSearchbar placeholder='Digite nome ou número de telefone' onIonChange={findClient} id='searchBar'></IonSearchbar>
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
              <IonInput label="Nome" placeholder="Digite o nome do cliente" required id='name' labelPlacement='stacked'></IonInput>
            </IonItem>
            <IonItem>
              <IonAvatar aria-hidden="true" slot="start">
                <img alt="Smartphone Image" src={smartphone} />
              </IonAvatar>
              <IonInput label="Telefone" placeholder="Digite o telefone do cliente" type='tel' required id='cellphone' labelPlacement='stacked' ref={async (phoneInput) => {
                if(phoneInput){
                  let input = await phoneInput.getInputElement();
                  phoneMask(input);
                }
              }}></IonInput>
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
