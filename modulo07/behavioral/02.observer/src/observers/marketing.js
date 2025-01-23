export default class Marketing {
    update({ id, userName }) {
        // importante lembrar que o [update] é responsável por gerenciar seus erros/exceptions
        // não se deve ter await no notify pq sua responsabilidade é apenas emitir eventos
        console.log(`[${id}]: [marketing] will send a welcome email to [${userName}]`)
    }
}