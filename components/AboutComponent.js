import React, { Component } from 'react';
import { Text, FlatList, ScrollView } from 'react-native';
import { Card, CardTitle, ListItem } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
  return {
    leaders: state.leaders
  }
}

const History = (props) => {

  return (
    <Card titleStyle={{ fontSize: 16 }} title="Our History">
      <Text>
        Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
                {'\n'}
      </Text>
      <Text>
        The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
            </Text>
    </Card>
  );
}

class About extends Component {

  static navigationOptions = () => ({
    title: 'About Us',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#512DA8'
    }
  });

  render() {

    const renderLeaderItem = ({ item, index }) => {
      return (
        <ListItem
          key={index}
          title={<Text style={{ fontWeight: 'bold' }}>{item.name}</Text>}
          subtitle={item.description}
          hideChevron={true}
          leftAvatar={{ source: { uri: baseUrl + item.image } }}
        />
      );
    }

    if (this.props.leaders.isLoading) {
      return (
        <ScrollView>
          <History />
          <Card
            title='Corporate Leadership'>
            <Loading />
          </Card>
        </ScrollView>
      );
    }
    else if (this.props.leaders.errMess) {
      return (
        <ScrollView>
          <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <History />
            <Card
              title='Corporate Leadership'>
              <Text>{this.props.leaders.errMess}</Text>
            </Card>
          </Animatable.View>
        </ScrollView>
      );
    }
    else {
      return (
        <ScrollView style={{ flex: 1, backgroundColor: '#E9ECEF' }} >
          <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <History />
            <Card titleStyle={{ fontSize: 16 }} title="Corporate Leadership" >
              <FlatList
                data={this.props.leaders.leaders}
                renderItem={renderLeaderItem}
                keyExtractor={item => item.id.toString()}
              />
            </Card>
          </Animatable.View>
        </ScrollView>
      );
    }
  }
}


export default connect(mapStateToProps)(About);
