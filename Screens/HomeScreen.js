import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const links = [
    {
        title: 'テーブル\nオープン',
        link: 'OpenTable'
    },
    {
        title: '追加オーダー',
        link: 'NewOrder'
    },
    {
        title: 'オーダー\n変更',
        link: 'OrderChangeTable'
    },
    {
        title: 'オーダー\nキャンセル',
        link: 'OrderCancelTable'
    },
    {
        title: 'テーブル移動',
        link: 'TableMove'
    },
    {
        title: 'テーブル合算',
        link: 'TableMerge'
    }
];

export default class HomeScreen extends React.Component {
    
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {title: "メイン・メニュー"};
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonView}>
                    {
                        links.map((item, i) => (
                            <View style={styles.homeButtonWrapper} key={i}>
                                <TouchableOpacity style={styles.homeButton} onPress={() => this.props.navigation.navigate(item.link)}>
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
    }
});