# 老爸的私房錢
簡易記帳程式

## 功能
使用者可以：
- 使用者可以註冊帳號，註冊的資料包括：名字、email、密碼、確認密碼。其中 email 與密碼是必填欄位，但名字不是
- 如果使用者已經註冊過、沒填寫必填欄位、或是密碼輸入錯誤，就註冊失敗，並回應給使用者錯誤訊息
- 使用者可以透過 Facebook Login 直接登入
- 在首頁一次瀏覽所有支出的清單
- 在首頁看到所有支出清單的總金額
- 新增一筆支出
- 編輯支出的所有屬性 (一次只能編輯一筆)
- 刪除任何一筆支出 (一次只能刪除一筆)
- 在首頁可以根據支出「類別、年度、月份」篩選支出；總金額的計算只會包括被篩選出來的支出總和。

## 畫面截圖
![首頁](https://github.com/konnono/expense-tracker/blob/main/cover_page.png) 

## 安裝方式
1. 複製檔案
```
git clone https://github.com/konnono/expense-tracker.git
```
2. 進入檔案夾
```

```

3. 在檔案夾中執行
```
npm install
```

4. 將.env.example的檔案複製並命名為.env檔案

5. 產生種子檔案
```
npm run seed
```

6. 執行程式:
```
npm run start
```

以開發模式執行程式(nodemon):
```
npm run dev
```
7. 測試帳號:
帳號：user1@example.com
密碼：12345678

帳號：user2@example.com
密碼：12345678