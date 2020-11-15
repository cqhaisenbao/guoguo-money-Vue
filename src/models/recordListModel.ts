import {clone} from '@/lib/clone';

const localStorageKeyName = 'recordList';

const recordListModel = {
    data: [] as RecordItem[],
    create(record: RecordItem) {
        // 深拷贝：先变成字符串，再变成对象，这样就不是同一个内存地址了
        const record2: RecordItem = clone(record);
        record2.createdAt = new Date();
        this.data.push(record2);
    },
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
        return this.data;
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
    // clear() {
    //     localStorage.clear();
    // }
};

export {recordListModel};