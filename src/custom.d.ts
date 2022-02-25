type RootState = {
    recordList: RecordItem[],
    tagList: Tag[],
    currentTag?: Tag
}

type RecordItem = {
    tags: Tag[],
    notes: string,
    type: string,
    amount: number,
    createAt?: string
}

type Tag = {
    id: string,
    name: string
}
type TagListModel = {
    data: Tag[],
    fetch: () => Tag[],
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
    create: (name: string) => 'success' | 'duplicated' // 联合类型
    remove: (id: string) => boolean
    save: () => void
}

