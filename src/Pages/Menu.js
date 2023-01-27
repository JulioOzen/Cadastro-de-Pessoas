import { Button } from "primereact/button";
import { Component } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Listar from "../Service/Listar";
import Util from "../util/Util";
import Pessoa from "../Service/Pessoa";
import Perfil from "../Pages/Perfil";
// import { InputText } from 'primereact/inputtext';
// import { Dialog } from 'primereact/dialog';
// import { Checkbox } from 'primereact/checkbox';


export default class Menu extends Component {
    util = new Util()
    buscarLocalStorage = new Listar()

    state = {
        pessoa: new Pessoa(),
        listaPessoa: [],
        displayBasic: false,

    }

    componentDidMount() {
        this.iniciar()
    }

    async iniciar() {
        let listaPessoa = []

        listaPessoa = await this.buscarLocalStorage.listar()

        if (!listaPessoa) {
            listaPessoa = []
        }

        this.setState({
            listaPessoa: listaPessoa
        })
        return listaPessoa;
    }

    // pessoaDetalhe() {
    //     window.location.href = "/perfil"
    //     return (
    //         <Perfil
    //             setState={(pState) => this.setState(pState)}
    //         />
    //     )
    // }

    pessoaDetalhe(pPessoa) {

        this.setState({
            displayBasic: true,
            pessoa: pPessoa
        })
    }

    onHide() {
        this.setState({
            displayBasic: false
        })
    }

    salvarPerfil() {
        let listaPessoa = this.state.listaPessoa
        let pessoa = this.state.pessoa

        listaPessoa.push(pessoa)

        this.util.salvarLocalStorage("LISTA_PESSOA", listaPessoa)
    }

    excluir(pItem) {
        let listaPessoa = this.state.listaPessoa


        listaPessoa = listaPessoa.filter(pfUsuario => pfUsuario.id !== pItem.id);

        this.setState({
            listaPessoa: listaPessoa,
        });

        this.util.salvarLocalStorage("LISTA_PESSOA", listaPessoa);

    }

    verificar(pEvento) {
        let listaPessoa = pEvento.value


        console.log(listaPessoa)
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
                            <p onClick={() => window.location.href = "/cadastro"
                            }>Cadastre-se</p >
                        </div>
                    </div>
                </header>

                <main>
                    {(this.state.displayBasic) ?
                        <Perfil
                            setState={(pState) => this.setState(pState)}
                            pessoa={JSON.stringify(this.state.pessoa)}
                            listaPessoa={JSON.stringify(this.state.listaPessoa)}
                        />
                        :
                        <section style={{ width: "100%" }}>
                            <div>
                                <DataTable
                                    // onSelectionChange={(pEvento) => this.verificar(pEvento)}
                                    // onSelectionAllChange={(e) => this.setState({
                                    //     listaPessoa: e.value
                                    // })}
                                    responsiveLayout="scroll"
                                    selectionMode="single"
                                    value={this.state.listaPessoa}>
                                    <Column field="nome" header="Nome" />
                                    <Column field="email" header="Email" />
                                    <Column field="situaçao" header="Situaçao" />
                                    <Column field="detalhes" header="Detalhes" body={(pItem) => <Button icon="pi pi-user" onClick={() => this.pessoaDetalhe(pItem)} style={{ borderRadius: 30, }}></Button>} />
                                    <Column field="excluir" header="Excluir" body={(pItem) => <Button icon="pi pi-times" onClick={() => this.excluir(pItem)} style={{ borderRadius: 30, backgroundColor: "red", color: "white", borderColor: "red" }}></Button>} />
                                </DataTable>
                                <Button onClick={() => this.verificar()}></Button>
                            </div>
                        </section>}
                </main>
            </div>

        )
    }
}

//  <Dialog header="Detalhes do Usuario" visible={this.state.displayBasic} breakpoints={{ '960px': '75vw' }} style={{ width: '90vh', height: 'auto' }} onHide={() => this.onHide('displayBasic')}>
//                                 <h1>Seu ID:{this.state.pessoa.id}</h1>
//                                 <div >
//                                     <form style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }} onSubmit={pEvento => { pEvento.preventDefault(); this.salvarPerfil() }} >
//                                         <div>
//                                             <label>Nome</label>
//                                             <p className='p1'>{this.state.pessoa.nome}</p>
//                                             <InputText style={{ width: "100%" }} placeholder={'Seu nome'} onChange={pEvento => this.setState({
//                                                 pessoa: {
//                                                     ...this.state.pessoa,
//                                                     nome: pEvento.target.value
//                                                 }
//                                             })} />
//                                         </div>
//                                         <div>
//                                             <label>Email</label>
//                                             <p className='p1'>{this.state.pessoa.email}</p>
//                                             <InputText style={{ width: "100%" }} placeholder={'Seu email'} onChange={pEvento => this.setState({
//                                                 pessoa: {
//                                                     ...this.state.pessoa,
//                                                     email: pEvento.target.value
//                                                 }
//                                             })} />
//                                         </div>

//                                         <div>
//                                             <label>Senha</label>
//                                             <p className='p1'>{this.state.pessoa.senha}</p>
//                                             <InputText style={{ width: "100%" }} placeholder={'Sua senha'} onChange={pEvento => this.setState({
//                                                 pessoa: {
//                                                     ...this.state.pessoa,
//                                                     senha: pEvento.target.value
//                                                 }
//                                             })} />
//                                         </div>

//                                         <div>
//                                             <label>Situaçao</label>
//                                             <p className='p2'>{this.state.pessoa.situaçao}</p>
//                                             <InputText style={{ width: "20%", textAlign: "center" }} onChange={pEvento => this.setState({
//                                                 pessoa: {
//                                                     ...this.state.pessoa,
//                                                     situaçao: pEvento.target.value
//                                                 }
//                                             })} />
//                                         </div>
//                                         <div>

//                                         </div>
//                                         <div style={{ display: "flex", justifyContent: "right", alignItems: "end" }}>
//                                             <Button type="Submit">Salvar dados</Button>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </Dialog>
//                             : null}