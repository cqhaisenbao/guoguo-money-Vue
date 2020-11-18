//data什么类型返回值什么类型
function clone<X>(data: X): X {
    return JSON.parse(JSON.stringify(data));
}

export {clone};