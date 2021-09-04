// export function getGameById(id, lista){
//     return lista.filter((game) => game.id === id)[0]
    
// }

export function getIndexById(id, lista){
    return lista.findIndex((game) => game.id === id)
}