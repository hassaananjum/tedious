const SspiClientApi = require('@sregger/sspi-client').SspiClientApi;
const Fqdn = require('@sregger/sspi-client').Fqdn;
const MakeSpn = require('@sregger/sspi-client').MakeSpn;

export async function createIntegratedRequest(sspiClient:any){
    const clientResponse:Buffer = await new Promise((resolve, reject) => {
        sspiClient.getNextBlob(null, 0, 0, (clientResponse:Buffer, isDone:boolean, errorCode:any, errorString:string) => {
            console.log(clientResponse, clientResponse.length);
            console.log(isDone);
            console.log(errorCode);
            console.log(errorString);
            if (errorCode) {
                reject(errorCode);
            } else {
                resolve(clientResponse)
            }
        });
    });
    return clientResponse;
}
