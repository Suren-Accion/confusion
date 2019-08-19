import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';

class Contact extends Component {

    constructor(props) {
        super(props);
        this.state = {
    
        };
    }

    static navigationOptions = () => ({
        title: 'Contact Us',
        headerTintColor: '#fff',
        headerStyle: {
          backgroundColor: '#512DA8'
        }
      });

    render () {

        return (
            <ScrollView style={{flex: 1,backgroundColor: '#E9ECEF'}}>
                <Card titleStyle={{fontSize: 16}} title="Contact Information" >
                    <Text>121, Clear Water Bay Road {'\n'}</Text>
                    <Text>Clear Water Bay, Kowloon {'\n'}</Text>
                    <Text>HONG KONG {'\n'}</Text>
                    <Text>Tel: +852 1234 5678 {'\n'}</Text>
                    <Text>Fax: +852 8765 4321 {'\n'}</Text>
                    <Text>Email:confusion@food.net</Text>
                </Card>
            </ScrollView>
        );
    }
}


export default Contact;
