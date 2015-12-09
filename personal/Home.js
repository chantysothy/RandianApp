/**
 * Created by lily on 15/11/29.
 */
'use strict';

var React = require('react-native');
var {
    ActivityIndicatorIOS,
    StyleSheet,
    Text,
    View,
    } = React;

const CURRENT_TYPE = "gym";
var API_URL = 'http://service.staging.randian.net/sports';

var resultsCache = {
    sportCache: {}
};

var LOADING = {};

var Home = React.createClass({

    render: function() {
        return (
            <Text>
                personal!
            </Text>
        );
    }
});


var styles = StyleSheet.create({

});

module.exports = Home;
