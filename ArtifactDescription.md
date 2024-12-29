# Artifact Description

**クレジット**：

## 概要：Google Font / Google Icons において、事前に必要な文字を指定しダウンロードされるフォントを小さくするオプションを利用可能にする

[unjs/unifont](https://github.com/unjs/unifont)は、様々なサービスが提供している Web Font を TypeScript から統一的な Interface で扱うためのツールである。
ファイルシステムなどへの永続化もサポートされており、Web Font のダウンロードを一度行えば、その後はローカルで利用することができる。

今回具体的には https://github.com/unjs/unifont/pull/80 のような改変を行っている。
これにより、Google Font / Google Icons において事前に必要な文字 / アイコンを指定することで、
TypeScript から最適化された Web Font の情報を簡単に扱えるようになる。

## クイックスタート

1. 適当なフォルダで以下のコマンドを実行して、Docker イメージを実行する。
    ```
    docker run -it --rm -v ./artifact:/app/artifact sushichaaaan/oss-experiment-unjs-unifont:latest
    ```

2. `artifact` というフォルダにファイルが出力されるのを確認する。
3. 標準出力に下のような内容が出力されるので、 [評価手順](#評価手順) に従って確認する。
    ```
    最適化なしのサイズ:  32.59 MB
    最適化したサイズ:  21.50 KB
    ```

## 評価手順

`artifact/google` ディレクトリに 3 つの JSON があることを確認する。
  - `meta.json`
  - `Noto Sans JP` から始まる 2 つの JSON ファイル

この json には Web Font の実際のファイルをダウンロードするための情報が含まれており、 Unicode Range によって文字の範囲ごとにファイル情報が分割されている。
改変によって、事前に必要な文字を指定しダウンロードされるフォントを小さくするオプションを使った場合は、そうでないものに比べて必要な文字が少ないことから
json ファイルに記録された情報からアクセスできるフォントファイルのサイズも全文字を含むものより小さいはずである。

今回 `Noto Sans JP` フォントを対象として生成された 2 つの json ファイルについて、
大きいものは全文字情報を細かく分割して記録したもので、実際にすべてのフォントファイルをダウンロードすると 35MB 前後となる。
小さいものは、今回の改変によってサポートされたオプションで `Hello, World!` に含まれる文字のみをダウンロードするように指定したもので、
実際にすべてのフォントファイルをダウンロードすると 50KB 以下となる。

このように、本改変によって、最適化されたフォント url を簡単に解決し TypeScript から扱うことができるようになる。

評価用のスクリプト [google.js](./playground/google.js) では、実際にこの json ファイルの情報を使って分割されたフォントファイルを
ダウンロードし、その合計サイズを最適化指定 あり / なし で比較している。
明らかに最適化後のほうがサイズが小さいことがわかる。

## 制限と展望

当初は unifont がサポートする可能な限り多い Web Font サービスでそのようなオプションがサポートされていると期待していた。
しかし、[事前調査](https://scrapbox.io/sushichan044/Optimization_options_for_web_font_service) の結果 Google Font / Google Icons でしかサポートされていないことがわかった。
今後、他のサービスでも同様のオプションがサポートされたら、ライブラリ側にも対応を行いたい。

## 更なる使い方（オプション）

Web サイトの OG Image を [vercel/satori](https://github.com/vercel/satori) のようなライブラリで生成する場合に、
事前に文字がわかっている場合のフォント url を効率よく保存して TypeScript と統合して扱うことができる。
