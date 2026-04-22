# Plan: 神山まるごと高専 GitHub Pages 紹介サイト

## 概要

静的 HTML/CSS/JS で神山まるごと高専の紹介ページを構築し、GitHub Pages で公開する。
白黒ベースのクリーンなデザイン（公式サイトのトーン）。日本語のみ。一般向け学校紹介。

---

## ヒアリング結果

| 項目 | 内容 |
|---|---|
| セクション | ヒーロー、学校概要・理念、カリキュラム・学び、キャンパス・施設、教員・スタッフ紹介、SNSリンク |
| 言語 | 日本語のみ |
| 画像 | 公式サイトの画像URLを使用（後から差し替え前提） |
| 目的 | 一般向けの学校紹介 |
| キャッチコピー | 仮置き →「テクノロジーと起業家精神で、未来を創る。」（後で差し替え可能） |
| 教員・スタッフ | プレースホルダー（後で差し替え可能） |
| SNS | Twitter/X: https://x.com/kamiyama_kosen / Instagram: https://www.instagram.com/kamiyama_kosen/ / YouTube: https://www.youtube.com/channel/UCiXJqtlq4-Th1z8hwFdpDWg |

---

## ファイル構成

```
index.html          ← メインページ（全セクション）
css/style.css       ← 全スタイル定義
js/main.js          ← ナビ・スクロールアニメーション
.nojekyll           ← Jekyll 無効化（GitHub Pages 要件）
```

---

## セクション構成

| # | セクション | 内容 |
|---|---|---|
| 1 | **ヘッダー/ナビ** | 固定ナビ、スクロールで背景出現、スマホはハンバーガーメニュー |
| 2 | **ヒーロー** | 学校名 + 仮キャッチコピー + スクロール誘導矢印 |
| 3 | **学校概要・理念** | 設立背景、ミッション、特徴3点をアイコン付きで表示 |
| 4 | **カリキュラム・学び** | 3カラムカード（テクノロジー / デザイン / 起業家精神） |
| 5 | **キャンパス・施設** | 徳島県神山町の環境・施設の紹介、Google Maps 埋め込み |
| 6 | **教員・スタッフ紹介** | カード形式（プレースホルダー3〜4名分） |
| 7 | **フッター** | SNSリンク3種 + 学校基本情報 |

---

## デザイン仕様

### カラーパレット

```css
--color-bg:         #ffffff;
--color-bg-alt:     #f5f5f5;
--color-text:       #0a0a0a;
--color-text-muted: #555555;
--color-border:     #e0e0e0;
--color-accent:     #0a0a0a;  /* アクセントは極限まで抑制（黒のみ） */
```

### フォント

- 本文・見出し: **Noto Sans JP**（Google Fonts, weights: 400, 500, 700）

### レイアウト

- フルワイドセクション（`width: 100%`）
- コンテナ: `max-width: 1200px`, `margin: 0 auto`, `padding: 0 24px`
- グリッドレイアウト: カリキュラムカード（3col）、スタッフカード（4col）

### レスポンシブ

| ブレークポイント | 変化 |
|---|---|
| ~767px (SP) | 1カラム、ハンバーガーメニュー |
| 768px~ (タブレット) | 2カラム |
| 1024px~ (デスクトップ) | 3〜4カラム |

---

## 実装ステップ

### Phase 1 — HTML 骨格（`index.html`）

1. `<head>`: charset, viewport, title, Noto Sans JP（Google Fonts）, CSS/JS リンク
2. 固定ナビ: ロゴ（学校名テキスト）+ アンカーリンク + ハンバーガーボタン
3. Hero セクション: 大見出し + キャッチコピー + CTAボタン（「もっと見る」）+ スクロール誘導矢印
4. 概要・理念: 3ポイントのアイコン付き説明（`<svg>` または Unicode アイコン）
5. カリキュラム: 3カラムカード（タイトル + 説明文）
6. キャンパス: テキスト + `<iframe>` Google Maps 埋め込み（神山町）
7. 教員・スタッフ: プレースホルダーカード3名分（アバター + 名前 + 肩書き）
8. フッター: SNSリンク（アイコン） + 住所 + コピーライト

### Phase 2 — スタイル（`css/style.css`）

- CSS カスタムプロパティでカラー定義
- `reset` / `base` → `layout` → `components` の順にセクション整理
- セクションごとに最低 `padding: 80px 0` の余白
- カード: `border: 1px solid var(--color-border)`, `border-radius: 4px`
- ナビ背景: デフォルト透過 → スクロールで `background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,.08)`

### Phase 3 — インタラクション（`js/main.js`）

- スムーススクロール（`scrollIntoView({ behavior: 'smooth' })`）
- ナビ背景トグル（`scroll` イベント + `classList.toggle`）
- ハンバーガーメニュー開閉（`click` + `aria-expanded`）
- `IntersectionObserver` でセクションのフェードイン（`opacity: 0` → `opacity: 1`）

### Phase 4 — GitHub Pages 設定

- `.nojekyll` ファイル作成（空ファイル）
- `main` ブランチの root に配置 → 自動公開
- 公開 URL: `https://Ozakinico.github.io/ghcp-school-intro/`

---

## 検証チェックリスト

- [ ] `https://Ozakinico.github.io/ghcp-school-intro/` にアクセスしてページ表示
- [ ] Chrome DevTools でモバイル（375px）・タブレット（768px）の表示
- [ ] 各ナビリンク → スムーススクロール動作
- [ ] ハンバーガーメニューの開閉（SP表示時）
- [ ] フッターのSNSリンクが正しいURLに遷移するか
- [ ] 画像の読み込みエラーがないか（公式URL使用のため）

---

## 後から差し替えが必要な箇所（TODO）

- `index.html` 内の仮キャッチコピー（`<!-- TODO: キャッチコピー差し替え -->`）
- 教員・スタッフカードのプレースホルダーテキスト・画像
- 公式画像URLの差し替え（ライセンス確認後）
- Google Maps 埋め込みURLの embed APIキー確認
