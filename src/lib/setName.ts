function setName(tag: Tag) {
    if (tag.name.toString().indexOf('吃') >= 0) {
        return '吃饭';
    }
}

export {setName}