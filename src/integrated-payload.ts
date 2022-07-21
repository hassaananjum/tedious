
class IntegratedResponsePayload {
  serverName: string;
  constructor(serverName: string) {
    this.serverName = serverName;
  }

  async createResponse (ntlmpacketBuffer:any, sspiClient:any) {
    const clientResponse:Buffer = await new Promise((resolve, reject) => {
        sspiClient.getNextBlob(ntlmpacketBuffer, 0, ntlmpacketBuffer.length, (clientResponse:Buffer, isDone:boolean, errorCode:any, errorString:string) => {
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
