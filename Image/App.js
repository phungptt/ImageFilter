

import React, { Component } from 'react';
import Canvas from 'react-native-canvas';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Filter,

} from 'react-native';



export default class App extends Component<{}> {
    _onPressButton() {
        Filter.getPixels = function(source) {
            var c = this.getCanvas(source.width, source.height);
            var ctx = c.getContext('2d');
            ctx.drawImage(source);
            return ctx.getImageData(0, 0, c.width, c.height);
        }

        Filter.getCanvas = function(w, h) {
            var c = document.createElement('canvas');
            c.width = w;
            c.height = h;
            return c; 
        }

        Filter.filterImage = function(filter, image, var_args) {
            var args = [this.getPixels(source)];
            for (var i=2; i < arguments.length; i++) {
                args.push(arguments[i]);
            }
            return filter.apply(null, args);
        }

        Filter.threshold = function(pixels, threshold) {
            var d = pixels.data;
            for (var i = 0; i < d.length; i += 4) {
                var r = d[i];
                var g = d[i+1];
                var b = d[i+2];
                var v = (0.2126*r + 0.7152*g + 0.0722*b >= threshold) ? 255 : 0;
                d[i] = d[i+1] = d[i+2] = v
            }
            return pixels;
        };
    }   

    render() {
        return (
            <View>
                <Image
                    source = {require('./1.jpg')}
                    style = {styles.container}
                />
                <Button
                    large
                    icon={{name: 'envira', type: 'font-awesome'}}
                    title='Filter' 
                    onPress = {() => this._onPressButton}
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 400,
        height: 300,
    },
    
});
