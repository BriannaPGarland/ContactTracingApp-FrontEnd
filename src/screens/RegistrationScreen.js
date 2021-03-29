import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native';
import logo from '../assets/logo.png';

export default class RegistrationScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			onLogin: true,
			email: '',
			password: '',
			firstName: '',
			lastName: '',
		};
		this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
		this.handleLastNameInput = this.handleLastNameInput.bind(this);
		this.handleEmailInput = this.handleEmailInput.bind(this);
		this.handlePasswordInput = this.handlePasswordInput.bind(this);

		this.toggleRegistrationView = this.toggleRegistrationView.bind(this);
	}

	handleEmailInput = (text) => {
		this.setState({ email: text });
	};
	handlePasswordInput = (text) => {
		this.setState({ password: text });
	};
	handleFirstNameInput = (text) => {
		this.setState({ firstName: text });
	};
	handleLastNameInput = (text) => {
		this.setState({ lastName: text });
	};

	toggleRegistrationView() {
		this.setState({ onLogin: !this.state.onLogin });
	}

	render() {
		const { onLogin } = this.state;
		if (onLogin) {
			// Login
			return (
				<SafeAreaView style={styles.mainContainer}>
					<Image style={styles.logo} source={logo} />
					<Text style={styles.header}>Sign In</Text>
					<View style={styles.inputContainer}>
						<TextInput
							placeholder='Email'
							placeholderTextColor='#707070'
							autoCapitalize='none'
							onChangeText={this.handleEmailInput}
							style={styles.input}
						/>
					</View>
					<View style={styles.inputContainer}>
						<TextInput
							placeholder='Password'
							placeholderTextColor='#707070'
							autoCapitalize='none'
							onChangeText={this.handlePasswordInput}
							style={styles.input}
						/>
					</View>
					<TouchableOpacity style={styles.submitButton} onPress={this.props.didLogin}>
						<Text style={styles.submitText}>Submit</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.switchButton} onPress={this.toggleRegistrationView}>
						<Text style={styles.switchText}>Need an account? Click to create an account</Text>
					</TouchableOpacity>
				</SafeAreaView>
			);
		} else {
			// Register
			return (
				<SafeAreaView style={styles.mainContainer}>
					<Image style={styles.logo} source={logo} />
					<Text style={styles.header}>Create Account</Text>
					<View style={styles.inputContainer}>
						<TextInput
							placeholder='First Name'
							placeholderTextColor='#707070'
							autoCapitalize='none'
							onChangeText={this.handleFirstNameInput}
							style={styles.input}
						/>
					</View>
					<View style={styles.inputContainer}>
						<TextInput
							placeholder='Last Name'
							placeholderTextColor='#707070'
							autoCapitalize='none'
							onChangeText={this.handleLastNameInput}
							style={styles.input}
						/>
					</View>
					<View style={styles.inputContainer}>
						<TextInput
							placeholder='Email'
							placeholderTextColor='#707070'
							autoCapitalize='none'
							onChangeText={this.handleEmailInput}
							style={styles.input}
						/>
					</View>
					<View style={styles.inputContainer}>
						<TextInput
							placeholder='Password'
							placeholderTextColor='#707070'
							autoCapitalize='none'
							onChangeText={this.handlePasswordInput}
							style={styles.input}
						/>
					</View>
					<TouchableOpacity
						style={styles.submitButton}
						onPress={() => {
							console.log('test');
						}}
					>
						<Text style={styles.submitText}>Submit</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.switchButton} onPress={this.toggleRegistrationView}>
						<Text style={styles.switchText}>Have an account? Click to sign in</Text>
					</TouchableOpacity>
				</SafeAreaView>
			);
		}
	}
}

const styles = StyleSheet.create({
	mainContainer: {
		height: '100%',
		width: '100%',
		backgroundColor: '#fff',
		alignItems: 'center',
	},
	logo: {
		width: '85%',
		maxHeight: 75,
		resizeMode: 'contain',
		marginBottom: 30,
	},
	header: {
		fontSize: 32,
		fontWeight: '700',
		//color: '#a9d5e6',
		color: '#1a1b1b',
	},
	inputContainer: {
		width: '85%',
		height: 50,
		marginVertical: 10,
		borderColor: '#a9d5e6',
		borderBottomWidth: 4,
		backgroundColor: 'white',
	},
	input: {
		flex: 1,
		paddingHorizontal: 16,
		fontSize: 16,
	},

	submitButton: {
		width: '50%',
		height: 65,
		marginVertical: 20,
		borderRadius: 35,
		backgroundColor: '#4d97b6',
		alignItems: 'center',
		justifyContent: 'center',
	},
	submitText: {
		fontSize: 22,
		fontWeight: '700',
		color: '#fff',
	},
	switchButton: {
		width: '85%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	switchText: {
		fontSize: 16,
		fontWeight: '500',
		color: '#1a1b1b',
	},
});
