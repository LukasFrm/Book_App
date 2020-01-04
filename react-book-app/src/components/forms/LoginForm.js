import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import Validator from "validator";
import InlineError from "../messages/InlineError";
import PropTypes from "prop-types";

export class LoginForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: { email: "", password: "" },
			loading: false,
			errors: {}
		};
	}

	onChange = e => {
		this.setState({
			data: { ...this.state.data, [e.target.name]: e.target.value }
		});
	};

	onSubmit = () => {
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.props.submit(this.state.data);
		}
	};

	validate = data => {
		const errors = {};
		if (!Validator.isEmail(data.email)) errors.email = "Email is invalid";
		if (!data.password) errors.password = "Password is invalid";

		return errors;
	};

	render() {
		const { data, errors } = this.state;
		return (
			<Form onSubmit={this.onSubmit}>
				<Form.Field error={!!errors.email}>
					<label>Email</label>
					<input
						type="email"
						id="email"
						placeholder="example@example.com"
						name="email"
						value={data.email}
						onChange={this.onChange}
					/>
				</Form.Field>
				{errors.email && <InlineError text={errors.email} />}

				<Form.Field error={!!errors.password}>
					<label>Password</label>
					<input
						type="password"
						id="password"
						placeholder="Please make sure it's secure!"
						name="password"
						value={data.password}
						onChange={this.onChange}
					/>
				</Form.Field>
				{errors.password && <InlineError text={errors.password} />}

				<Button primary style={{ marginTop: "10px" }}>
					Login
				</Button>
			</Form>
		);
	}
}

LoginForm.propTypes = {
	submit: PropTypes.func.isRequired
};

export default LoginForm;
