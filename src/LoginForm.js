import React, {Component} from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserStore from './stores/UserStore';

class LoginForm extends Component {

    constructor(props){
        super(props);
        this.state ={
            username:'',
            password: '',
            buttonDisabled: false
        }
    }

    resetForm(){
        this.setState({
            username:'',
            password: '',
            buttonDisabled: false            
        })
    }

    async doLogin(){
        if(!this.state.username){
            return;
        }

        if(!this.state.password){
            return;
        }

        this.setState({
            buttonDisabled: true
        })

        try
        {
            let res = await fetch('/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })

            })

            let result = await res.json();

            if(result && result.success){
                UserStore.isloggedIn = true;
                UserStore.username = result.username;
            }
            else if (result && result.success == false){
                this.resetForm();
                alert(result.msg)
            }

        }
        catch(e){
            console.log(e);
            this.resetForm();
        }

    }


    setInputValue(property, val){
        val = val.trim();
        if(val.length > 12){
            return;
        }

        this.setState({[property]: val})
    }

    render(){

        return (
            <div className="loginForm">
                login form

                <InputField 
                    type='text'
                    placeholder ='Username'
                    value = {this.state.username ? this.state.username: ''}
                    onChange = {(val) => this.setInputValue('username', val)}
                />

                
                <InputField 
                    type='password'
                    placeholder ='Pasword'
                    value = {this.state.password ? this.state.password: ''}
                    onChange = {(val) => this.setInputValue('password', val)}
                />

                <SubmitButton
                    text ='login'
                    disabled = {this.state.buttonDisabled}
                    onClick = {() => this.doLogin()}
                />

            </div>
        );
    };
}

export default LoginForm;
