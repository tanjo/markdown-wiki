# markdown-wiki

Markdown を利用した Wiki です.

## 実行

```
npm install
mongod -dbpath /usr/local/var/mongodb    
npm start
```

## .env

設定しない場合は何も認証がかかりません.

```
USERNAME=root
PASSWORD=admin
```

## 主な利用ライブラリ

- [express](https://www.npmjs.com/package/express)
- [marked](https://www.npmjs.com/package/marked)
- [mongoose](https://www.npmjs.com/package/mongoose)

## CHANGELOG

### Ver 0.0.2

- .env で設定できるように変更

### Ver 0.0.1

- トップページに表示されるものを修正

### Ver 0.0.0

- とりあえずの運用が可能なレベルのもの
