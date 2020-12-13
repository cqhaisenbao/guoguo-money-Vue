function setName(tag: Tag) {
    if (tag.name.toString().indexOf('吃') >= 0) {
        return '吃饭';
    } else if (tag.name.toString().indexOf('衣') >= 0) {
        return '衣服鞋包';
    } else if (tag.name.toString().indexOf('交通') >= 0) {
        return '交通';
    } else if (tag.name.toString().indexOf('日用品') >= 0) {
        return '日用品';
    } else if (tag.name.toString().indexOf('住房') >= 0) {
        return '住房缴费';
    } else if (tag.name.toString().indexOf('水') >= 0) {
        return '水电气';
    } else if (tag.name.toString().indexOf('娱乐') >= 0) {
        return '娱乐休闲';
    } else if (tag.name.toString().indexOf('人情往来') >= 0) {
        return '人情往来';
    } else if (tag.name.toString().indexOf('编辑标签') >= 0) {
        return '编辑';
    } else {
        return '自定义';
    }
}

export {setName}