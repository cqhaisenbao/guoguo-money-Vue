//文件名以d.ts结尾TS才可以自动找到这个自定义的全局类型

type RecordItem = {
    tags: Tag[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: string;
    id: number;
}

type RootState = {
    recordList: RecordItem[];
    tagList: Tag[];
    tagIncome?: Tag[];
    currentTag?: Tag;
    currentRecord?: RecordItem;
}

type Tag = {
    id: string;
    name: string;
}
// type TagListModel = {
//     data: Tag[];
//     fetch: () => Tag[];
//     create: (name: string) => 'success' | 'duplicated';// 联合类型:成功和重复
//     update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
//     remove: (id: string) => boolean;
//     save: () => void;
// }

// interface Window {
// }
