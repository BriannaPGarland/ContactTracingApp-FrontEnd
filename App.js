import * as React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios from 'axios';
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
			user: {},
		};
	}

	async componentDidMount() {
		// Check for tokens in account
		const token = await AsyncStorage.getItem('auth-token');
		if (token) {
			this.setState({
				isInitialized: true,
				loggedIn: true,
			});
		} else {
			// App initialized but no token, push to registration
			this.setState({
				isInitialized: true,
				loggedIn: false,
			});
		}
	}

	didLogin = (email, password) => {
		axios
			.post('https://traq-server.herokuapp.com/api/auth', { email, password })
			.then(async (res) => {
				await AsyncStorage.setItem('auth-token', res.data);
				this.setState({
					loggedIn: true,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	didSignup = (email, password, firstName, lastName) => {
		axios
			.post('https://traq-server.herokuapp.com/api/users', { firstName, lastName, email, password })
			.then(async (res) => {
				await AsyncStorage.setItem('auth-token', res.headers['x-auth-token']);
				this.setState({
					loggedIn: true,
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	didLogout = async () => {
		// Throw out auth token
		await AsyncStorage.removeItem('auth-token');
		// Send back to registration
		this.setState({ loggedIn: false });
	};

	render() {
		const { isInitialized, loggedIn } = this.state;
		if (isInitialized) {
			if (!loggedIn) {
				// Signup and Login workflow
				return <RegistrationScreen didLogin={this.didLogin} didSignup={this.didSignup} />;
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
							<Tab.Screen name='Account' children={() => <AccountScreen didLogout={this.didLogout} />} />
							{/* This component implementation is used to pass props into the account screen */}
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
