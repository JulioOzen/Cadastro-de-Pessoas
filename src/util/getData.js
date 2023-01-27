export default class GetData {

    data = new Date()

    dia = String(this.data.getDate()).padStart(2, '0')

    mes = String(this.data.getMonth() + 1).padStart(2, '0')

    ano = this.data.getFullYear()

    getData = `${this.dia}/${this.mes}/${this.ano}`

}

// USAR METODO new Date().toLocaleDateString();