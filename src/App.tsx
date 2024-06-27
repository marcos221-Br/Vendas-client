import { Redirect, Route } from 'react-router-dom';
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

import User from './images/user-line.svg';
import Client from './images/group-line.svg';
import Order from './images/list-unordered.svg';

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

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/clients">
            <Clients />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route exact path="/">
            <Redirect to="/users" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="users" href="/users">
            <IonIcon aria-hidden="true" icon={User} />
            <IonLabel>Usuários</IonLabel>
          </IonTabButton>
          <IonTabButton tab="clients" href="/clients">
            <IonIcon aria-hidden="true" icon={Client} />
            <IonLabel>Clientes</IonLabel>
          </IonTabButton>
          <IonTabButton tab="orders" href="/orders">
            <IonIcon aria-hidden="true" icon={Order} />
            <IonLabel>Pedidos</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
