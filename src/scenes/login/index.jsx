import './login.css'
import LogoIndex from '../../img/logos/logo.png'
import React from 'react'
import AdminService from '../../service/AdminService'

class Login extends React.Component {
    state = {
        form: {
            "username": "",
            "password": ""
        },
        error: false,
        errormsg: ""
    }

    manageChange = async (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        })
        console.log(this.state.form)
    }

    handleClick = (e) => {
        e.preventDefault();
        AdminService.login(this.state.form).then((response) => {
            console.log(response)
            if (response.data.status === 200) {
                this.props.history.push('/dashboard');
            }
            else {
                this.setState({
                    error: true,
                    errormsg: response.data.message
                })
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                <section >
                    <div class="container" >
                        <div class="top"></div>
                        <div class="bottom"></div>
                        <div class="center">
                            <img src={LogoIndex} id='logo-df' />
                            <form >
                                <input placeholder="Usuario" name="username" type="text" onChange={this.manageChange} />
                                <input placeholder="Contraseña" name="password" type="password" onChange={this.manageChange} />
                                <button onClick={this.handleClick} type='submit' className='corner-button' >Entrar</button>
                            </form>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default Login