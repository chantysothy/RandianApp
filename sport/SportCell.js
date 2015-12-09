'use strict';

var React = require('react-native');
var {
    Image,
    PixelRatio,
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback,
    View
    } = React;

var SportCell = React.createClass({
    render: function() {
        var TouchableElement = TouchableHighlight;
        if (Platform.OS === 'android') {
            TouchableElement = TouchableNativeFeedback;
        }
        return (
            <View>
                <TouchableElement
                    onPress={this.props.onSelect}
                    onShowUnderlay={this.props.onHighlight}
                    onHideUnderlay={this.props.onUnhighlight}>
                    <View style={styles.row}>
                        {/* $FlowIssue #7363964 - There's a bug in Flow where you cannot
                         * omit a property or set it to undefined if it's inside a shape,
                         * even if it isn't required */}
                        <Image
                            style={styles.cellImage}
                            source={{uri:this.props.sport.head_image_url}}
                            />
                        <View style={styles.textContainer}>
                            <Text style={styles.sportTitle} numberOfLines={1}>
                                {this.props.sport.name} {this.props.sport.head_image_url}
                            </Text>
                            <Text style={styles.sportTitle} numberOfLines={1}>
                                建议人数：{this.props.sport.min_user_num} ~ {this.props.sport.max_user_num}
                            </Text>
                            <Text style={styles.sportTitle} numberOfLines={1}>
                                时间：{this.props.sport.duration}
                            </Text>
                        </View>
                    </View>
                </TouchableElement>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    textContainer: {
        flex: 1,
    },
    sportTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 2,
    },
    row: {
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 5,
    },
    imageContainer:{

    },
    cellImage: {
        backgroundColor: '#dddddd',
        height: 70,
        width: 75,
        marginRight: 10,
        marginTop: 10,
        overflow:'hidden'
    },
    cellBorder: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        // Trick to get the thinest line the device can display
        height: 1 / PixelRatio.get(),
        marginLeft: 4,
    },
});

module.exports = SportCell;
