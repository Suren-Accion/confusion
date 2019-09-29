import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Picker, Switch, Button, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';
import { Notifications } from 'expo';

class  Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        }
    }

    static navigationOptions ={
        title: 'Reserve Table'
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleReservation() {
        Alert.alert(
            'Your Reservation OK',
            'Number of guests: ' + this.state.guests + '\n' +
                'Smoking? :' +(this.state.smoking ? 'Yes' : 'No') + '\n' +
                'Date and time: ' + this.state.date,
                [
                    {
                        text: 'Cancel',
                        onPress: () => this.resetForm(),
                        style: 'cancel'
                    },
                    {
                        text: 'OK',
                        onPress: async () => {
                            this.presentLocalNotification(this.state.date);
                            this.addReservationToCalendar(this.state.date);
                            this.resetForm();
                        }
                    }
                ]
        );
    }

    async getDefaultCalendar() {
        // This function is only valid on android
        // Error handling is lacking
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT).then(
            calendars => console.log('calendar: ' + JSON.stringify(calendars[0])))
            .catch(error => console.log('no calendar: ' + error));
        calendar = calendars.filter(calendar => calendar.isPrimary)[0];
        return calendar;
    }

    async addReservationToCalendar(date) {
        start = Date.parse(date);
        end = start + 120*60*60*1000;
        this.obtainCalendarPermission();
        // Calendar.default has been dropped from the API
        calendar = await this.getDefaultCalendar();
        Calendar.createEventAsync(calendar.id, {
            title: 'Con Fusion Table Reservation',
            startDate: new Date(start),
            endDate: new Date(end),
            location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong',
            timeZone: 'Asia/Hong_Kong'
        })
        .catch(console.log(error => 'Error saving to calendar ' + error));
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: ''
        });
    }

    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications.');
            }
        }
        return permission;
     }

     async obtainCalendarPermission() {
         let permission = await Permissions.getAsync(Permissions.CALENDAR);
         if (permission.status !== 'granted') {
             permission = await Permissions.askAsync(Permissions.CALENDAR);
             if (permission.status !== 'granted') {
                 Alert.alert('Permission not granted to access calendar.');
             }
         }
         return permission;
      }

     async presentLocalNotification(date) {
         await this.obtainNotificationPermission();
         Notifications.presentLocalNotificationAsync({
             title: 'Your reservation',
             body: 'Reservation for ' + date + ' requested.',
             ios: {
                 sound: true
             },
             android: {
                 sound: true,
                 vibrate: true,
                 color: '#512DA8'
             }
         });
     }

    render() {
        return (
            <ScrollView>
                <Animatable.View
                    animation="zoomIn"
                    duration={2000}
                    delay={1000}
                    >
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number Of Guests</Text>
                        <Picker style={styles.formItem}
                            selectedValue = {this.state.guests}
                            onValueChange={(itemValue,ItemIndex) => this.setState({guests: itemValue})}
                        >
                            <Picker.item label='1' value='1' />
                            <Picker.item label='2' value='2' />
                            <Picker.item label='3' value='3' />
                            <Picker.item label='4' value='4' />
                            <Picker.item label='5' value='5' />
                            <Picker.item label='6' value='6' />
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Smoking/Non-smoking?</Text>
                        <Switch
                            style={styles.formItem}
                            value = {this.state.smoking}
                            onTintColor='#512DA8'
                            onValueChange={(value) => this.setState({smoking: value})}
                            >
                        </Switch>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date and Time</Text>
                        <DatePicker
                            style={{flex: 2, marginRight: 20}}
                            date={this.state.date}
                            format=''
                            mode='datetime'
                            placeholder='Select date and time'
                            minDate='2019-09-01'
                            confirmBtnText='Confirm'
                            cancelBtnText='Cancel'
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(date) => this.setState({date: date})}
                        />
                    </View>
                    <View style={styles.formRow}>
                        <Button
                            title='Reserve'
                            color='#512DA8'
                            onPress={() => this.handleReservation()}
                        />
                    </View>
                </Animatable.View>
            </ScrollView>
        );
    }
}

const styles=StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
});

export default Reservation;
