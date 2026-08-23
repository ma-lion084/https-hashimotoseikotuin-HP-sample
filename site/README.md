# はしもと整骨院 ランディングページ

静的 HTML / CSS / JS のみで構成。ビルド不要。ファイルをそのままサーバーに置けば動作します。

## ディレクトリ構成

```
site/
├── index.html            ページ本体（コンテンツはすべてここ）
├── assets/
│   ├── css/style.css     スタイル（トークン → 部品 → セクション の順）
│   ├── js/main.js        ナビ開閉・FAQ開閉（依存ライブラリなし）
│   └── img/              画像置き場（院長写真・OGP画像など）
└── README.md
```

## よくある編集

| やりたいこと | 編集箇所 |
|---|---|
| 文章・料金を変える | `index.html` 内の該当セクション |
| ブランド色を変える | `style.css` 冒頭 `:root` の `--color-primary*` |
| コースの色を変える | `style.css` 「5.5 Courses」の `.course-card--*` 内の変数 |
| コースを追加する | `index.html` の `course-card` を複製 → `course-card--新名前` を付け、`style.css` 5.5 に色変数を追加。`.course-grid` の `repeat(3, 1fr)` を列数に合わせる |
| FAQ を追加する | `faq-item` を複製し、`aria-controls` と `id` を一意にする |
| 電話番号を変える | `index.html` を `0118862300` / `011-886-2300` で全文検索して置換（9箇所） |
| 受付時間を変える | `index.html` を `9:00` で全文検索（表・フッター・CTA・構造化データ） |
| スマホのブレークポイント | `style.css` 「7. Responsive」の `820px` |

## 命名規則

- **CSS**: BEM（`block__element--modifier`）。状態は `is-open` / `is-visible`。汎用クラスは `u-` 接頭辞。
- **JS**: DOM のフックは `data-*` 属性（`data-nav`, `data-faq-item` など）。クラス名に依存しないので、見た目のクラスを変えても JS は壊れません。
- `index.html` 内の `TODO(公開前)` コメントは公開前に必ず対応してください。

## 公開前チェックリスト

- [ ] `<link rel="canonical">` / OGP の URL・画像を実際のものに
- [ ] favicon を設置
- [ ] 構造化データ（JSON-LD）の `url` / `streetAddress`
- [ ] 院長名・院長写真
- [ ] 住所・最寄駅・駐車場台数
- [ ] Google マップの iframe 埋め込み
- [ ] キャンペーンの有効期限
- [ ] 祝日の営業有無
- [ ] 料金・コース内容が実際の運用と一致しているか（特に保険適用の範囲）
- [ ] 広告表現（体験談・効果表現）の法令確認
- [ ] アナリティクス / 電話タップ計測タグの設置

## 対応環境

- モダンブラウザ（Chrome / Safari / Edge / Firefox の最新2バージョン）
- iOS Safari 15.4+ / Android Chrome（`dvh`・`grid-template-rows` アニメーション使用のため）
- JS 無効時: ナビは PC 表示のまま、FAQ は閉じた状態で表示（内容は DOM 上に存在）
