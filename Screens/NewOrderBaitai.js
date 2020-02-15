import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import Meteor, { withTracker } from 'react-native-meteor';


class NewOrderBaitai extends React.Component{

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => (
      <ListItem
        title={item.name}
        onPress={ () => { 
            let selData = this.props.navigation.getParam('selData');
            let renderText = 'テーブル：' + selData.table.name + '\n';
            renderText += '人数：' + selData.ninzu + '\n';
            renderText += '媒体：' + item.name + '\n';
            renderText += '料理：';
            renderText += (selData.tabeho == 0) ? '食べ放題' : '単品';
            renderText += '\n';
            renderText += 'ドリンク：';
            renderText += (selData.nomiho == 0) ? '飲み放題' : '単品';
            Alert.alert(
                'テーブルを開けますか？',
                renderText,
                [
                    { text : 'はい', onPress : () => {
                        
                        let selData = this.props.navigation.getParam('selData');
                        let postData = {
                            tableId : selData.table._id,
                            food : selData.tabeho,
                            drink : selData.nomiho,
                            ninzu : selData.ninzu,
                            baitai : item._id
                        }
                        Meteor.call('openTable', postData, (err, res) => {
                            console.log('openTable', err, res);
                            this.props.navigation.popToTop()
                        });
                        
                    }},
                    { text : '戻る', onPress : () => console.log('cancel'), style: 'cancel'}
                ],
                {cancelable: false}
            ); } } 
        leftAvatar={
                {
                    rounded: true,
                    icon: {name: 'person',type : "material"}, 
                }
            }
      />
    );

    render(){
        return (
            <View style={styles.container}>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.props.baitais}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});


const elWithTracker = withTracker(params => { 
  return {
      baitais : Meteor.collection('baitais').find({}),
  }
})(NewOrderBaitai);

elWithTracker.navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};
    return {title:navigation.getParam('selData').table.name + "）新規　媒体"};
}

export default elWithTracker;
