// Kubernetes Secrets are passed Base64 encoded, this methods decodes Base64
const convertFromBase64 = (base64string) => {
    console.log("Stirng in method", base64string)
    //let buff = Buffer.from(base64string, 'base64');
    //return buff.toString('ascii');
    return base64string
    
    
}

module.exports = {convertFromBase64}