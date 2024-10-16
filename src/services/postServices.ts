import { postofDB } from '../models/post'

export const getEntries = {

    // Obtener todos los post
    getAll: async(page = 1, limit = 10)=>{
        const skip = (page - 1) * limit;
    
        // Realizar la consulta con paginación
        const posts = await postofDB.find()
                                    .skip(skip)
                                    .limit(limit);
    
        // Retornar los usuarios encontrados
        return posts;
    },
    //Buscar post por ID
    findById: async(id:string)=>{
        return await postofDB.findById(id);
    },
    // Crear un nuevo post
    create: async(entry:object)=>{
        return await postofDB.create(entry);
    },
    // Actualizar un post por ID
    update: async(id:string,body:object)=>{
        console.log(body);
        return await postofDB.findByIdAndUpdate(id,body,{$new:true});
    },
    // Eliminar un post por ID
    delete: async(id:string)=>{
        return await postofDB.findByIdAndDelete(id);
    }
}