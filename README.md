## 專案介紹
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9ca0d5d6-a6d8-4a07-bcba-432e47d901de/%E6%9C%AA%E5%91%BD%E5%90%8D.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220914%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220914T084846Z&X-Amz-Expires=86400&X-Amz-Signature=068fafdb083d0b2c390de4a574ae42873a2a3d1a95c19cc8ee8f4d104cf86bcc&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22%25E6%259C%25AA%25E5%2591%25BD%25E5%2590%258D.png%22&x-id=GetObject)


為畫面參考OpenSea的簡易NFT販售平台，有基本功能登入註冊及購物車
前端框架為React，並使用node+Express做為後端Server，server端口為5000port，資料庫使用MySQL

## 啟動方式

1.由分支master/dev clone下來後，分別cd至兩個資料夾：frontend,backend，執行npm install

2.在backend資料夾根目錄建立.env檔案，並在單引號內填入本機資料庫的設定以及前端地址（ex:3000）：
MYSQL_HOST = ''
MYSQL_USER = ''
MYSQL_PASSWORD = ''
MYSQL_DB = ''
CORS=''


3.在frontend資料夾根目錄建立.env檔案，並在單引號內填入欲連線port（ex:3000）的設定：
FRONT_END_PORT=''

4.執行.sql檔

5.於frontend folder內 npm run dev；
於backtend folder內 npm run server
