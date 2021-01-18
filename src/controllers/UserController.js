const { addDatabaseUser, selectDatabaseUser, getDatabaseAllUsers, updateDatabaseUser, deleteDatabaseUser } = require('../database/index')

async function createUser(payload) {
    try {
        if (!payload.nome || !payload.sobrenome || !payload.idade || !payload.cidade || !payload.estado) {
            return {
                status: 400,
                message: "Não foi possível criar o usuário"
            }
        }
    
        await addDatabaseUser(payload.nome, payload.sobrenome, payload.idade, payload.cidade, payload.estado)
        return { status: 201, message: "Usuário cadastrado com sucesso!" }
    } catch(error) {
        console.log(error)
        return { status: 500, message: "Criação de usuário falhou." }
    }
}

async function getUserById(id) {
    try {
        if (!id) {
            return {
                status: 400,
                message: "Não foi possível encontrar o usuário"
            }
        }
        const user = await selectDatabaseUser(id)
        return { status: 201, message: user }
    } catch(error) {
        console.log(error)
        return { status: 500, message: "Ocorreu algum erro e não foi possível encontrar o usuário." }
    }
}

async function getAllUsers() {
    try {
        const user = await getDatabaseAllUsers()
        return { status: 201, message: user }
    } catch(error) {
        console.log(error)
        return { status: 500, message: "Criação de usuário falhou." }
    }
}

async function updateUser(id, payload) {
    try {
        if (!id) {
            return {
                status: 400,
                message: "Não foi possível atualizar o usuário"
            }
        }
        await updateDatabaseUser(id, payload)
        return { status: 200, message: "Usuário atualizado com sucesso!" }
    } catch(error) {
        console.log(error)
        return { status: 500, message: "Ocorreu algum erro e não foi possível deletar o usuário." }
    }
}

async function deleteUser(id) {
    try {
        if (!id) {
            return {
                status: 400,
                message: "Não foi possível deletar o usuário"
            }
        }
        await deleteDatabaseUser(id)
        return { status: 200, message: "Usuário deletado com sucesso!" }
    } catch(error) {
        console.log(error)
        return { status: 500, message: "Ocorreu algum erro e não foi possível deletar o usuário." }
    }
}

module.exports = { createUser, getUserById, getAllUsers, updateUser, deleteUser }