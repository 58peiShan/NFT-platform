## 專案介紹  
[![](https://upload.cc/i1/2022/10/06/YSRVMG.png)](https://upload.cc/i1/2022/10/06/YSRVMG.png)
  
為畫面參考OpenSea的NFT販售平台Demo，有基本功能登入註冊及購物車，使paypal測試結帳功能，並串接第三方API以檢視乙太鏈實時市場動態   
前端框架為React，並使用node+Express做為後端Server，server端口預設為5000port，資料庫使用MySQL  
  
## 啟動方式  

1.由分支master/devlope clone下來後，**分別**cd至兩個資料夾：frontend,backend，執行`npm install`  

2.在backend資料夾根目錄建立.env檔案，並在單引號內填入本機資料庫的設定以及CORS前端端口（ex:3000），例：  

    MYSQL_HOST = 'localhost'  
    MYSQL_USER = 'user'  
    MYSQL_PASSWORD = 'password'  
    MYSQL_DB = 'database'  
    CORS='http://localhost:3000'  
    API_PORT = '5000'  
    NFT_API_KEY='你的TokenView API Key'

3.在frontend資料夾根目錄建立.env檔案，並在單引號內填入欲連線port（ex:3000）的設定：  
  
    FRONT_END_PORT=''  

4.執行.sql檔  

5.於frontend folder內 `npm run dev`；  
於backtend folder內 `npm run server`  
 
6.paypal請使用[測試帳號](https://developer.paypal.com/tools/sandbox/accounts/)  


> 本Demo所呈現的所有視覺資料、商標、標誌、圖像、短片、聲音檔案、連結、價格及其他資料等（以下簡稱「資料」）皆非本人所有，僅供程式學習之用，不會明示或隱含保證該等資料均為準確無誤。亦不會對任何錯誤或遺漏承擔責任。
