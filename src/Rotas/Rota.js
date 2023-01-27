import { Component } from "react";
import Cadastro from "../Pages/Cadastro";
import Login from "../Pages/Login";
import Menu from "../Pages/Menu"
import Perfil from "../Pages/Perfil";


class RotaComponente extends Component {
    render() {
        return window.location.pathname === this.props.caminho && this.props.componente
    }
}

export default class Rota extends Component {
    componentDidMount() {
        this.iniciar()
    }

    iniciar() {
        if (window.location.pathname === "/") {
            window.location.href = "/login"
        }
    }

    render() {
        return <>
            <RotaComponente caminho="/login" componente={<Login />} />
            <RotaComponente caminho="/perfil" componente={<Perfil />} />
            <RotaComponente caminho="/menu" componente={<Menu />} />
            <RotaComponente caminho="/cadastro" componente={<Cadastro />} />
        </>
    }
}