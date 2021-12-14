// const Client = require("node-rest-client").Client;
// const client = new Client({
//   mimetypes: {
//     json: [
//       "application/json",
//       "application/json;charset=utf-8",
//       "text/javascript;charset=utf-8",
//       "application/vnd.com.dominos.ecommerce.payment.gateway.transaction+json;version=1.0"
//     ]
//   }
// });

// class APIUtils{
//   constructor(){

//   }

//   static async getRequest(requestURL, requestHeaders){
//     let statusCode;
//     return new Promise((fulfill, reject) => {
//       return client.get(requestURL, requestHeaders, (data, response) => {
//         statusCode = response.statusCode;
//         Report.addAttachment("GET API",
//           `URL: ${requestURL}\n
//          RequestHeaders: ${JSON.stringify(requestHeaders)}\n
//          ResponseBody: ${JSON.stringify(data)}`
//         );
//         statusCode === 400 || statusCode === 500
//           ? reject(new Error(this.isJson ? JSON.stringify(data) : data))
//           : fulfill(data);
//       });
//     });
//   }

//   static async postRequest(requestURL, requestHeaders){
//     let statusCode;
//     return new Promise((fulfill, reject) => {
//       return client.post(requestURL, requestHeaders, (data, response) => {
//         statusCode = response.statusCode;
//         Report.addAttachment("POST API",
//           `URL: ${requestURL}\n
//          RequestHeaders: ${JSON.stringify(requestHeaders)}\n
//          ResponseBody: ${JSON.stringify(data)}`
//         );
//         statusCode === 400 || statusCode === 500
//           ? reject(new Error(this.isJson ? JSON.stringify(data) : data))
//           : fulfill(data);
//       });
//     });
//   }

//   static async deleteRequest(requestURL, requestHeaders){
//     let statusCode;
//     return new Promise((fulfill, reject) => {
//       return client.delete(requestURL, requestHeaders, (data, response) => {
//         statusCode = response.statusCode;
//         Report.addAttachment("DELETE API",
//           `URL: ${requestURL}\n
//          RequestHeaders: ${JSON.stringify(requestHeaders)}\n
//          ResponseBody: ${JSON.stringify(data)}`
//         );
//         statusCode === 400 || statusCode === 500
//           ? reject(new Error(this.isJson ? JSON.stringify(data) : data))
//           : fulfill(data);
//       });
//     });
//   }
// }

// module.exports = APIUtils;
