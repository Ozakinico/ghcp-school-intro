# Requirements

## Scope
神山まるごと高専の一般向け紹介サイトを、静的な HTML/CSS/JavaScript で実装し、GitHub Pages 公開に対応する。

## User Stories
- 一般ユーザーとして、学校の特徴や学びの内容を短時間で把握したい。
- 一般ユーザーとして、学校の場所や雰囲気を確認したい。
- 一般ユーザーとして、公式SNSへ遷移したい。
- 管理者として、後からキャッチコピーや教員情報を差し替えたい。

## EARS Requirements
1. WHEN ユーザーがページへアクセスしたとき, THE SYSTEM SHALL 日本語で学校紹介ページを表示する。
2. WHEN ページが表示されたとき, THE SYSTEM SHALL ヘッダー/ナビ・ヒーロー・学校概要・カリキュラム・キャンパス・教員/スタッフ・フッターの全セクションを表示する。
3. WHEN ユーザーがナビリンクをクリックしたとき, THE SYSTEM SHALL 対象セクションへスムーススクロールする。
4. WHEN 画面幅が 767px 以下のとき, THE SYSTEM SHALL ハンバーガーメニューでナビを開閉できるようにする。
5. WHEN ユーザーがスクロールしたとき, THE SYSTEM SHALL ヘッダー背景を透明から白へ遷移させる。
6. WHEN セクションがビューポートに入ったとき, THE SYSTEM SHALL フェードイン表示する。
7. WHEN ユーザーがキャンパスセクションを閲覧したとき, THE SYSTEM SHALL 神山町の地図を iframe で表示する。
8. WHEN ユーザーがフッターの SNS リンクをクリックしたとき, THE SYSTEM SHALL 正しい外部 URL を新規タブで開く。
9. WHERE キャッチコピー差し替えが必要な箇所, THE SYSTEM SHALL TODO コメントで識別可能にする。
10. WHERE 教員・スタッフ情報が未確定の箇所, THE SYSTEM SHALL プレースホルダーを表示する。
11. IF JavaScript が利用可能な場合, THEN THE SYSTEM SHALL ナビ開閉・スクロール演出・フェードインを提供する。
12. IF GitHub Pages で公開する場合, THEN THE SYSTEM SHALL ルートに .nojekyll を配置可能である。

## Constraints
- 白黒ベースのクリーンデザインを採用する。
- フォントは Noto Sans JP を使用する。
- 実装ファイルは index.html, css/style.css, js/main.js, .nojekyll を中心とする。

## Edge Cases
- ハンバーガーメニュー開放中に外側クリックした場合は閉じる。
- モバイルメニュー開放中にタブレット以上へリサイズした場合は閉じる。
- アンカーリンク先が存在しない場合は何もしない。

## Confidence
- Score: 93%
- Rationale: 要件が詳細に与えられており、静的サイト実装の不確実性が低いため。
