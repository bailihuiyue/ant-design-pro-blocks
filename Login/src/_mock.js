import { Request, Response } from 'express';
// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  'POST /auth/v1/login': (req, res) => {
    const { password, username } = req.body;
    if (password === 'admin' && username === 'admin') {
      res.send({
        "code": 100000,
        "subCode": null,
        "message": "successful",
        "value": {
          "token": "367861b39f969a598ad6a93adda4abe9",
          "username": "yang.li3",
          "userId": 99291359,
          "roleInfoList": [{ "title": "DM_Admin", "code": "DM_Admin" }]
        }
      });
    } else {
      res.send({
        "code": 500001,
        "subCode": 'username.password.mismatch',
        "message": "username and password don't match",
        "value": null
      });
    }
  }
};
