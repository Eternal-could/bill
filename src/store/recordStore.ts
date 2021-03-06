import clone from '@/lib/clone';
import {RecordItem} from '@/custom';

const localStorageKeyName = 'recordList';

const recordStore = {
    //record store
    recordList: [] as RecordItem[],

    fetchRecords() {
        this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
        return this.recordList;
    },
    createRecord(record: RecordItem) {
        const deepClone: RecordItem = clone(record);
        deepClone.createAt = new Date().toISOString();
        this.recordList?.push(deepClone);
        recordStore.saveRecords();
    },
    saveRecords() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
    }
};
recordStore.fetchRecords();
export default recordStore;