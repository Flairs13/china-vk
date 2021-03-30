let promise = new Promise(function(resolve, reject) {
    // эта функция выполнится автоматически, при вызове new Promise

    // через 1 секунду сигнализировать, что задача выполнена с результатом "done"
    resolve('done')
});

promise.then((item) => {
    console.log (item)
})