// Kubernetes Secrets are passed Base64 encoded, this methods decodes Base64
const convertFromBase64 = (base64string) => {
    // Checks if string is actually base64 encoded
    if (Buffer.from(base64string, 'base64').toString('base64') === str){
        let buff = Buffer.from(base64string, 'base64');
        return buff.toString('ascii');
    }
    else{
        return base64string
    }
    
}

module.exports = {convertFromBase64}