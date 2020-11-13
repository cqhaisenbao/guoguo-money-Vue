//文件名以d.ts结尾TS才可以自动找到这个自定义的全局类型

type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: Date;
}