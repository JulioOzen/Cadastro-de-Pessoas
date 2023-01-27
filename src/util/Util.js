export default class Util {
    salvarLocalStorage(pCampo, pValor) {
        window.localStorage.setItem(pCampo, JSON.stringify(pValor));
    }

    async buscarLocalStorage(pCampo) {
        let retorno = window.localStorage.getItem(pCampo);
        retorno = await JSON.parse(retorno);
        return retorno;
    }
}