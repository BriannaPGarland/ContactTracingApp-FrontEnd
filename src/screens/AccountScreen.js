import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, AsyncStorage } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import axios from 'axios';

export default class AccountScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			progress: { amount: 100, text: 'No need to quarantine, but tell us if you are feeling any symptoms' }, // Default progress shows that user is not exposed but could use vaccine
		};

		this.initializeAccountScreen();
	}

	async initializeAccountScreen() {
		// Get user data and set progress bar on status
		const token = await AsyncStorage.getItem('auth-token');
		axios({ method: 'get', url: 'https://traq-server.herokuapp.com/api/users/me', headers: { 'x-auth-token': token } })
			.then((res) => {
				this.setState({ user: res.data });
				// Set up progress bar
				this.initializeProgressBar(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	async initializeProgressBar(user) {
		// Change progress purpose
		if (user.hasOwnProperty('vaccination')) {
			// Progress bar now tells user congratulations or checks if you still need your second dose
			if (user.vaccination.type === 'j&j') {
				if (user.vaccination.hasOwnProperty('firstVac')) {
					const vacDate = new Date(user.vaccination.firstVac),
						today = new Date();
					if (vacDate <= today) {
						this.setState({
							progress: { amount: 100, text: 'Congratulations on your Janssen COVID-19 vaccine!' },
						});
					} else {
						this.setState({
							progress: { amount: 0, text: 'Oh no, we found an error with your vaccination records' },
						});
					}
				}
			} else if (user.vaccination.hasOwnProperty('secondVac')) {
				// 2nd dose was given
				const vaccineName = user.vaccination.type.charAt(0).toUpperCase() + user.vaccination.type.slice(1);
				this.setState({
					progress: { amount: 100, text: `Congratulations on your ${vaccineName} COVID-19 vaccine!` },
				});
			} else {
				const vaccineName = user.vaccination.type.charAt(0).toUpperCase() + user.vaccination.type.slice(1);
				this.setState({
					progress: {
						amount: 50,
						text: `First dose of the ${vaccineName} vaccine down! Let us know when you get your second`,
					},
				});
			}
		} else if (user.hasCovid === true) {
			// Find if in quarantine period
			const exposureDay = new Date(user.lastExposed),
				today = new Date();
			// Calculate the difference in milliseconds
			const differenceInMilliseconds = today - exposureDay;
			// Convert back to days
			const timeSinceExposure = Math.round(differenceInMilliseconds / 86400000); // 86,400,000 is one day in milliseconds

			if (timeSinceExposure <= 14) {
				// In quarantine
				const daysUntilQuarantineEnds = 14 - timeSinceExposure;
				this.setState({
					progress: {
						amount: (timeSinceExposure / 14) * 100,
						text: `${daysUntilQuarantineEnds} days until your quarantine ends!`,
					},
				});
			} else {
				// No longer in quarantine, default progress is fine
				// Update backend to change status
				const token = await AsyncStorage.getItem('auth-token');
				axios
					.put(
						'https://traq-server.herokuapp.com/api/users/covid-status',
						{ hasCovid: false, lastExposed: user.lastExposed },
						{ headers: { 'x-auth-token': token } }
					)
					.then((res) => {
						console.log(res.data);
					})
					.catch((err) => {
						console.log(err);
					});
			}
		}
	}

	render() {
		return (
			<SafeAreaView style={styles.mainContainer}>
				<View style={styles.headerContainer}>
					<Text style={styles.header}>Account</Text>
					<TouchableOpacity onPress={this.props.didLogout}>
						<AntDesign name='logout' size={24} color='#4d97b6' />
					</TouchableOpacity>
				</View>
				<View style={styles.mainContent}>
					<View style={styles.progressContainer}>
						<AnimatedCircularProgress
							size={Dimensions.get('window').width - 64}
							width={32}
							fill={this.state.progress.amount}
							rotation={0}
							tintColor='#FF0000'
							tintColorSecondary='#00FF00'
							backgroundColor='#F4F4F4'
							lineCap='round'
						>
							{(fill) => <Text style={styles.progressText}>{this.state.progress.text}</Text>}
						</AnimatedCircularProgress>
					</View>
				</View>
				<View style={{ justifyContent: 'flex-end' }}>
					<TouchableOpacity style={[styles.accountButtonContainer, { backgroundColor: '#4d97b6' }]}>
						<Text style={styles.accountButtonText}>Add Test Results</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.accountButtonContainer}>
						<Text style={[styles.accountButtonText, { color: 'black' }]}>Add Vaccination</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	mainContainer: {
		height: '100%',
		width: '100%',
		backgroundColor: 'white',
	},
	headerContainer: {
		marginHorizontal: 16,
		marginBottom: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	header: {
		fontSize: 22,
		fontWeight: '700',
		color: '#707070',
	},
	mainContent: {
		flex: 1,
		marginHorizontal: 16,
	},
	progressContainer: {
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	progressText: {
		width: '80%',
		textAlign: 'center',
		fontSize: 18,
		fontWeight: '500',
		color: '#4d97b6',
	},
	accountButtonContainer: {
		height: '26%',
		marginBottom: 16,
		marginHorizontal: 16,
		backgroundColor: '#f4f4f4',
		justifyContent: 'center',
		alignItems: 'center',
	},
	accountButtonText: {
		textAlign: 'center',
		fontSize: 22,
		fontWeight: '500',
		color: 'white',
	},
});
