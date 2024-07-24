import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Orders.css';
import survey from '../Images/survey-line.svg';
import add from '../Images/add-line.svg';
import pencil from '../Images/pencil-line.svg';
import trashCan from '../Images/delete-bin-5-line.svg';
import { Item } from '../Models/Item';
import { ItemController } from '../Controllers/ItemController';

var itemController = new ItemController();
var item = new Item();

function verifyLogin(){
  if(sessionStorage.getItem('username') == null){
    window.location.href = '/'
  }
}

function logOut(){
  sessionStorage.clear()
  window.location.href = '/'
}

function editItem(value:any){
  item.setId(parseInt(value.target.id));
  item.setQuantity(parseInt(value.target.parentElement.children[0].value));
  item.setDescription(value.target.parentElement.children[1].value);
  item.setSize(value.target.parentElement.children[2].value);
  item.setValue(parseFloat((value.target.parentElement.children[3].value).replace(',','.').replace('R','').replace('$','').replace(' ','')))
  item.setIdOrder(parseInt((document.getElementById('idOrder') as HTMLTextAreaElement).value));
  itemController.updateItem(item).then(function(){
    findItens();
    (document.getElementById('message') as HTMLTextAreaElement).innerHTML = 'Item editado com sucesso!';
  })
}

function deleteItem(value:any){
  item.setId(value.target.id);
  itemController.deleteItem(item).then(function(){
    findItens();
    (document.getElementById('message') as HTMLTextAreaElement).innerHTML = 'Item excluido com sucesso!';
  })
}

function addItem(){
  item.setQuantity(parseInt((document.getElementById('quantity') as HTMLTextAreaElement).value));
  item.setDescription((document.getElementById('description') as HTMLTextAreaElement).value);
  item.setValue((parseInt(item.getQuantity()+'')*parseFloat(((document.getElementById('value') as HTMLTextAreaElement).value).replace(',','.'))));
  item.setIdOrder(parseInt((document.getElementById('idOrder') as HTMLTextAreaElement).value));
  item.setQuantity(parseInt((document.getElementById('quantity') as HTMLTextAreaElement).value));
  item.setSize((document.getElementById('size') as HTMLInputElement).value);
  (document.getElementById('description') as HTMLTextAreaElement).value = '';
  (document.getElementById('value') as HTMLTextAreaElement).value = '';
  (document.getElementById('quantity') as HTMLTextAreaElement).value = '';
  (document.getElementById('size') as HTMLInputElement).value = '';
  itemController.createItem(item).then(function(){
    findItens();
    (document.getElementById('message') as HTMLTextAreaElement).innerHTML = 'Item adicionado com sucesso!';
  })
}

function findItens(){
  if(sessionStorage.getItem('orderId') != null){
    (document.getElementById('idOrder') as HTMLTextAreaElement).value = sessionStorage.getItem('orderId')+'';
    let list = (document.getElementById('listItens') as HTMLIonListElement);
    itemController.findItens(parseInt(sessionStorage.getItem('orderId')+'')).then(function(itens){
      let total = 0;
      if(itens.length > 0){
        for(let i = 0; i < itens.length; i++){
          let quantity = document.createElement('ion-input');
          let description = document.createElement('ion-input');
          let size = document.createElement('ion-input');
          let value = document.createElement('ion-input');
          let editButton = document.createElement('ion-button');
          let editIcon = document.createElement('ion-icon');
          let deleteButton = document.createElement('ion-button');
          let deleteIcon = document.createElement('ion-icon');
          quantity.value = itens[i].quantity;
          description.value = itens[i].description;
          size.value = itens[i].size;
          value.value = 'R$ ' + (itens[i].value).toFixed(2).replace('.',',');
          total += itens[i].value;
          quantity.setAttribute('class','itemQuantity');
          quantity.setAttribute('label','Quantidade');
          quantity.setAttribute('label-placement','stacked');
          quantity.readonly = true;
          description.setAttribute('class','itemDescription');
          description.setAttribute('label','Descrição');
          description.setAttribute('label-placement','stacked');
          size.setAttribute('class','itemSize');
          size.setAttribute('label','Tamanho');
          size.setAttribute('label-placement','stacked');
          value.setAttribute('class','itemValue');
          value.setAttribute('label','Valor');
          value.setAttribute('label-placement','stacked')
          value.readonly = true;
          editIcon.setAttribute('icon',pencil);
          editButton.setAttribute('color','warning');
          editButton.appendChild(editIcon);
          editButton.setAttribute('id',itens[i].id);
          editButton.addEventListener('click',editItem);
          deleteIcon.setAttribute('icon',trashCan);
          deleteButton.setAttribute('color','danger');
          deleteButton.appendChild(deleteIcon);
          deleteButton.setAttribute('id',itens[i].id);
          deleteButton.addEventListener('click',deleteItem);
          let itemList = document.createElement('ion-item');
          itemList.setAttribute('lines','full')
          itemList.appendChild(quantity);
          itemList.appendChild(description);
          itemList.appendChild(size);
          itemList.appendChild(value);
          itemList.appendChild(editButton);
          itemList.appendChild(deleteButton);
          if(i == 0){
            list.replaceChildren(itemList);
          }else{
            list.appendChild(itemList);
          }
        }
      }else{
        let p = document.createElement('p');
        p.innerHTML = 'O pedido não possui itens!';
        let itemList = document.createElement('ion-item');
        itemList.appendChild(p);
        list.replaceChildren(itemList);
      }
      let itemList = document.createElement('ion-item');
      let totalValue = document.createElement('ion-label');
      totalValue.innerHTML = 'Valor Total: R$ ' + total.toFixed(2).replace('.',',');
      totalValue.setAttribute('slot','end')
      itemList.appendChild(totalValue);
      list.appendChild(itemList);
    })
  }
}

const Orders: React.FC = () => {
  verifyLogin()
  return (
    <IonPage onLoad={findItens}>
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
              <IonInput label='Quantidade' labelPlacement='stacked' className='itemQuantity' id='quantity' type='number'></IonInput>
              <IonInput label='Descrição' labelPlacement='stacked' id='description'></IonInput>
              <IonInput label='Tamanho' labelPlacement='stacked' id='size' className='itemSize'></IonInput>
              <IonInput label='Valor Unit.' labelPlacement='stacked' className='itemValue' id='value'></IonInput>
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
      </IonContent>
    </IonPage>
  );
};

export default Orders;
