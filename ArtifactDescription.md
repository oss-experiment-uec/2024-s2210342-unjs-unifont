# Artifact Description

## 概要：Google Font / Google Icons において、事前に必要な文字を指定しダウンロードされるフォントを小さくするオプションを利用可能にする

[unjs/unifont](https://github.com/unjs/unifont)は、様々なサービスが提供している Web Font を統一的な Interface で扱うためのツールである。
ファイルシステムなどへの永続化もサポートされており、Web Font のダウンロードを一度行えば、その後はローカルで利用することができる。

具体的には https://github.com/unjs/unifont/pull/80 のような改変を行っている。

## クイックスタート

1. 適当なフォルダで以下のコマンドを実行して、Docker イメージを実行する。
  ```
  docker run -it --rm -v ./artifact:/app/artifact sushichaaaan/oss-experiment-unjs-unifont:latest
  ```

2. `artifact` というフォルダにファイルが出力されるので、 [評価手順](#評価手順) へ移動してください。

## 評価手順

リポジトリの `artifact/google` ディレクトリに 3 つの JSON があることを確認する。
  - `meta.json`
  - `Noto Sans JP` から始まる 2 つの JSON ファイル

この json には Web Font の実際のファイルをダウンロードするための情報が含まれており、 Unicode Range によって文字ごとにファイル情報が分割されている。
改変によって、事前に必要な文字を指定しダウンロードされるフォントを小さくするオプションを使った json は、そうでないものに比べて必要な文字が少ないことから
json ファイルのサイズが小さくなることが期待される。
実際に 2 つの json ファイルのサイズを調べると、片方がもう片方と比べて大幅に小さいサイズになっているはずである。

## 制限と展望

当初は unifont がサポートする可能な限り多い Web Font サービスでそのようなオプションがサポートされていると期待していた。
しかし、[事前調査](https://scrapbox.io/sushichan044/Optimization_options_for_web_font_service) の結果 Google Font / Google Icons でしかサポートされていないことがわかった。
今後、他のサービスでも同様のオプションがサポートされたら、ライブラリ側にも対応を行いたい。

## 更なる使い方（オプション）

Web サイトの OG Image を [vercel/satori](https://github.com/vercel/satori) のようなライブラリで生成する場合に、
事前に文字がわかっている場合のフォント url を効率よく保存して TypeScript と統合して扱うことができる。
