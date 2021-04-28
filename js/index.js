$(() => {
    let promise = $.get("http://localhost:8000/credit/1");
    promise.done((json) => {
        console.dir(json);
    });
})