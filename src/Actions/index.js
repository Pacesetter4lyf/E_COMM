
export const changeFavor =(favoriteValue, dataPosition)=>{
    return {
        type: "change",
        value: favoriteValue,
        position: dataPosition
    }
}
