const carroService = require("../services/carroService");


module.exports = {
    buscarTodos: async (req, res) => {
        let json = {error: '', result:[]};

        let carros = await carroService.buscarTodos();

        if(carros.length > 0)
            for(let carro in carros) {
                json.result.push(
                    {
                    codigo: carros[carro].codigo,
                    descricao: carros[carro].modelo,
                    }
                );
            }
        else
            json.error = 'não existem carros no banco de dados';

        res.json(json);
    },

    buscarCarro: async(req, res) => {
        let json = {error:'', result:{}};

        let codigo = req.params.codigo;

        let carro = await carroService.buscarCarro(codigo);

        if(carro) 
            json.result = carro;
        else
            json.error = 'carro não encontrado'

        res.json(json);
    },

    criarCarro: async(req, res) => {
        let json = {error: '', result: {}};

        let carro = {codigo: null, modelo: req.body.modelo, placa:req.body.placa}

        if(carro.modelo && carro.placa) {
            let codigo = await carroService.criarCarro(carro.modelo, carro.placa);

            carro.codigo = codigo;

            json.result = carro;
        } else {
            json.error = 'Requisição falhou :(';
        }

        res.json(json);
    },
 
    editarCarro: async(req, res) => {
        let json = {error: '', result: {}};

        let carro = {codigo: req.body.codigo, modelo: req.body.modelo, placa:req.body.placa};

        if(carro.codigo && carro.modelo && carro.placa) {
            let atualizou = await carroService.editarCarro(carro);

            if(atualizou)
                json.result = carro;
            else
                json.error = 'Erro ao atualizar os registros';
        }

        res.json(json);
    },

    excluirCarro: async(req, res) => {
        let json = {error: '', result: {}};

        let codigo = req.body.codigo;

        if(codigo) {
            console.log(codigo)
            let deletou = await carroService.excluirCarro(codigo);

            if(deletou)
                json.result = 'carro deletado com sucesso';
            else
                json.error = 'Erro ao deletar registro';
        }

        res.json(json);
    }
}
