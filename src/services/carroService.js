const db = require("../db");

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM carros', (error, result) => {
                if(error) {
                    rejeitado(error);
                    return;
                }
                aceito(result);
            })
        })
    },

    buscarCarro: (codigo) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM carros WHERE codigo = ?', [codigo], (error, result) => {
                if(error) {
                    rejeitado(error);
                    return;
                }
                if(result.length > 0)
                    aceito(result[0]);
                else 
                    aceito(false);
            })
        })
    },

    criarCarro: (modelo, placa) => {
        return new Promise((aceito, rejeitado) => {
            db.query('INSERT INTO carros(modelo, placa) VALUES(?, ?)', [modelo, placa], (error, result) => {
                if(error) {
                    rejeitado(error)
                    return;
                }
                aceito(result.insertId);
            })
        })
    },

    editarCarro: (carro) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE carros SET modelo = ?, placa = ? WHERE codigo = ?',
                     [carro.modelo, carro.placa, carro.codigo], 
                     (error, result) => {
                        if(error) {
                            rejeitado(error);
                            return
                        }
                        else {
                            if(result.changedRows > 0)
                                aceito(true);
                            else
                                aceito(false);
                        }
                     })
        })
    },

    excluirCarro: (codigo) => {
        return new Promise((aceito, rejeitado) => {
            db.query('DELETE FROM carros WHERE codigo = ?', [codigo], (error, result) => {
                if(error) {
                    rejeitado(error);
                    return
                }
                if(result.affectedRows == 1)
                    aceito(true);
                else
                    aceito(false);
            })
        })
    }
}