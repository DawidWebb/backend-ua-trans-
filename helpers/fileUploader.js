const FTPClient = require("ftp");
const fs = require("fs");
const HOST = process.env.HOST;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;

const ftp_client = new FTPClient();

const ftpConfig = {
  host: `${HOST}`,
  port: 21,
  user: `${USER}`,
  password: `${PASSWORD}`,
};

exports.uploadFile = (fileName) => {
  ftp_client.connect(ftpConfig);

  ftp_client.on("ready", function () {
    // ftp_client.list(function (err, list) {
    //   if (err) throw err;
    //   console.dir(list);
    //   ftp_client.end();
    // });

    ftp_client.put(
      `/controllers/uploads/`,
      `${fileName}`,

      function (err) {
        if (err) {
          console.log("ERROR!!!", err);
          return err;
        }

        ftp_client.end();
        const uploaded = true;
        return uploaded;
      }
    );
  });
};
