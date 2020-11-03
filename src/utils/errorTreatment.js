/* Função responsável em fazer o tratamento dos erros gerados pelo Sequelize, não disponibilizando
informações privadas, como keys, tables, entre outros. */
export default function treatError(errorCode, uniqueParam) {
    switch (errorCode){
        case '23502':
            return 'Missing parameter.';
        case '23503':
            return "Real estate not found."
        case '23505':
            return `Object with this ${uniqueParam} already exists.`
        case '22P02':
            return 'Invalid(s) parameter(s).'
        default:
            return null
    }
}