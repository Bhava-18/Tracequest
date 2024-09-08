import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Dashboard from 'react-native-dashboard';
import { FontAwesome } from 'react-native-vector-icons';

const Icon = ({ icon, item, background }) => (
    <FontAwesome
        name={icon}
        size={40}
        color={
            item.iconColor || (!item.background || !background ? '#3498db' : '#fff')
        }
        style={item.styleIcon}
    />
);

const data = [
    {
        name: 'Me',
        background: '#3498db',
        icon: (item, background) => Icon({ icon: 'user', item, background }),
        iconColor: '#0d47a1',
        rippleColor: '#000',
    },
    {
        name: 'Family',
        background: '#b71c1c',
        icon: (item, background) => Icon({ icon: 'gratipay', item, background }),
        styleIcon: { color: '#0d47a1' },
    },
    {
        name: 'Lovely',
        background: '#ffeb3b',
        icon: (item, background) => Icon({ icon: 'heart', item, background }),
    },
    {
        name: 'Team',
        background: '#4caf50',
        icon: (item, background) => Icon({ icon: 'users', item, background }),
        styleName: { color: '#0d47a1', fontWeight: 'bold' },
    },
    {
        name: 'Friends',
        nameColor: '#3498db',
        background: '#02cbef',
        icon: (item, background) => Icon({ icon: 'group', item, background }),
    },
    {
        name: 'Calendars',
        background: '#ff5722',
        icon: (item, background) => Icon({ icon: 'calendar', item, background }),
    },
];

export default function App() {
    const card = ({ name }) => console.log('Card: ' + name);
    return (
        <View style={styles.container}>
            <Dashboard
                data={data}
                background={true}
                card={card}
                column={2}
                rippleColor={'#3498db'}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
});