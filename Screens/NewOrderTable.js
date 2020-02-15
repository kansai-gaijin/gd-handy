import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import Meteor, { withTracker } from 'react-native-meteor';

class NewOrderTable extends React.Component{

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => (
      <ListItem
        title={item.name}
        onPress={() => {if(item.tStatus == 0){this.props.navigation.push('OpenTableNinzu',{selData:{table:item}})}}}
        leftAvatar={
                {
                    rounded: true,
                    icon: {name: 'airline-seat-recline-normal',type : "material"}, 
                    overlayContainerStyle:{
                        backgroundColor: (item.tStatus == 0) ? "green" : "red"
                    }
                }
            }
      />
    )

    render(){
        return (
            <View style={styles.container}>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.props.tables}
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
      tables : Meteor.collection('tables').find({tStatus : 0}),
  }
})(NewOrderTable);

elWithTracker.navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};
    return {title: "新規　テーブル選択"};
}

export default elWithTracker;