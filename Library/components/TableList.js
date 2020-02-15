import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

const tables = [
    {
        name: "A1",
        status: 1,
    },
    {
        name: "A2",
        status: 0,
    },
    {
        name: "A3",
        status: 0,
    },
    {
        name: "B1",
        status: 0,
    },
    {
        name: "B2",
        status: 0,
    },
    {
        name: "B3",
        status: 0,
    },
    {
        name: "B4",
        status: 0,
    },
    {
        name: "C1",
        status: 0,
    },
    {
        name: "C2",
        status: 0,
    },
    {
        name: "C3",
        status: 1,
    }
]

export default class TableList extends React.Component{
    
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {title: "新規　テーブル選択"};
    };

    const handleTableSel = () => {
        this.props.pushLoc()
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => (
      <ListItem
        title={item.name}
        onPress={() => {if(item.status == 0){this.props.navigation.push('OpenTableNinzu',{table:item.name})}}}
        leftAvatar={
                {
                    rounded: true,
                    icon: {name: 'airline-seat-recline-normal',type : "material"}, 
                    overlayContainerStyle:{
                        backgroundColor: (item.status == 0) ? "green" : "red"
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
                    data={tables}
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
