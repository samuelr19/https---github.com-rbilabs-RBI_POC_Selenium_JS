const { mkdirSync } = require('fs');
const Imap = require('imap'), inspect = require('util').inspect;
const { reverse } = require('lodash');


class GmailHelper{

    async readMails(email, password){

        var messages = [];
        var mailServer1;
        mailServer1 = new Imap({
            user: email,
            password: password,
            host: 'imap.gmail.com',
            port: 993,
            tls: true,
            tlsOptions: {
                rejectUnauthorized: false
            },
            authTimeout: 120000
            }).once('error', function (err) {
            console.log('Source Server Error:- ', err);
            });

        
        mailServer1.once('ready', function () {
            mailServer1.openBox('INBOX', true, function (err, box) {
                if (err) throw err;

                mailServer1.search(["UNSEEN",["SUBJECT", "login code"]], function(error, searchResults) {

                let f = mailServer1.fetch(searchResults, {
                    bodies: 'HEADER.FIELDS (SUBJECT)',
                    markSeen : true,
                    struct: true,
                    reverse : false
                    
                });
                f.on('message', function (msg, seqno) {
                    msg.on('body', function (stream, info) {
                        let buffer = '';
                
                        stream.on('data', function (chunk) {
                            buffer += chunk.toString('utf8');
                        });
                
                        stream.once('end', function () {
                            messages.push(buffer)
                        });
                
                    });
                });
                });
                
                });
            });
            mailServer1.connect();
            await new Promise(r => setTimeout(r, 10000));
            return messages;
};

    async getOtpFromGmail(email, password){
        var mails = []
        for(var i=1;i<=5;i++){
            try {
                if (mails.length == 0)
            {
                await new Promise(r => setTimeout(r, 2000));
                mails = await this.readMails(email, password);
            }
            else{
                break;
            }
            } catch (error) {
                console.log("*****"+error)
            }
        }

        var latestMailIndex = mails.length
        var latestMail = mails[latestMailIndex-1]
        var otp = latestMail.split(' ')[1]
        return otp
    }
}

module.exports=GmailHelper;

