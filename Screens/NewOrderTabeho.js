import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const links = [
    {
        title: '食べ放題',
        status: 0,
        link: 'OpenTableNomiho'
    },
    {
        title: '単品料理',
        status:1,
        link: 'OpenTableNomiho'
    },
];

export default class NewOrderTabeho extends React.Component {
    
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {title: navigation.getParam('selData').table.name + "）新規　料理"};
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.question}>料理はどうしますか？</Text>
                <View style={styles.buttonView}>
                    {
                        links.map((item, i) => (
                            <View style={styles.homeButtonWrapper} key={i}>
                                <TouchableOpacity style={styles.homeButton} onPress={() =>{
                                    let selData = this.props.navigation.getParam('selData');
                                    selData.tabeho = item.status;
                                    this.props.navigation.push(item.link,{selData});
                                }}>
                                    <Text style={styles.homeButtonText}>{item.title}</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    homeButton: {
        height: "100%",
        width: "100%",
        backgroundColor: "#F9F5DB",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    buttonView: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 5
    },
    homeButtonWrapper: {
        width: "50%",
        height: "33.33333333333%",
        padding: 10
    },
    homeButtonText: {
        textAlign: "center",
        color: "#707070",
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 24
    },
    question:{
        textAlign: 'center',
        padding: 20,
        fontSize:18,
        fontWeight:"bold"
    },
});