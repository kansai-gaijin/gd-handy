import React from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from "react-navigation";
import Meteor, { withTracker, MeteorListView } from 'react-native-meteor';

Meteor.connect('ws://192.168.24.6:3000/websocket'); //do this only once

//SCREENS

//HOME
import HomeScreen from './Screens/HomeScreen';

//OPEN TABLE
import NewOrderTable from './Screens/NewOrderTable';
import NewOrderNinzu from './Screens/NewOrderNinzu';
import NewOrderBaitai from './Screens/NewOrderBaitai';
import NewOrderTabeho from './Screens/NewOrderTabeho';
import NewOrderNomiho from './Screens/NewOrderNomiho';

//ORDER
import OrderTable from './Screens/OrderTable';
import OrderItems from './Screens/OrderItems';
import OrderConfirm from './Screens/OrderConfirm';

//CANCEL ORDER
import OrderCancelTable from './Screens/OrderCancelTable';
import OrderCancelItems from './Screens/OrderCancelItems';

//EDIT ORDER
import OrderChangeTable from './Screens/OrderChangeTable';
import OrderChangeItems from './Screens/OrderChangeItems';

//TABLE KANRI
import TableMove from './Screens/TableMove';
import TableMerge from './Screens/TableMerge';

const AppNavigator = createStackNavigator(
    {
        Home : HomeScreen,
        OpenTable : NewOrderTable,
        NewOrder: OrderTable,
        ProductSelect : OrderItems,
        OrderConfirm : OrderConfirm,
        OpenTableNinzu: NewOrderNinzu,
        OpenTableBaitai: NewOrderBaitai,
        OpenTableTabeho: NewOrderTabeho,
        OpenTableNomiho: NewOrderNomiho,
        OrderCancelTable : OrderCancelTable,
        OrderCancelItems : OrderCancelItems,
        OrderChangeTable : OrderChangeTable,
        OrderChangeItems : OrderChangeItems,
        TableMove : TableMove,
        TableMerge : TableMerge
    },
    {
        defaultNavigationOptions: {
            headerMode : 'none',
            headerStyle: {
              backgroundColor: '#B73A3A',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
      },
    }
);




const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}