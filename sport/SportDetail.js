/**
 * Created by lily on 15/11/29.
 */
'use strict';

var React = require('react-native');
var {
    Image,
    PixelRatio,
    ScrollView,
    StyleSheet,
    Text,
    View,
    } = React;

var SportScreen = React.createClass({
    render: function() {
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.mainSection}>
                    {/* $FlowIssue #7363964 - There's a bug in Flow where you cannot
                     * omit a property or set it to undefined if it's inside a shape,
                     * even if it isn't required */}
                    <Image
                        source={this.props.sport.head_image_url}
                        style={styles.detailsImage}
                        />
                </View>
            </ScrollView>
        );
    },
});


var styles = StyleSheet.create({
    contentContainer: {
        padding: 10,
    },
    mainSection: {
        flexDirection: 'row',
    },
    detailsImage: {
        width: 134,
        height: 200,
        backgroundColor: '#eaeaea',
        marginRight: 10,
    }
});

module.exports = SportScreen;
