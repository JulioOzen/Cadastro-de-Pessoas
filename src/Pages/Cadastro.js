import { Component } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Pessoa from "../Service/Pessoa";
import Util from "../util/Util";
import Listar from "../Service/Listar";
import GetData from "../util/getData";

export default class Cadastro extends Component {
    data = new GetData()
    buscarpessoa = new Listar()
    util = new Util()

    state = {
        pessoa: new Pessoa(),
        listaPessoa: [],
        inputErro: {
            nomeInvalido: false,
            email: false,
            emailInvalido: false,
            emailExistente: false,
            senha: false,
            senhaPequena: false,
            senhaInvalida: false,
            situaçaoInvalida: false

        }
    }

    componentDidMount() {
        this.iniciar()
    }

    async iniciar() {
        let listaPessoa = []

        listaPessoa = await this.buscarpessoa.listar()

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

    validarSenha(pSenha) {
        return /^(?=.{8,})(?=.*[0-9])/.test(pSenha)
    }

    cadastrarPessoa() {
        let listaPessoa = this.state.listaPessoa
        let pessoa = this.state.pessoa
        let inputErro = this.state.inputErro
        let inputOk = true
        // PESSOA NOVA NUNCA TEM ID, VOCE TEM QUE VERIFICAR PELO CAMPO RESTRITO DO SISTEMA COMO POR EXEMPLO EMAIL


        Object.keys(inputErro).forEach(pKey => {
            inputErro[pKey] = false;

        })

        if (!pessoa.nome) {
            inputErro.nomeInvalido = true
        }

        listaPessoa.forEach(pPessoa => {
            if (pPessoa.email === pessoa.email) {
                inputErro.email = true;
                inputErro.emailExistente = true;
            } else {
                let retorno = this.ValidarEmail(this.state.pessoa.email)

                if (!retorno) {
                    inputErro.email = true
                    inputErro.emailInvalido = true
                }
            }
        })

        if (!pessoa.senha) {
            inputErro.senha = true;
            inputErro.senhaInvalida = true
        } else {
            let retorno = this.validarSenha(this.state.pessoa.senha)

            if (!retorno) {
                inputErro.senha = true;
                inputErro.senhaPequena = true;
            }
        }

        if (!pessoa.situaçao) {
            inputErro.situaçaoInvalida = true
        }

        Object.keys(inputErro).forEach(pKey => {
            if (inputErro[pKey]) {
                inputOk = false;
            }
        });

        this.setState({
            inputErro: inputErro
        })

        if (!inputOk) {
            return;

        } else {
            pessoa.id = listaPessoa.length + 1;

            listaPessoa.push(pessoa)

            this.util.salvarLocalStorage("LISTA_PESSOA", listaPessoa)

            pessoa.dataDeCadastro = this.data.getData

            window.location.href = "/login"
        }



        // if (pessoa.email) {
        //     for (let i = 0; i < listaPessoa.length; i++) {
        //         if (listaPessoa[i].email === pessoa.email) {
        //             inputErro.email = true
        //         }
        //     }
        // } else {
        //     console.log("ok!")
        //     pessoa.id = listaPessoa.length + 1;


        //     listaPessoa.push(pessoa)
        // }


    }

    verificar() {
        console.log(this.state.listaPessoa)
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
                            <p onClick={() => window.location.href = "/login"
                            }>Login</p>
                        </div>
                    </div>
                </header>

                <main>
                    <section className="secLogin">
                        <div className="div1Login">
                            <p><strong>Cadastro</strong></p>
                            <form onSubmit={pEvento => { pEvento.preventDefault(); this.cadastrarPessoa() }}>
                                <div>
                                    <label>Nome</label>
                                    <InputText style={{ width: "100%", marginBottom: 10, borderColor: this.state.inputErro.nomeInvalido && "red" }} onChange={pEvento => this.setState({
                                        pessoa: {
                                            ...this.state.pessoa,
                                            nome: pEvento.target.value
                                        }
                                    })} />
                                    {this.state.inputErro.nomeInvalido && <small style={{ color: "red" }}>Nome Invalido!</small>}


                                    <label>Email</label>
                                    <InputText style={{ width: "100%", marginBottom: 10, borderColor: this.state.inputErro.email && "red" }} onChange={pEvento => this.setState({
                                        pessoa: {
                                            ...this.state.pessoa,
                                            email: pEvento.target.value
                                        }
                                    })} />
                                    {this.state.inputErro.emailInvalido && <small style={{ color: "red" }}>Este email esta Invalido!</small>}
                                    {this.state.inputErro.emailExistente && <small style={{ color: "red" }}>Este ja existe!</small>}


                                    <label>Senha</label>
                                    <InputText style={{ width: "100%", marginBottom: 10, borderColor: this.state.inputErro.senha && "red" }} onChange={pEvento => this.setState({
                                        pessoa: {
                                            ...this.state.pessoa,
                                            senha: pEvento.target.value
                                        }
                                    })} />
                                    {this.state.inputErro.senhaInvalida && <small style={{ color: "red" }}>Nao esqueça da Senha!</small>}
                                    {this.state.inputErro.senhaPequena && <small style={{ color: "red" }}>Senha muito pequena</small>}


                                    <label>Situaçao</label>
                                    <InputText style={{ width: "100%", marginBottom: 10, borderColor: this.state.inputErro.situaçaoInvalida && "red" }} onChange={pEvento => this.setState({
                                        pessoa: {
                                            ...this.state.pessoa,
                                            situaçao: pEvento.target.value
                                        }
                                    })} />
                                    {this.state.inputErro.situaçaoInvalida && <small style={{ color: "red" }}>Selecione uma opção!</small>}

                                </div>
                                <Button type="submit" label="Salvar" style={{ marginTop: 10 }} />
                            </form>

                            <Button label="Verificar" style={{ marginTop: 10 }} onClick={() => this.verificar()} />

                        </div>
                    </section>
                </main>
            </div>
        )
    }
}

// data = new Date()

//     dia = String(data.getDate()).padStart(2, '0')
//     mes = String(data.getMonth() + 1).padStart(2, '0')
//     ano = data.getFullYear()
//     dataAtual = `${dia}/${mes}/${ano}`

//         console.log(dataAtual)