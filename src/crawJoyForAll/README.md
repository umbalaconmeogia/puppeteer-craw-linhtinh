# 万人幸福の栞　17箇条のテキストの取得

[豊後大野市倫理法人会ホームページ](http://workprint.biz/bungo_ohno_rinrihoujinkai/index.html) からクローリングする。

このプログラムは、私のnodejsとpuppeteerの勉強で作った物である。

自分がnodejsを学ばずに、puppeteerに飛び込んだが、やはり基礎知識がわからないとpuppeteerのサンプルを見ても正しく理解しないので、必要なnodejs知識を少しずつ取得しながらpuppeteerを遊ぶ。

そのため、このプログラムは私の勉強時のタイミングでのベスト結果だが、必ずベストプラクティスではない。

## スクリプト実行

```shell
node main.js
```

## 技術解説

* 17個のHTMLファイルを開いて、その上のデータを抽出してテキストファイルに保存する。
* 各HTMLファイルの処理は非同期で行う。1個のHTMLファイルは1個のbrowserのpage上で処理される。
  そのため処理が早くなる。但し、browser.close()するのは、全てのpageの処理が終わるまで待つ必要があるため、Promise.all()で各pageの処理の終わりを待つ。
  ```js
  await Promise.all(array17.map((number) => getAndSaveContent(browser, number)));
  ```
  私のPCで、非同期処理が 3.5 秒かかり、同期処理が 7 秒かかかる。
* 1個のpage上の処理は、順序で処理する必要があるためawaitで各関数を呼び出す。
  但し、ファイルの書き込みはこの同期処理が不要であるためawaitで呼ばない。