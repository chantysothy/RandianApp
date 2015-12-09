/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var React = require('react-native');
var {
    AppRegistry,
    NavigatorIOS,
    StyleSheet,
    TabBarIOS,
    StatusBarIOS
} = React;



var SportListTab = require('./sport/SportList'),
    CoachListTab = require('./coach/CoachList'),
    OrderListTab = require('./order/OrderList'),
    PersonalTab  = require('./personal/Home')

var RandianApp = React.createClass({
    getInitialState() {
        return {
            selectedTab: 'sport'
        }
    },
    changeTab(tabName) {
        StatusBarIOS.setStyle(tabName === 'sport' ? 1 : 0);
        this.setState({
            selectedTab: tabName
        });
    },
    render: function() {
        return (
            <TabBarIOS>
                <TabBarIOS.Item
                    title="Sport"
                    icon={ require('image!icon_sport') }
                    onPress={ () => this.changeTab('sport') }
                    selected={ this.state.selectedTab === 'sport' }>
                    <SportListTab />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Coach"
                    //icon={ require('image!icon_coach') }
                    onPress={ () => this.changeTab('coach') }
                    selected={ this.state.selectedTab === 'coach' }>
                    <CoachListTab />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Order"
                    //icon={ require('image!icon_order') }
                    onPress={ () => this.changeTab('order') }
                    selected={ this.state.selectedTab === 'order' }>
                    <OrderListTab />
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Personal"
                    //icon={ require('image!icon_personal') }
                    onPress={ () => this.changeTab('personal') }
                    selected={ this.state.selectedTab === 'personal' }>
                    <PersonalTab />
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

AppRegistry.registerComponent('RandianApp', () => RandianApp);
