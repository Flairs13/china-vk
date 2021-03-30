export const createDate = () => {
    const newData = new Date()
    const hours = newData.getHours() < 10 ? '0' +  newData.getHours() : newData.getHours()
    const minutes = newData.getMinutes() < 10 ? '0' +  newData.getMinutes() : newData.getMinutes()
    const seconds = newData.getSeconds() < 10 ? '0' +  newData.getSeconds() : newData.getSeconds();


    return  hours + ':' + minutes + ':' + seconds;



};

