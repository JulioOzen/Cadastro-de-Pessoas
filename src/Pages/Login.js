import { Component, createRef } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
// import Pessoa from "../Service/Pessoa";
import Util from "../util/Util";
import Listar from "../Service/Listar";
// import Pessoa from "../Service/Pessoa";
import { Messages } from 'primereact/messages';

export default class Login extends Component {
    buscarPessoa = new Listar();
    util = new Util();
    messages = createRef();

    state = {
        email: '',
        senha: '',
        inputError: {
            email: false,
            senha: false,
        }
    }

    componentDidMount() {
        this.iniciar()
    }

    async iniciar() {
        let listaPessoa = []

        listaPessoa = await this.buscarPessoa.listar()

        if (!listaPessoa) {
            listaPessoa = []
        }

        this.setState({
            listaPessoa: listaPessoa
        })
        return listaPessoa;
    }

    ValidarEmail(pEmail) {
        return /\S+@\S+\.\S+/.test(pEmail);
    }


    async entrar() {
        let listaPessoa = await this.util.buscarLocalStorage("LISTA_PESSOA")
        let inputError = this.state.inputError;
        let inputsOK = true;
        let emailOK = false;
        let senhaOK = false;

        Object.keys(inputError).forEach(pKey => {
            inputError[pKey] = false;

            console.log(pKey);
        });
        console.log(this.state.senha);

        if (!this.state.email) {
            inputError.email = true;
        }

        if (!this.state.senha) {
            inputError.senha = true;
        }

        Object.keys(inputError).forEach(pKey => {
            if (inputError[pKey]) {
                inputsOK = false;
            }
        });

        this.setState({ inputError: inputError });

        if (!inputsOK) {
            return;
        }

        listaPessoa.forEach(pPessoa => {
            if (pPessoa.email === this.state.email) {
                emailOK = true;

                if (pPessoa.senha === this.state.senha) {
                    senhaOK = true;
                }
            }
        })

        if (!emailOK) {
            this.messages.current.show({
                severity: 'error', summary: "Email não cadastrado!"
            });
        } else if (!senhaOK) {
            this.messages.current.show({
                severity: 'error', summary: "Senha inválida!"
            });
        }

        if (!emailOK || !senhaOK) {
            return;
        }

        window.location.href = '/menu';
    }

    render() {
        return (
            <div>

                <header>
                    <div className="divh1">
                        <div className="divh1-1">
                            <h1>Logo.png</h1>
                        </div>
                    </div>
                    <div className="divh2">
                        <div className="divh2-1">
                            <p onClick={() => window.location.href = "/cadastro"
                            }>Cadastre-se</p >
                        </div>
                    </div>
                </header>

                <main>
                    <section className="secLogin">
                        <div className="div1Login">
                            <Messages ref={this.messages} />

                            <p><strong>Login</strong></p>
                            <form onSubmit={pEvento => { pEvento.preventDefault(); this.entrar() }}>
                                <div>
                                    <div>
                                        <label>Email</label><br />
                                        <InputText
                                            style={{ width: "100%", marginBottom: 10, borderColor: this.state.inputError.email && "red" }}
                                            onChange={pEvento => this.setState({ email: pEvento.target.value })}
                                            value={this.state.email} />
                                    </div>
                                    {this.state.inputError.email && <small style={{ color: 'red' }}>Usuário inválido</small>}

                                    <div>
                                        <label>Senha</label>
                                        <InputText
                                            style={{ width: "100%", marginBottom: 10, borderColor: this.state.inputError.senha && "red" }}
                                            onChange={pEvento => this.setState({ senha: pEvento.target.value })}
                                            value={this.state.senha} />
                                        {this.state.inputError.senha && <small style={{ color: 'red' }}>Digite a senha</small>}
                                    </div>
                                </div>
                                <Button type="submit" label="Entrar" style={{ marginTop: 10 }} />
                            </form>
                        </div>
                    </section>
                </main>
            </div>
        )
    }
}