import {createId} from '@/lib/createId';

const localStorageKeyName = 'tagList';

const tagStore = {
    tagList: [] as Tag[],
};

export default tagStore;