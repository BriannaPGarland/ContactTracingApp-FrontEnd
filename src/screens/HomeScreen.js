import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, AsyncStorage, TouchableOpacity, Alert } from 'react-native';
import { Agenda } from 'react-native-calendars';
import axios from 'axios';

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: {},
			user: { firstName: '' }, // Default so that nothing breaks on error
		};

		this.generateDemoItems();
		this.initializeUser();
	}

	async initializeUser() {
		const token = await AsyncStorage.getItem('auth-token');
		axios({ method: 'get', url: 'https://traq-server.herokuapp.com/api/users/me', headers: { 'x-auth-token': token } })
			.then((res) => {
				this.setState({ user: res.data });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	generateDemoItems() {
		var date = new Date();
		date.setDate(date.getDate() + 5);
		var dateInAdvanceFormatted = date.toISOString().split('T')[0];

		this.state.items[dateInAdvanceFormatted] = [];
		this.state.items[dateInAdvanceFormatted].push({
			demo: true,
			name: 'John Smith quarantine ends',
			height: 100,
		});
	}

	loadItems(day) {
		setTimeout(() => {
			for (let i = -15; i < 85; i++) {
				const time = day.timestamp + i * 24 * 60 * 60 * 1000;
				const strTime = this.timeToString(time);
				if (!this.state.items[strTime]) {
					this.state.items[strTime] = [];
					const numItems = 1;
					for (let j = 0; j < numItems; j++) {
						this.state.items[strTime].push({
							//name: 'Item for ' + strTime + ' #' + j,
							height: 100,
						});
					}
				}
			}
			const newItems = {};
			Object.keys(this.state.items).forEach((key) => {
				newItems[key] = this.state.items[key];
			});
			this.setState({
				items: newItems,
			});
		}, 1000);
	}

	renderItem(item) {
		return (
			<TouchableOpacity style={[styles.item, { height: item.height, backgroundColor: item.demo ? '#4d97b6' : '#f4f4f4' }]}>
				<Text style={styles.itemText}>{item.name}</Text>
			</TouchableOpacity>
		);
	}

	renderEmptyDate() {
		return (
			<View style={styles.emptyDate}>
				<Text>This is empty date!</Text>
			</View>
		);
	}

	rowHasChanged(r1, r2) {
		return r1.name !== r2.name;
	}

	timeToString(time) {
		const date = new Date(time);
		return date.toISOString().split('T')[0];
	}

	render() {
		return (
			<SafeAreaView style={styles.mainContainer}>
				<Text style={styles.header}>
					Hello, <Text style={styles.headerName}>{this.state.user.firstName}</Text>
				</Text>
				<View style={styles.mainContent}>
					<Agenda
						items={this.state.items}
						loadItemsForMonth={this.loadItems.bind(this)}
						renderItem={this.renderItem.bind(this)}
						renderEmptyDate={this.renderEmptyDate.bind(this)}
						rowHasChanged={this.rowHasChanged.bind(this)}
						theme={{
							dayTextColor: '#1a1b1b',
							todayTextColor: '#4d97b6',
							dotColor: '#1a1b1b',
							backgroundColor: '#f4f4f4',
							selectedDayBackgroundColor: '#a9d5e6',
							agendaDayTextColor: '#a9d5e6',
							agendaDayNumColor: '#a9d5e6',
							agendaTodayColor: '#4d97b6',
						}}
					/>
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
	header: {
		marginLeft: 16,
		marginBottom: 16,
		fontSize: 22,
		fontWeight: '500',
		color: '#707070',
	},
	headerName: {
		marginLeft: 16,
		marginBottom: 16,
		fontSize: 22,
		color: '#4d97b6',
		fontWeight: '700',
	},
	mainContent: {
		flex: 1,
	},
	item: {
		justifyContent: 'center',
		borderTopLeftRadius: 25,
		borderBottomLeftRadius: 25,
	},
	itemText: {
		marginLeft: 16,
		fontSize: 20,
		fontWeight: '700',
		color: '#fff',
	},
});
