import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Input, Avatar } from 'react-native-elements';

export default class NewOrderNinzu extends React.Component{
    
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {title: navigation.getParam('selData').table.name + "）新規　人数"};
    };

    render(){
        return (
            <View style={styles.container}>
                <View>
                    <Text>テーブル: {this.props.navigation.getParam('selData').table.name}</Text>
                    <Input
                        placeholder='人数を入力して下さい。'
                        keyboardType='numeric'
                        shake={true}
                        rightIcon={<Avatar rounded title="名"/>}
                        onSubmitEditing = {
                            (event) => {
                                let selData = this.props.navigation.getParam('selData');
                                selData.ninzu = event.nativeEvent.text;
                                this.props.navigation.push('OpenTableTabeho',{selData});
                            }
                        }
                    />
                </View>
            </View>
        ); 
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding:20
    }
});
