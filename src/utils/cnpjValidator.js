import { cnpj } from 'cpf-cnpj-validator';

export default function cnpjValidator(number) {

    if (!cnpj.isValid(number)) return null  

    return cnpj.format(number)
}