import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList } from 'react-native';
import { ListItem, Icon, Avatar } from 'react-native-elements';
import Dialog from "react-native-dialog";
import { ToastAndroid } from 'react-native';
import Meteor, { withTracker } from 'react-native-meteor';



export default class OrderConfirm extends React.Component{
    state = {
        orders : this.props.navigation.getParam('orders'),
        table : this.props.navigation.getParam('table'),
        dialogVisible : false,
        selIndex : 0,
        ryo : 0,
    }

    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {title: "追加オーダー"};
    };

    keyExtractor = (item, index) => index.toString();

    handlePress = (index) => {
        this.setState({selIndex : index, dialogVisible: true});
    }

    handleRyo = (ryo) => {
        this.setState({ryo : ryo});
    }
    
handleCancel = () => {
    this.setState({ dialogVisible: false });
};

handleSubmit = () => {
    let oldOrders = this.state.orders;

    oldOrders[this.state.selIndex].qty = this.state.ryo;
    this.setState({ orders: oldOrders, dialogVisible: false });
    ToastAndroid.show('数を変更いたしました。', ToastAndroid.SHORT);
}

submitOrder = () => {
    
    orderData = [];
    
    for(let i = 0; i < this.state.orders.length; i++){
        orderData.push({
            product : this.state.orders[i].product,
            qty : this.state.orders[i].qty
        })
    }
    
    Meteor.call('addOrder', this.state.table.tBill, orderData, this.state.table.name,(err, res) => {
        console.log('addOrder', err, res);
        this.props.navigation.popToTop()
    });
}

    renderItem = (item, index) => (
      <ListItem
        style={styles.li}
        title={item.product.name}
        onPress={() => {this.handlePress(index)}}
        rightIcon={<Avatar title={item.qty.toString()}/>}
      />
    );

    render(){
        return (
            <View style={styles.container}>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.orders}
                    renderItem={({item, index}) => this.renderItem(item, index)}
                    extraData={this.state}
                />
                <View style={styles.orderButton}>
                    <Icon name='check' type='material' color='#37DB73'
                        onPress={this.submitOrder}
                        reverse/>
                </View>
                <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>量</Dialog.Title>
                    <Dialog.Description>
                        何個を注文しますか？
                    </Dialog.Description>
                    <Dialog.Input style={styles.li} keyboardType='numeric' label="量を入力してください" onChangeText={(ryo) => this.handleRyo(ryo)}/>
                    <Dialog.Button label="キャンセル" onPress={this.handleCancel} />
                    <Dialog.Button label="登録" onPress={this.handleSubmit} />
                </Dialog.Container>
            </View>
        ); 
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    li : {
        borderBottomColor: '#CCC',
        borderBottomWidth: 1,
    },
    orderButton :{
        position: 'absolute',
        right: 20,
        bottom :20,
        height:50,
        width:50,
    }
});
