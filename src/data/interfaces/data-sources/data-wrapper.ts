export interface DatabaseWrapper { 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    find(query: object): Promise<any[]>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    insertOne(doc: any): Promise<any> 
}   