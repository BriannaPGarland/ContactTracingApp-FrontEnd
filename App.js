import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Screen imports
import HomeScreen from './src/screens/HomeScreen';
import AccountScreen from './src/screens/AccountScreen';
import FriendScreen from './src/screens/FriendScreen';

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isInitialized: false,
			loggedIn: false,
		};
	}

	componentDidMount() {
		// Force account and app initialization for now
		this.setState({
			isInitialized: true,
			loggedIn: true,
		});
	}

	render() {
		const { isInitialized, loggedIn } = this.state;
		if (isInitialized) {
			if (!loggedIn) {
				// Signup and Login workflow
				return <View></View>;
			} else {
				return (
					<NavigationContainer>
						<Tab.Navigator initialRouteName='Home'>
							<Tab.Screen name='Friend' component={FriendScreen} />
							<Tab.Screen name='Home' component={HomeScreen} />
							<Tab.Screen name='Account' component={AccountScreen} />
						</Tab.Navigator>
					</NavigationContainer>
				);
			}
		} else {
			// Splash Screen
			return <View></View>;
		}
	}
}
