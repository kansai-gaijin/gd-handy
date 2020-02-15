import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import Meteor, { withTracker } from 'react-native-meteor';

class TableMerge extends React.Component{
    
    static navigationOptions = ({ navigation }) => {
        
    };

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => (
      <ListItem
        title={item.name}
        onPress={ () => {  this.props.navigation.push( 'ProductSelect' , {table:item} ) } }
        leftAvatar={
                {
                    rounded: true,
                    icon: {name: 'airline-seat-recline-normal',type : "material"}, 
                    overlayContainerStyle:{
                        backgroundColor: (item.status == 1) ? "red" : "green"
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
      tables : Meteor.collection('tables').find({}),
  }
})(TableMerge);

elWithTracker.navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};
    return {title: "テーブル合算"};
}

export default elWithTracker;