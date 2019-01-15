import React, { Component } from 'react';
import FormErrors from '../FormErrors/FormErrors.js';
import DatabaseErrors from '../DatabaseErrors/DatabaseErrors.js';
import './SignUp.css';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            password_confirmation: '',
            databaseErrors: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.mounted = true;

        this.props.socket.on('registerErrors', (response) => {
            if (this.mounted) {
              this.setState({
                  databaseErrors: response.error
              });
            }
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    handleSubmit(event) {
        event.preventDefault();

        const { username, email, password, password_confirmation } = this.state;
        this.props.socket.emit('registerUser', { username, email, password, password_confirmation });
    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        const formIsValid = this.state.username.length && this.state.email.length && this.state.password.length && this.state.password_confirmation.length
        let submitButton;

        if (formIsValid) {
            submitButton = <input type="submit" className="btn btn-success" value="Register" />;
        } else {
            submitButton = <input type="submit" className="btn btn-success" value="Register" disabled />
        }
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-0 col-sm-12 col-md-0 col-lg-3">
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <form className="authenticate" onSubmit={this.handleSubmit}>
                            <h5 className="title">Register Here!</h5>
                            <div className="panel panel-default">
                                <FormErrors formErrors={{ username: this.state.username, email: this.state.email, password: this.state.password, password_confirmation: this.state.password_confirmation }} />
                                <DatabaseErrors databaseErrors={this.state.databaseErrors} />
                            </div>
                            <input type="text" id="username" name="username" className="form-control signUp" placeholder="username" onChange={this.handleChange} value={this.state.username} />
                            <input type="text" id="email" name="email" className="form-control signUp" placeholder="email" onChange={this.handleChange} value={this.state.email} />
                            <input type="password" id="password" name="password" className="form-control signUp" placeholder="password" onChange={this.handleChange} value={this.state.password} />
                            <input type="password" id="password_confirmation" name="password_confirmation" className="form-control signUp" placeholder="confirm password" onChange={this.handleChange} value={this.state.password_confirmation} />
                            {submitButton}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignUp;
