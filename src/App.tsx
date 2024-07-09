import { Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Users from './pages/Users';
import Clients from './pages/Clients';
import Orders from './pages/Orders';
import Login from './pages/Login';

import User from './Images/user-settings-line.svg';
import Client from './Images/group-line.svg';
import Order from './Images/list-unordered.svg';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import { setHeader } from './components/Json';

function setup(){
  setHeader('Content-Type','application/json')
  setHeader('Accept','*/*')
}

setupIonicReact();
setup()

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/user">
            <Users />
          </Route>
          <Route exact path="/client">
            <Clients />
          </Route>
          <Route path="/order">
            <Orders />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="users" href="/user">
            <IonIcon aria-hidden="true" icon={User} />
            <IonLabel>Usuários</IonLabel>
          </IonTabButton>
          <IonTabButton tab="clients" href="/client">
            <IonIcon aria-hidden="true" icon={Client} />
            <IonLabel>Clientes</IonLabel>
          </IonTabButton>
          <IonTabButton tab="orders" href="/order">
            <IonIcon aria-hidden="true" icon={Order} />
            <IonLabel>Pedidos</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
