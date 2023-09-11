import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const taskController = {
    getAll: async (req, res) => {
        const tasks = await prisma.tasks.findMany({where: {isCompleted: false, isDeleted: false}});
        if(!tasks.length){
            return res.status(200).json({status: "OK", data: {msg: "No hay tareas que mostrar"}});
        }
        return res.status(200).json({status: "OK", data: {tasks}});
    },
    get: async (req, res) => {
        const {id} = req.params;
        const task = await prisma.tasks.findMany({where: {id: parseInt(id), isDeleted: false, isCompleted: false}});
        if(!task.length){
            return res.status(400).json({status: "FAILED", data: {error: `No se encontró la tarea con el id ${id}`}});
        }
        return res.status(200).json({status: "OK", data: {task}});
    },
    create: async (req, res) => {
        const {name} = req.body;
        if(!name){
            return res.status(400).json({status: "FAILED", data: {error: "Se esperaba recibir un nombre"}});
        }
        let task = await prisma.tasks.findMany({where: {name: name, isCompleted: false, isDeleted: false}});
        if(!task.length){
            task = await prisma.tasks.create({data:{name: name}});
            return res.status(201).json({status: "OK", data: {task}});
        }
        return res.status(400).json({status: "FAILED", data: {error: "Esa tarea ya existe"}});
    },
    update: async (req, res) => {
        const {id} = req.params;
        let task = await prisma.tasks.findMany({where: {id: parseInt(id), isCompleted: false, isDeleted: false}});
        if(!task.length){
            return res.status(200).json({status: "FAILED", data: {error: `No existe la tarea con el id ${id}`}});
        }
        const {name} = req.body;
        if(!name){
            return res.status(400).json({status: "FAILED", data: {error: "Se esperaba un nombre"}});
        }
        task = await prisma.tasks.update({where: {id: parseInt(id), isCompleted: false, isDeleted: false}, data: {name: name}});
        return res.status(200).json({status: "OK", data: {task}});
    },
    delete: async (req, res) => {
        const {id} = req.params;
        let task = await prisma.tasks.findMany({where: {id: parseInt(id), isDeleted: false}});
        if(!task.length){
            return res.status(400).json({status: "FAILED", data: {error: `No se encontró la tarea con el id ${id}`}});
        }
        task = await prisma.tasks.update({where: {id: parseInt(id)}, data: {isDeleted: true}});
        return res.status(200).json({status: "OK", data:{msg: `Tarea elimina con éxito`}});
    }
}