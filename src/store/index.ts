import Vue from 'vue';
import Vuex from 'vuex';
import {clone} from '@/lib/clone';
import {createId} from '@/lib/createId';
import router from '@/router';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        recordList: [],
        tagList: [],
        currentTag: undefined,
        currentRecord: undefined
    } as RootState,
    mutations: {
        setCurrentTag(state, id: string) {
            state.currentTag = state.tagList.filter(t => t.id === id)[0];
        },
        setCurrentRecord(state, id: number) {
            state.currentRecord = state.recordList.filter(t => t.id === id)[0];
        },
        //当方法需要多个外部参数时，写成一个对象payload:{}
        //eslint-disable-next-line
        updateTag(state, payload: { id: string, name: string }) {
            const {id, name} = payload;
            const idList = state.tagList.map(item => item.id);
            if (idList.indexOf(id) >= 0) {
                const names = state.tagList.map(item => item.name);
                if (names.indexOf(name) >= 0) {
                    window.alert('标签名重复了');
                } else {
                    const tag = state.tagList.filter(item => item.id === id)[0];
                    tag.name = name;
                    store.commit('saveTags');
                }
            }
        },
        removeTag(state, id: string) {
            let index = -1;
            for (let i = 0; i < state.tagList.length; i++) {
                if (state.tagList[i].id === id) {
                    index = i;
                    break;
                }
            }
            if (index >= 0) {
                state.tagList.splice(index, 1);
                store.commit('saveTags');
                router.back();
            } else {
                window.alert('删除失败');
            }
        },
        removeRecord(state, id: number) {
            console.log(id);
            let index = -1;
            for (let i = 0; i < state.recordList.length; i++) {
                if (state.recordList[i].id === id) {
                    index = i;
                    break;
                }
            }
            if (index >= 0) {
                state.recordList.splice(index, 1);
                store.commit('saveRecords');
                router.back();
            } else {
                window.alert('删除失败');
            }
        },
        fetchRecords(state) {
            state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
        },
        createRecord(state, record: RecordItem) {
            const record2 = clone(record);
            state.recordList.push(record2);
            store.commit('saveRecords');
        },
        saveRecords(state) {
            window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
        },

        fetchTags(state) {
            state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
            if (!state.tagList || state.tagList.length === 0) {
                store.commit('createTag', '衣服鞋包');
                store.commit('createTag', '吃饭');
                store.commit('createTag', '交通');
                store.commit('createTag', '日用品');
                store.commit('createTag', '住房缴费');
                store.commit('createTag', '水电气');
                store.commit('createTag', '娱乐休闲');
            }
        },
        createTag(state, name: string) {
            const names = state.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                window.alert('标签名重复了');
            }
            const id = createId().toString();
            state.tagList.push({id, name: name});
            store.commit('saveTags');
            // window.alert('添加成功');
        },
        saveTags(state) {
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
        },
    }
});

export {store};