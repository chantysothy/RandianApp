/**
 * Created by lily on 15/11/29.
 */
'use strict';

var React = require('react-native');
var {
    ActivityIndicatorIOS,
    ListView,
    Platform,
    ProgressBarAndroid,
    StyleSheet,
    Text,
    View,
    } = React;

const CURRENT_TYPE = "gym";
var Consts = require('./../RConstants');
var invariant = require('invariant');
var SportCell = require('./SportCell');
var SportDetail = require('./SportDetail');
var TimerMixin = require('react-timer-mixin');
var dismissKeyboard = require('dismissKeyboard');
var API_URL = 'http://service.staging.randian.net/sports';

var resultsCache = {
    sportCache: {}
};

var LOADING = {};

var SportListComp = React.createClass({
    mixins: [TimerMixin],

    getInitialState: function() {
        return {
            hasMore : true,
            isLoading : false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        };
    },

    componentDidMount: function() {
        this.loadSportData();
    },

    _urlForQueryAndPage: function(): string {
        return (
            API_URL + '?cursor=' + (resultsCache.sportCache[CURRENT_TYPE] ? resultsCache.sportCache[CURRENT_TYPE].length : 0)
                    + '&count='+Consts.PAGE_SIZE
                    + '&category_id=' + (CURRENT_TYPE === 'gym'? Consts.GYM_TYPE:Consts.YOGA_TYPE)
        );
    },

    onEndReached: function() {
        if (!this.state.hasMore) {
            return;
        }

        this.loadSportData();
    },

    loadSportData:function(){
        fetch(this._urlForQueryAndPage())
            .then((response) => response.json())
            .catch((error) => {
                console.error(error);
                this.setState({
                    isLoading: false,
                });
            })
            .then((responseData) => {
                resultsCache.sportCache[CURRENT_TYPE] ? resultsCache.sportCache[CURRENT_TYPE].concat(responseData)
                                                      : (resultsCache.sportCache[CURRENT_TYPE] = responseData);
                this.setState({
                    hasMore: responseData.length < Consts.PAGE_SIZE,
                    dataSource: this.getDataSource(resultsCache.sportCache[CURRENT_TYPE])
                });
            })
            .done();
    },

    getDataSource: function(sports: Array<any>): ListView.DataSource {
        return this.state.dataSource.cloneWithRows(sports);
    },

    selectSport: function(sport: Object) {
        if (Platform.OS === 'ios') {
            this.props.navigator.push({
                title: sport.name,
                component: SportDetail,
                passProps: {sport},
            });
        } else {
            dismissKeyboard();
            this.props.navigator.push({
                title: sport.name,
                name: 'sport',
                sport: sport,
            });
        }
    },

    renderFooter: function() {
        if (!this.state.hasMore) {
            return <View style={styles.scrollSpinner} />;
        }
        if (Platform.OS === 'ios') {
            return <ActivityIndicatorIOS style={styles.scrollSpinner} />;
        } else {
            return (
                <View  style={{alignItems: 'center'}}>
                    <ProgressBarAndroid styleAttr="Large"/>
                </View>
            );
        }
    },

    renderSeparator: function(
        sectionID: number | string,
        rowID: number | string,
        adjacentRowHighlighted: boolean
    ) {
        var style = styles.rowSeparator;
        if (adjacentRowHighlighted) {
            style = [style, styles.rowSeparatorHide];
        }
        return (
            <View key={'SEP_' + sectionID + '_' + rowID}  style={style}/>
        );
    },

    renderRow: function(
        sport: Object,
        sectionID: number | string,
        rowID: number | string,
        highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void,
    ) {
        return (
            <SportCell
                key={sport.id}
                onSelect={() => this.selectSport(sport)}
                onHighlight={() => highlightRowFunc(sectionID, rowID)}
                onUnhighlight={() => highlightRowFunc(null, null)}
                sport={sport}
                />
        );
    },

    render: function() {
        var content = this.state.dataSource.getRowCount() === 0 ?
            <NoSport
                isLoading={this.state.isLoading}
                /> :
            <ListView
                ref="listview"
                renderSeparator={this.renderSeparator}
                dataSource={this.state.dataSource}
                renderFooter={this.renderFooter}
                renderRow={this.renderRow}
                onEndReached={this.onEndReached}
                automaticallyAdjustContentInsets={false}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps={true}
                showsVerticalScrollIndicator={false}
                />;

        return (
            <View style={styles.container}>
                {content}
            </View>
        );
    }
});

var NoSport = React.createClass({
    render: function() {
        var text = '';
        if (!this.props.isLoading) {
            text = 'No sports found';
        }

        return (
            <View style={[styles.container, styles.centerText]}>
                <Text style={styles.noSportsText}>{text}</Text>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    centerText: {
        alignItems: 'center',
    },
    noSportsText: {
        marginTop: 80,
        color: '#888888',
    },
    separator: {
        height: 1,
        backgroundColor: '#eeeeee',
    },
    scrollSpinner: {
        marginVertical: 20,
    },
    rowSeparator: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: 1,
        marginLeft: 4,
    },
    rowSeparatorHide: {
        opacity: 0.0,
    },
});

module.exports = SportListComp;
