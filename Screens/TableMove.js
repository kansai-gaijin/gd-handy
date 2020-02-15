import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Button, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import Meteor, { withTracker } from 'react-native-meteor';

class TableMove extends React.Component{
    
    static navigationOptions = ({ navigation }) => {
        
    };

    state = {
        dataSource : this.props.tables,
        selCount : 0,
        selTableFirst : "",
        selTableSecond : "",
    }

    keyExtractor = (item, index) => index.toString();

    selectItem = item => {
        
        if(this.state.selCount < 2){
            item.isSelect = !item.isSelect;
            item.selectedClass = item.isSelect　?　styles.selected　: styles.list;
            const index = this.state.dataSource.findIndex(
                fItem => item._id === fItem._id
            );
            this.state.dataSource[index] = item;
            
            this.state.selCount++;
            
            if(this.state.selCount == 1){
                this.state.selTableFirst = item
            }else{
                this.state.selTableSecond = item
            }
            
            this.setState({
                dataSource: this.state.dataSource,
                selCount : this.state.selCount,
                selTableFirst : this.state.selTableFirst,
                selTableSecond : this.state.selTableSecond
            });
        }else{
            let newDataSet = this.state.dataSource;
            for(let i = 0; i < this.state.dataSource; i++){
                newDataSet[i].isSelect = false;
            }
            this.setState({
                dataSource: newDataSet,
                selCount : this.state.selCount,
                selTableFirst : this.state.selTableFirst,
                selTableSecond : this.state.selTableSecond
            });
        }
        
        
        
        
        /*if(this.state.selCount < 2){
            item.isSelect = !item.isSelect;

            item.selectedClass = item.isSelect　?　styles.selected　: styles.list;

            const index = this.state.dataSource.findIndex(
                fItem => item._id === fItem._id
            );

            this.state.dataSource[index] = item;
            this.state.selCount++;
        }else{
            for(let i = 0; i < this.state.dataSource.length; i++){
                let newItem = this.state.dataSource[i];
                newItem.isSelect == null;
                this.state.dataSource[i] = newItem;
            }
            
            item.isSelect = true;
            item.selectedClass = item.isSelect　?　styles.selected　: styles.list;
            const index = this.state.dataSource.findIndex(
                fItem => item._id === fItem._id
            );
            this.state.dataSource[index] = item;
            this.state.selCount = 1;
        }
        
        this.setState({
            dataSource: this.state.dataSource,
            selCount : this.state.selCount
        });*/
    };

    renderItem = ({ item }) => (
      <TouchableHighlight
          onPress={ () => this.selectItem(item) }
      >
          <ListItem
            title={item.name}
            containerStyle={[styles.list, item.selectedClass]}
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
      </TouchableHighlight>
    )

    render(){
        return (
            <View style={styles.container}>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.dataSource}
                    renderItem={this.renderItem}
                    extraData={this.state}
                />
            </View>
        ); 
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    list: {
  zIndex: -1
},
    selected: {backgroundColor: "#FFE57C"},
    listItem : {
        zIndex:1,
        backgroundColor:'transparent'
    }
});

const elWithTracker = withTracker(params => { 
  return {
      tables : Meteor.collection('tables').find({}),
  }
})(TableMove);

elWithTracker.navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {};
    return {title: "テーブル移動"};
}

export default elWithTracker;