# 老爸的私房錢 （又名【廣志の私帳】）
簡易記帳程式

## 功能
使用者 (老爸) 可以：

- 在首頁一次瀏覽所有支出的清單
- 在首頁看到所有支出清單的總金額
- 新增一筆支出
- 編輯支出的所有屬性 (一次只能編輯一筆)
- 刪除任何一筆支出 (一次只能刪除一筆)
- 在首頁可以根據支出「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和。

## 畫面截圖
![首頁](https://github.com/konnono/expense-tracker/blob/main/cover_page.png) 

## 安裝方式
複製檔案
```
git clone https://github.com/konnono/expense-tracker.git
```

準備mongoDB:
- 請在mongoDB準備一個名為「expence-tracker」的資料庫

在檔案夾中執行
```
npm install
```

產生種子檔案
```
npm run seed
```

執行程式:
```
npm run start
```

以開發模式執行程式(nodemon):
```
npm run dev
```
