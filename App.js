import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Icons for Tab bar
import AntDesign from '@expo/vector-icons/AntDesign';
// Screen imports
import HomeScreen from './src/screens/HomeScreen';
import AccountScreen from './src/screens/AccountScreen';
import FriendScreen from './src/screens/FriendScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';

const Tab = createBottomTabNavigator();

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isInitialized: false,
			loggedIn: false,
		};
		this.didLogin = this.didLogin.bind(this);
	}

	componentDidMount() {
		// Force account and app initialization for now
		this.setState({
			isInitialized: true,
			loggedIn: false,
		});
	}

	didLogin() {
		this.setState({
			loggedIn: true,
		});
	}

	render() {
		const { isInitialized, loggedIn } = this.state;
		if (isInitialized) {
			if (!loggedIn) {
				// Signup and Login workflow
				return <RegistrationScreen didLogin={this.didLogin} />;
			} else {
				return (
					<NavigationContainer>
						<Tab.Navigator
							initialRouteName='Home'
							screenOptions={({ route }) => ({
								tabBarIcon: ({ focused, color, size }) => {
									let iconName;

									if (route.name === 'Home') {
										iconName = 'home';
									} else if (route.name === 'Friends') {
										iconName = 'contacts';
									} else if (route.name === 'Account') {
										iconName = 'user';
									}

									return <AntDesign name={iconName} size={size} color={color} />;
								},
							})}
							tabBarOptions={{
								activeTintColor: '#4d97b6',
								inactiveTintColor: '#707070',
							}}
						>
							<Tab.Screen name='Friends' component={FriendScreen} />
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
