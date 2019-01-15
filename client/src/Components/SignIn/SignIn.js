import React, { Component } from 'react';
import FormErrors from '../FormErrors/FormErrors.js';
import DatabaseErrors from '../DatabaseErrors/DatabaseErrors.js';
import './SignIn.css';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: '',
            databaseErrors: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.mounted = true;

        this.props.socket.on('loginErrors', (response) => {
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
        const { user, password } = this.state;

        this.props.socket.emit('loginUser', { user, password });
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }


    render() {
        const isFormValid = this.state.user.length && this.state.password.length;

        let submitButton;
        if (isFormValid) {
            submitButton = <input type="submit" className="btn btn-success" value="Login" />;
        } else {
            submitButton = <input type="submit" className="btn btn-success" value="Login" disabled />;
        }

        return (
            <div className="main-content container-fluid">
                <div className="row">
                    <div className="col-xs-0 col-sm-12 col-md-0 col-lg-3">
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">
                        <form className="authenticate" onSubmit={this.handleSubmit}>
                            <h5 className="title">Login Here!</h5>
                            <div className="panel panel-default">
                                <FormErrors formErrors={{ user: this.state.user, password: this.state.password }} />
                                <DatabaseErrors databaseErrors={this.state.databaseErrors} />
                            </div>
                            <div className="user_input">
                                <input type="text" id="user" name="user" className="form-control signin" placeholder="username or email" onChange={this.handleChange} value={this.state.user} />
                                <input type="password" id="password" name="password" className="form-control signin" placeholder="password" onChange={this.handleChange} value={this.state.password} />
                                {submitButton}
                            </div>
                        </form>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default SignIn;
