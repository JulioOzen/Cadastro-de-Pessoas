import { Button } from "primereact/button";
import { Component } from "react";
import Pessoa from "../Service/Pessoa";
import { InputText } from 'primereact/inputtext';
import Util from "../util/Util";
import GetData from "../util/getData";

export default class Perfil extends Component {
    data = new GetData()
    util = new Util()

    state = {
        pessoa: new Pessoa(),
        listaPessoa: [],
        displayBasic: "",
    }

    componentDidMount() {
        this.iniciar()
    }

    async iniciar() {
        let pessoa = await JSON.parse(this.props.pessoa)
        let listaPessoa = await JSON.parse(this.props.listaPessoa)
        let displayBasic = this.props.displayBasic

        this.setState({
            pessoa: pessoa,
            listaPessoa: listaPessoa,
            displayBasic: displayBasic
        })
    }

    salvar() {
        let listaPessoa = this.state.listaPessoa
        let pessoa = this.state.pessoa

        if (pessoa.id) {
            for (let i = 0; i < listaPessoa.length; i++) {
                if (listaPessoa[i].id === pessoa.id) {
                    listaPessoa[i] = pessoa;
                }


            }
        } else {
            pessoa.id = listaPessoa.length + 1;

            listaPessoa.push(pessoa)
        }

        this.util.salvarLocalStorage('LISTA_PESSOA', listaPessoa)
    }

    voltar() {
        this.props.setState({
            displayBasic: false
        })
    }

    verificar() {
        console.log(this.state.pessoa)
    }


    render() {
        return (
            <div>

                <main style={{ display: "flex", justifyContent: "center" }}>
                    <section style={{ width: "60%", padding: 10 }}>
                        <div>
                            <h1>Perfil Do usuario: {this.state.pessoa.nome}</h1>
                            <p>Cadastrado no dia: {this.state.pessoa.dataDeCadastro}</p>
                            <p style={{ fontSize: "20px", borderBottom: "1px solid black" }}><strong>Seu ID: {this.state.pessoa.id}</strong></p>
                        </div>
                        <div>
                            <form onSubmit={pEvento => { pEvento.preventDefault(); this.salvar() }}>
                                <div>
                                    <label>Nome</label>
                                    <InputText style={{ width: "100%", marginBottom: 10 }} onChange={pEvento => this.setState({
                                        pessoa: {
                                            ...this.state.pessoa,
                                            nome: pEvento.target.value
                                        }
                                    })} />

                                    <label>Email</label>
                                    <InputText style={{ width: "100%", marginBottom: 10 }} onChange={pEvento => this.setState({
                                        pessoa: {
                                            ...this.state.pessoa,
                                            email: pEvento.target.value
                                        }
                                    })} />

                                    <label>Senha</label>
                                    <InputText style={{ width: "100%", marginBottom: 10 }} onChange={pEvento => this.setState({
                                        pessoa: {
                                            ...this.state.pessoa,
                                            senha: pEvento.target.value
                                        }
                                    })} />

                                    <label>Situaçao</label>
                                    <InputText style={{ width: "100%", marginBottom: 10 }} onChange={pEvento => this.setState({
                                        pessoa: {
                                            ...this.state.pessoa,
                                            situaçao: pEvento.target.value
                                        }
                                    })} />
                                </div>
                                <Button type="submit">Salvar</Button>
                                <Button onClick={() => this.voltar()} style={{ marginLeft: 20 }}>Voltar</Button>
                            </form>
                        </div>
                    </section >
                </main >
                <Button onClick={() => this.verificar()}>Verificar</Button>
            </div >
        )
    }
}