import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

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

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['suren.vinoth11@gmail.com'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }

    render() {

        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#E9ECEF' }}>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <Card titleStyle={{ fontSize: 16 }} title="Contact Information" >
                        <Text>121, Clear Water Bay Road {'\n'}</Text>
                        <Text>Clear Water Bay, Kowloon {'\n'}</Text>
                        <Text>HONG KONG {'\n'}</Text>
                        <Text>Tel: +852 1234 5678 {'\n'}</Text>
                        <Text>Fax: +852 8765 4321 {'\n'}</Text>
                        <Text>Email:confusion@food.net</Text>
                    </Card>
                    <Button
                        title="Send Email"
                        buttonStyle={{ backgroundColor: "#512DA8" }}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={this.sendMail}
                    />
                </Animatable.View>
            </ScrollView>
        );
    }
}


export default Contact;
