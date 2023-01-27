import Util from "../util/Util";

export default class Listar {
    util = new Util()

    async listar() {
        let buscar = await this.util.buscarLocalStorage("LISTA_PESSOA")
        return buscar
    }
}

// Listar => PessoaService e deveria estar dentro de uma pasta junto com o objeto Pessoa