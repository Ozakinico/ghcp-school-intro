# Plan: 神山まるごと高専 紹介サイト（Astro + GitHub Pages）

Astro + Tailwind CSS で、深緑×ベージュの"森"テイストな紹介サイトを構築。スクロール連動アニメーション（Motion One）とパララックスで没入感を演出。日本語／英語のバイリンガル対応、GitHub Actions で GitHub Pages へ自動デプロイ。

## 方針サマリ

- **技術**: Astro v4 + TypeScript + Tailwind CSS + Motion One（軽量アニメ）+ astro-icon
- **i18n**: Astro 公式の `i18n` ルーティング（`/` = ja デフォルト、`/en/` = 英語）
- **コンテンツ**: 公式公開情報を参考にしたダミー原稿（Markdown/MDX をコンテンツコレクションで管理）
- **デプロイ**: GitHub Actions（`withastro/action`）で main push → Pages
- **ブランチ**: 現在 `second_pages`。作業はこのブランチで進め、main マージ後に公開

## デザイントークン（深緑×ベージュ）

- Primary（深緑）: `#1F3A2E` / 濃いフォレスト
- Accent（苔グリーン）: `#4F7A59`
- Base（ベージュ）: `#F3ECDD` / 紙のような温かさ
- Sub（アイボリー）: `#FFFDF7`
- Ink（墨）: `#1B1B19`
- フォント: 和文 = Noto Serif JP（見出し）+ Noto Sans JP（本文）／欧文 = Fraunces + Inter
- 質感: 余白たっぷり、細い罫線、微妙な紙テクスチャ、森のシルエット SVG

## ページ／セクション構成

ルート `/`（日本語）／ `/en/`（英語）それぞれに同構造。

1. **Hero** — キャッチコピー＋森のパララックスビジュアル（背景 SVG レイヤー3枚で視差）
2. **About / 学校紹介** — 理念「テクノロジー×デザイン×起業家精神」、5つの特徴カード
3. **Curriculum / 学び** — 1〜5年次のカリキュラム年表（スクロール横スライド）
4. **Campus / 神山町** — 徳島県神山町の魅力、写真ギャラリー、自然とテック共生の物語
5. **Admissions / 入学案内** — 募集要項、選考プロセス、よくある質問アコーディオン
6. **News / ブログ** — コンテンツコレクションで Markdown 投稿、一覧 + 詳細ページ
7. **Contact / お問い合わせ** — Formspree（無料枠）経由の静的フォーム（要 endpoint 登録、未登録時は mailto フォールバック）
8. **Access / アクセス** — OpenStreetMap iframe 埋め込み（Google Maps は API キー不要な OSM を推奨、要なら Google に差し替え可）

全ページ共通: ヘッダー（透過→スクロールで凝縮）、フッター（SNS・言語切替・サイトマップ）。

## Steps（実装計画）

### Phase 1: 基盤セットアップ（順次）
1. Astro プロジェクト初期化（`npm create astro@latest` minimal + TS strict）
2. Tailwind CSS 統合（`@astrojs/tailwind`）、デザイントークンを `tailwind.config.mjs` に定義
3. i18n ルーティング設定（`astro.config.mjs` の `i18n`、`defaultLocale: "ja"`、`locales: ["ja","en"]`）
4. 共通レイアウト `src/layouts/BaseLayout.astro`（`<head>` メタ、OGP、言語切替 lang 属性）
5. `src/i18n/ja.json` / `src/i18n/en.json` 翻訳辞書 + `useTranslations()` ヘルパー

### Phase 2: 共通コンポーネント（Phase 1 後／ここは並列可）
6. `Header.astro`（スクロールで bg 不透明化、言語切替リンク）
7. `Footer.astro`
8. `SectionHeading.astro`（和欧混植の装飾見出し）
9. `ParallaxLayer.astro`（`prefers-reduced-motion` 対応、`transform: translateY` を scroll で制御）
10. `RevealOnScroll.astro`（IntersectionObserver + Motion One でフェードアップ）

### Phase 3: ページ実装（Phase 2 後、セクションごと並列可）
11. Hero セクション（3層パララックス SVG：遠景山／中景森／近景葉）
12. About セクション（特徴カード × 5）
13. Curriculum セクション（年次タイムライン、横スクロール）
14. Campus セクション（画像ギャラリー＋ストーリーブロック）
15. Admissions セクション（FAQ アコーディオン = ネイティブ `<details>`）
16. News：`src/content/news/` コンテンツコレクション定義 → 一覧 `/news` + 詳細 `/news/[slug]`（ja/en 両対応）
17. Contact：Formspree フォーム（env で endpoint 注入、未設定時は mailto）
18. Access：OSM iframe + 徳島県名西郡神山町の住所表示

### Phase 4: 仕上げ（Phase 3 後）
19. ダミー原稿（ja/en）をすべて埋める
20. OGP 画像・favicon・apple-touch-icon 生成（Satori or 手作り SVG→PNG）
21. Lighthouse で検証、`prefers-reduced-motion` 挙動確認、Core Web Vitals 90+ を目標

### Phase 5: デプロイ（Phase 4 後）
22. `astro.config.mjs` に `site` と `base`（リポ名 `/ghcp-school-intro/`）設定
23. `.github/workflows/deploy.yml` 作成（`withastro/action@v2`、Node 20、Pages 書き込み権限）
24. リポジトリ設定: Settings → Pages → Source = GitHub Actions
25. main にマージ → 公開 URL 確認

## Relevant files（新規作成が中心）

- `package.json` / `astro.config.mjs` / `tailwind.config.mjs` / `tsconfig.json`
- `src/layouts/BaseLayout.astro` — メタ／i18n／共通スタイル注入
- `src/components/{Header,Footer,SectionHeading,ParallaxLayer,RevealOnScroll,LangSwitch,FaqItem,NewsCard}.astro`
- `src/components/sections/{Hero,About,Curriculum,Campus,Admissions,News,Contact,Access}.astro`
- `src/pages/index.astro` / `src/pages/en/index.astro` — セクションをインポートして組み立て
- `src/pages/news/[...slug].astro` / `src/pages/en/news/[...slug].astro`
- `src/content/config.ts` — `news` コレクションスキーマ（title, date, lang, excerpt, cover）
- `src/content/news/ja/*.md` / `src/content/news/en/*.md` — ダミー記事3本ずつ
- `src/i18n/{ja,en}.json` + `src/i18n/utils.ts`
- `src/styles/global.css` — フォント、紙テクスチャ、reduced-motion
- `public/images/` — パララックス用 SVG、キャンパス写真プレースホルダ
- `.github/workflows/deploy.yml` — Pages デプロイ
- `README.md` — セットアップ・開発・デプロイ手順更新

## Verification

1. `npm run dev` でローカル起動、`/` と `/en/` 両方が表示されページ切替動作
2. `npm run build && npm run preview` でビルド成功、リンク切れなし（`astro check` + 手動巡回）
3. Chrome DevTools Lighthouse: Performance / Accessibility / Best Practices / SEO すべて 90 以上
4. `prefers-reduced-motion: reduce` 設定時にパララックス／アニメが停止すること（DevTools Rendering で検証）
5. モバイル（375px）／タブレット（768px）／デスクトップ（1280px）でレイアウト崩れなし
6. GitHub Actions 実行 → Pages URL（`https://ozakinico.github.io/ghcp-school-intro/`）で表示確認
7. ニュース一覧から詳細へ遷移、言語切替で対応言語の同一記事に遷移

## Decisions

- **Astro 採用**: 静的出力・アイランドアーキテクチャで軽量、ニュース用コンテンツコレクションも豊富 → GitHub Pages と好相性
- **Tailwind**: デザイントークン管理と Utility で開発速度を優先。`@apply` で意匠のまとまりも担保
- **Motion One**: GSAP より軽量（〜4KB）、Web Animations API ベースで `prefers-reduced-motion` との相性良好
- **コンタクトフォーム**: GitHub Pages は静的のため Formspree を第一候補、未登録時 mailto フォールバックで MVP 成立
- **マップ**: API キー不要の OSM iframe を採用（Google Maps は後差し替え可）
- **スコープ除外**: 管理画面・CMS 連携・PWA 化・検索機能・アクセス解析は今回スコープ外（後日追加可）

## Further Considerations

1. **リポジトリ名と公開 URL**: 現状 `ghcp-school-intro` 想定（`/ghcp-school-intro/` 配下公開）。独自ドメインを当てるなら `CNAME` 追加 + `site`/`base` 調整が必要 → 現状はプロジェクトサブパスで進める前提
2. **画像アセット**: 実写真が未入手のため、Unsplash の CC0 相当 or イラスト SVG でダミー配置。後で差し替え前提でファイル名だけ固定しておく
3. **法的配慮**: 実在校であり、ダミー文言には「※本サイトは学習目的のデモです」の注記をフッターに明示（誤認回避）→ 本採用するなら後で削除
