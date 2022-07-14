const SspiClientApi = require('@sregger/sspi-client').SspiClientApi;
const Fqdn = require('@sregger/sspi-client').Fqdn;
const MakeSpn = require('@sregger/sspi-client').MakeSpn;

class IntegratedResponsePayload {
  serverName: string;
  constructor(serverName: string) {
    this.serverName = serverName;
  }

  async createResponse (ntlmpacketBuffer:any, sspiClient:any) {
    const clientResponse:Buffer = await new Promise((resolve, reject) => {
        sspiClient.getNextBlob(ntlmpacketBuffer, 0, ntlmpacketBuffer.length, (clientResponse:Buffer, isDone:boolean, errorCode:any, errorString:string) => {
            console.log(clientResponse);
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
}

export default IntegratedResponsePayload;
module.exports = IntegratedResponsePayload;
