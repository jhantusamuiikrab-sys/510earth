import soap from "soap";

const WSDL_URL = "https://sms.pafpay.in/webservice.asmx?WSDL";

export const sendSMS = async ({
    reqbody,
    sendsmsnum,
    username,
    password,
    otp,
    ivrnum,
    ivrid
}) => {
    try {        
        const client = await soap.createClientAsync(WSDL_URL);
        
        const args = {
            reqbody,
            sendsmsnum,
            username,
            password,
            otp,
            ivrnum,
            ivrid,
        };

        const [result, rawResponse, soapHeader, rawRequest] =
            await client.sendsmsAsync(args);
        
        return {
            success: true,
            data: result,
        };
    } catch (error) {
        console.error("SOAP Error:", error);

        return {
            success: false,
            message: error.message,
        };
    }
};