import {clone} from '@/lib/clone';

const localStorageKeyName = 'recordList';

const recordStore = {
    recordList: [] as RecordItem[],
    fetchRecords() {
        this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
        return this.recordList;
    },
    saveRecords() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
    },
    createRecord(record: RecordItem) {
        const record2: RecordItem = clone(record);
        record2.createdAt = new Date();
        this.recordList && this.recordList.push(record2);
        recordStore.saveRecords();
    },
};

//表示只要import recordStore 就会直接调用这个函数，后面就不会调用了
recordStore.fetchRecords();

export default recordStore;