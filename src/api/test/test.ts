import axios from "axios";

async function test(): Promise<any> {
    console.log('refete');
    const {data} = await axios.get("/api/test");
    return data;
}

async function testMutate(testData: any): Promise<any> {
    const {data} = await axios.post("/api/test-mut", testData)
    return data
}   

export {test, testMutate}