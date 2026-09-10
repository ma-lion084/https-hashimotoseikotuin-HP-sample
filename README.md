# はしもと整骨院 ランディングページ

静的 HTML / CSS / JS のみで構成。ビルド不要。ファイルをそのままサーバーに置けば動作します。

## ディレクトリ構成

```
site/
├── index.html            ページ本体（コンテンツはすべてここ）
├── assets/
│   ├── css/style.css     スタイル（トークン → 部品 → セクション の順）
│   ├── js/main.js        ナビ開閉・FAQ開閉（依存ライブラリなし）
│   └── img/              画像置き場（外観・院内写真、OGP画像など）
└── README.md
```

## よくある編集（検索語と期待件数）

同じ情報が複数箇所に書かれています。**検索語で全部見つけて、作業後に件数が合うか確認**してください。件数が合わなければ更新漏れです。

| やりたいこと | `index.html` で検索する語 | 件数 | 補足 |
|---|---|---|---|
| 電話番号 | `011-886-2300` | 14行 | `href="tel:0118862300"` は同じ行にある（11行）。**別途 JSON-LD の `+81-11-886-2300`（1行）も直す** |
| 平日の受付時間 | `20:00` と `20時` | 6行＋7行 | `20:00` はヒーローの受付行・表・アクセス・CTA・フッター・JSON-LD。`20時` は meta・OGP・JSON-LD の説明文・バッジ・理由カード・追従CTA |
| 土曜の受付時間 | `〜12:00` と `Saturday` | 5行＋1行 | ヒーローの受付行・表・アクセス・CTA・フッター。`Saturday` は JSON-LD |
| 休憩時間 | `12:30` | 7行 | JSON-LD を含む |
| 定休日 | `祝` と `休診` | 5行＋2行 | `休診` は受付時間表のセル。JSON-LD には定休日を書かない（曜日を列挙しない＝休み） |
| 住所 | `美しが丘` と `清田区` | 10行・10行 | title・description・OGP・JSON-LD（住所・説明文・geo）・ヒーロー・アクセス欄・バス停名。移転時は JSON-LD の `postalCode` と `geo` も直す |
| 料金 | 金額そのもの（例 `1,500円`） | 基本コース 3行、集中 2行、小中学生 2行 | 基本コースの金額は FAQ「保険は使えますか」にも書かれている |
| コースの数 | `3つの` | 5行 | コース追加時は「4つの」に一括置換 |
| コースを追加する | 下の「コース追加チェックリスト」 | — | |
| コースの色 | `style.css`「Courses」の `.course-card--*` 内の4変数 | — | 色そのものは `:root` の `--color-basic*` `--color-kids*` |
| FAQ を追加する | `faq-item` を複製し `aria-controls` と `id` を**追加順の連番**にする（次は `faq-a9`） | — | 表示順と id の順は無関係。回答の3重 `div` は開閉アニメーション用なので減らさない |
| 外観・院内の写真を差し替える | `assets/img/exterior.jpg`（外観）／`interior.jpg`（院内） | — | 同じファイル名で上書きすれば HTML の変更は不要。横 1200px 程度の JPG に縮小してから置き、`index.html` の `alt` と `figcaption` の文言も写真に合わせて見直す |
| ブランド色 | `style.css` `:root` の `--color-primary*`、`--color-bg-*`、`--color-border`、`--shadow-card*`、`--shadow-cta`、および `index.html` の `theme-color` | — | 影・下線・暗幕は `--color-primary-glow / -overlay / -underline` |
| 公開URL（独自ドメイン移行時） | `ma-lion084.github.io/https-hashimotoseikotuin-HP-sample` | index.html 5行＋`sitemap.xml` 1行 | canonical・og:url・og:image・JSON-LD の `@id`/`url`。移行後は Search Console でアドレス変更も申請 |
| スマホのブレークポイント | `style.css` の `@media (max-width: 820px)`（1箇所）と `main.js` の `matchMedia('(min-width: 821px)')`（1箇所） | 2 | 院長紹介の幅 `--container-w-doctor: 820px` は同じ数字だが無関係 |

### コース追加チェックリスト

1. `index.html` の `course-card` を複製し、`course-card--新名前` を付ける
2. `style.css` `:root` の「Course colors」に `--color-新名前`、`-dark`、`-bg` を追加
3. `style.css`「Courses」に `.course-card--新名前 { 4変数 }` を追加（既存の `--kids` をコピー）
4. `.course-grid` の `repeat(3, 1fr)` を列数に合わせる（スマホは自動で1列）
5. 料金表に区分行（`price-table__cat--新名前` と CSS「Price」の色）と料金行を追加。注意書きも見直す
6. FAQ「どれを選べばいいですか？」に1行追加
7. `3つの` を一括置換（5行）
8. ヒーローのリード文、理由カード4、流れ STEP2、meta description を更新
9. PC とスマホで表示確認（ヘッダーの高さは subgrid で自動的に揃う）

## 編集時の注意（知らないと壊す前提）

- **文章は「1文＝1段落」**。`.prose` の中では `<p>` を並べるだけで行間が付く
- **インライン `style=` は書かない**。Google マップの埋め込みコードにある `style="border:0"` も外す（CSS 側で指定済み）
- **`<br class="u-pc-only">`** は PC だけ改行する印。文言を変えるときは一度外して確認する。**`u-sp-only`** はその逆（スマホだけ表示）。電話ボタンの文言はこの2つで PC＝番号／スマホ＝「電話で相談する」に出し分けている
- **バッジ**（ヒーロー）は PC では固定サイズの丸、スマホでは 2×2 の角丸チップ（`<br>` は無効）。文言は最大 2行×7文字まで
- **JSON-LD**（`<head>` 内の構造化データ）は画面に出ない4つ目のコピー。電話は `+81` 形式、時間は `09:00` のように2桁で書く
- **理由カードには営業時間などの事実を書かない**。事実が変わったときに更新対象と気づけないため
- `TODO(公開前)` は公開前に必ず対応。`TODO(要確認)` は院長確認待ちの仮置き

## SEO・MEO の運用メモ

- **NAP の正表記（サイト・Google ビジネスプロフィール・各地図サイトで一字も変えない）**
  - 名称: はしもと整骨院（英字: Hashimoto Seikotsuin）
  - 住所: 〒004-0813 北海道札幌市清田区美しが丘3条2丁目1-5
  - 電話: 011-886-2300
  - 受付時間: 月〜金 9:00〜12:30／15:00〜20:00、土 9:00〜12:00、定休日: 日曜日・祝日（「営業時間」ではなく「受付時間」で統一）
- **構造化データ（JSON-LD）**: `geo` は丁目中心の参考値。Google マップで院の位置を右クリックして座標に差し替える。OGP 画像を置いたら `image` を追加、GBP の URL が決まったら `sameAs` を追加
- **sitemap.xml**: Search Console の「サイトマップ」に `https://ma-lion084.github.io/https-hashimotoseikotuin-HP-sample/sitemap.xml` を登録。`robots.txt` はプロジェクトページではホスト直下に置けないため作らない（独自ドメイン移行後に作る）
- **GA4 の入れ方**: 測定 ID（G-XXXXXXXXXX）を取得したら、`index.html` の `<meta charset>` の直後に公式スニペットを貼る。電話タップ（`tel_click`）とルート検索（`route_click`）は `main.js` が自動で送るので、GA4 側で「キーイベント」に指定する
- **Search Console**: 「URL プレフィックス」で正規URLを登録し、所有権確認は GA4 連携か HTML タグ（`<meta name="google-site-verification">` を `<head>` に追加）で行う
- **月1回見る数字**: GBP の「通話」「ルート」件数、Search Console の「清田区 整骨院」系クエリの表示回数とクリック数、GA4 の `tel_click` 件数

## 命名規則

- **CSS**: BEM（`block__element--modifier`）。状態は `is-open` / `is-visible` / `is-nav-open`（body）。汎用クラスは `u-` 接頭辞
- **CSS の幅**: 最大幅の生値は書かず `:root` の `--container-w-*` を使う。同じ数字でもブレークポイントとは別物
- **CSS の色**: 生の色コードは `:root` のトークン定義にだけ書く。部品側は必ず `var(--color-*)`
- **JS**: DOM のフックは `data-*` 属性（`data-nav`, `data-faq-item` など）。クラス名に依存しないので、見た目のクラスを変えても JS は壊れない

## 公開前チェックリスト

- [ ] `<link rel="canonical">` / OGP の URL・画像を実際のものに
- [ ] favicon を設置
- [ ] 構造化データ（JSON-LD）の `url`
- [ ] 院長名
- [ ] 駐車場の有無・台数（アクセス欄）
- [x] 住所・最寄バス停
- [x] Google マップの iframe 埋め込み
- [ ] 祝日の営業有無
- [ ] 料金・コース内容が実際の運用と一致しているか（特に保険適用の範囲、小中学生コースの 2,500円 の扱い）
- [ ] 広告表現（体験談・効果表現）の法令確認
- [ ] アナリティクス / 電話タップ計測タグの設置

## 対応環境

- モダンブラウザ（Chrome / Safari / Edge / Firefox の最新2バージョン）
- iOS Safari 16+ / Android Chrome を想定。新しめの機能と非対応時の挙動：`subgrid`（コースのヘッダー高さが揃わない）、`text-wrap: balance`（通常の折り返し）、`grid-template-rows` のアニメーション（FAQ が即時に開閉）、`dvh`（`vh` を併記済み）、`inset`／`:focus-visible`／`MediaQueryList.addEventListener`（iOS 14〜15.4 以上）。いずれも崩れはしない
- JS 無効時: PC 幅ではナビが表示される。スマホ幅ではナビを開けない（電話・アクセスは追従バーから可能）。FAQ は閉じた状態で表示（内容は DOM 上に存在）

## ページを増やすときの準備

2ページ目（スタッフ紹介など）を作る前に、次を先に済ませる。

- ヘッダー・ナビ・フッター・追従 CTA・SVG スプライトは `index.html` に直書きなので、コピーして使う。ナビ変更は全ページ分行う
- ナビの `href="#worries"` などはページ内リンク。別ページからは `index.html#worries` に書き換える
- `style.css` の「5. Sections」はトップページ専用。増えてきたら `style.css`（トークン・部品・ヘッダー・フッター）と `page-home.css` に分ける
