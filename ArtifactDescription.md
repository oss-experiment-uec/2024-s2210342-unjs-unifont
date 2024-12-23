# Artifact Description

## 概要：Google Font / Google Icons において、事前に必要な文字を指定しダウンロードされるフォントを小さくするオプションを利用可能にする

[unjs/unifont](https://github.com/unjs/unifont)は、様々なサービスが提供している Web Font を統一的な Interface で扱うためのツールである。
ファイルシステムなどへの永続化もサポートされており、Web Font のダウンロードを一度行えば、その後はローカルで利用することができる。

具体的には https://github.com/unjs/unifont/pull/80 のような改変を行っている。

## クイックスタート

以下，記述事項の説明．

> [!NOTE]
> Docker Hub への Publish が間に合わなかったため、現時点では実行後の成果物のみを確認できる状態です。
> 実際には `node playground/google.js` を実行することで、改変の効果を確認できます。

リポジトリの output フォルダに成果物があるので、[評価手順](#評価手順) へ移動してください。

<!--
1. 以下のコマンドを実行して、改変対象のリポジトリをクローンする。

```
git clone git@github.com:oss-experiment-uec/2024-s2210342-unjs-unifont.git
```

2. クローンしたディレクトリに移動し、以下のコマンドを実行して Docker イメージをビルドする。

```
cd 2024-s2210342-unjs-unifont
```
-->

## 評価手順

> [!NOTE]
> 実行手順が整備されていないため、実行後に出力されるファイルを直接 GitHub に保存している。

リポジトリの `output/google` ディレクトリに 3 つの JSON があることを確認する。

  - `meta.json`
  - `Noto Sans JP-AOpfMyPxZL-data.json`
    - 改変前の、すべての文字を含むフォント
    - 191KB
  - `Noto Sans JP-R40Gaknnob-data.json`
    - 改変により事前に必要な文字を指定しダウンロードされるフォントを小さくしたもの
    - 2KB

`Noto Sans JP-R40Gaknnob-data.json` のほうが圧倒的にサイズが小さいはずである。
この json には Web Font の実際のファイルをダウンロードするための情報が含まれており、 Unicode Range によって文字ごとにファイル情報が分割されている。
このため、必要な文字が多いほど json ファイルの項目も多くなる。

改変によって、事前に必要な文字を指定しダウンロードされるフォントを小さくするオプションを使った json は、そうでないものに比べて必要な文字が少ないことから
json ファイルのサイズが小さくなることが期待され、実際に 1/100 程度のサイズになっている。

## 制限と展望

以下，記述事項の説明．

* 改変内容や評価方法について諦めた点があれば説明する．
  + 意図的に行わなかった事柄も含む．
* 諦めた理由は問わないが，理由の説明は要する．
* 時間に余裕があればやりたかった事柄も説明する．
* 何もないなら「特になし」と明記する．

## 更なる使い方（オプション）

以下，記述事項の説明．

* より現実的な応用例や利用例を説明する．
* ソフトウェアを使いたくさせる説明が理想的．
* この節の見出しは適当に変えてよいし，複数の節に分けてもよい．
* 必須ではないが，書けるなら書いた方が評価者には好印象を与える．