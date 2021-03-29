import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Agenda } from 'react-native-calendars';

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: 'John Smith',
		};
	}

	render() {
		return (
			<SafeAreaView style={styles.mainContainer}>
				<Text style={styles.header}>
					Hello, <Text style={styles.headerName}>{this.state.userName}</Text>
				</Text>
				<View style={styles.mainContent}>
					<Agenda
						items={{
							'2021-03-29': [{ name: 'item 1 - any js object' }],
							'2021-04-05': [{ name: 'item 2 - any js object', height: 80 }],
							'2021-04-07': [],
							'2021-04-15': [{ name: 'item 3 - any js object' }, { name: 'any js object' }],
						}}
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
		backgroundColor: 'red',
	},
});
