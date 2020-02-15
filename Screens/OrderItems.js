import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList, ViewPagerAndroid } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import Dialog from "react-native-dialog";
import { ToastAndroid } from 'react-native';

import Meteor, { withTracker } from 'react-native-meteor';

class OrderItems extends React.Component{
    
    state = {
        page: 0,
        animationsAreEnabled: true,
        scrollEnabled: true,
        progress: {
          position: 0,
          offset: 0,
        },
        orders : [],
        dialogVisible: false,
        selProd : "",
        ryo : 0
    };

    onPageSelected = (e) => {
        this.setState({page: e.nativeEvent.position});
    };

    onPageScroll = (e) => {
        this.setState({progress: e.nativeEvent});
    };

    onPageScrollStateChanged = (state : ViewPagerScrollState) => {
        this.setState({scrollState: state});
    };

    move = (delta) => {
        var page = this.state.page + delta;
        this.go(page);
    };

    go = (page) => {
        if (this.state.animationsAreEnabled) {
          this.viewPager.setPage(page);
        } else {
          this.viewPager.setPageWithoutAnimation(page);
        }

        this.setState({page});
    };

    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };

    handleSubmit = () => {
        console.log(this.state.selProd);
        this.addOrder({
            product : this.state.selProd,
            qty : this.state.ryo
        });
        this.setState({ dialogVisible: false });
        ToastAndroid.show('注文追加しました。', ToastAndroid.SHORT);
    }
    
    handleRyo = (ryo) => {
        this.setState({ryo : ryo});
    }

    addOrder = (order) =>{
        let oldOrders = this.state.orders;
        oldOrders.push({ product: order.product, qty : order.qty });
        this.setState({selProd: "", ryo:0, orders : oldOrders })
    }

    keyExtractor = (item, index) => index.toString();

    handleProdPress = (item) => {
        this.setState({selProd: item, dialogVisible: true })
    }
    
    renderItem = ({ item }) => (
      <ListItem
        title={item.name}
        onPress={()=>this.handleProdPress(item)}
        style={styles.li}
        leftAvatar={
                {
                    rounded: true,
                    source:{uri:item.image}
                }
            }
      />
    )

    render(){
        var pages = [];
        
        for (var i = 0; i < this.props.categories.length; i++) {
            let prods = [];
            let categoryId = this.props.categories[i]._id;
            
            for (var f = 0; f < this.props.products.length; f++) {
                if(this.props.products[f].categories.includes(categoryId)){
                    prods.push(
                        this.props.products[f]
                    ); 
                }
            }
            
            pages.push(
                <View style={styles.pageStyle} key={i}>
                    <View style={styles.catTtl}><Text style={styles.catName}>{this.props.categories[i].name}</Text></View>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={prods}
                        renderItem={this.renderItem}
                    />
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
        
        return (
            <>
                <ViewPagerAndroid
                  style={styles.viewPager}
                  initialPage={0}
                  scrollEnabled={this.state.scrollEnabled}
                  onPageScroll={this.onPageScroll}
                  onPageSelected={this.onPageSelected}
                  onPageScrollStateChanged={this.onPageScrollStateChanged}
                  pageMargin={10}
                  ref={viewPager => { this.viewPager = viewPager; }}>
                    {pages}
                </ViewPagerAndroid>
                <View style={styles.orderButton}>
                    <Icon name='create' type='material' color='#b73a3a'
                        onPress={()=>{
                            this.props.navigation.push('OrderConfirm',{orders:this.state.orders, table: this.props.navigation.getParam('table')});
                        }}
                        reverse/>
                </View>
            </>
        ); 
    }
}

const styles = StyleSheet.create({
    viewPager: {
    flex: 1
  },
    pageStyle: {
    padding: 0,
  },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    catTtl:{
        backgroundColor: '#dba9a9',
        padding: 10
    },
    catName : {
        color: 'black',
        textAlign: 'center',
        fontSize : 18
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

const elWithTracker = withTracker(params => { 
  return {
      categories : Meteor.collection('categories').find({}),
      products : Meteor.collection('products').find({}),
  }
})(OrderItems);

elWithTracker.navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};
    return {title: "追加オーダー"};
}

export default elWithTracker;
