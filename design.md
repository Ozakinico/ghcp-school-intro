# Design

## Architecture
- 単一ページ構成の静的サイト。
- 構成要素:
  - index.html: セクションとコンテンツ構造。
  - css/style.css: リセット、ベース、レイアウト、コンポーネント、レスポンシブ。
  - js/main.js: ナビ制御、スクロール挙動、IntersectionObserver。
  - .nojekyll: GitHub Pages 用設定。

## Data Flow
1. 初期表示時に HTML と CSS を読み込む。
2. main.js がロードされ、イベントリスナーを登録する。
3. スクロール時:
   - ヘッダーの is-scrolled クラスを切り替える。
4. ナビ操作時:
   - ハンバーガーボタンが is-open を切り替える。
   - アンカー押下時に対象要素へ smooth scroll する。
5. 表示演出:
   - IntersectionObserver が reveal 要素を監視し、is-visible を付与する。

## Interfaces
- DOM クラス:
  - site-header
  - nav-toggle
  - primary-nav
  - reveal / is-visible
- JavaScript API:
  - Element.scrollIntoView({ behavior: "smooth" })
  - IntersectionObserver
  - classList.toggle

## Layout and Breakpoints
- コンテナ幅: max 1200px, 左右 padding 24px。
- 1024px 以上: 3〜4 カラム表示（学び 3、スタッフ 4）。
- 768px〜1023px: 2 カラム表示。
- 767px 以下: 1 カラム + ハンバーガーメニュー。

## Error Handling Matrix
| Condition | Handling |
|---|---|
| アンカー先が見つからない | スクロール処理を中断 |
| ヘッダー要素が取得できない | ナビ開閉処理を安全にスキップ |
| IntersectionObserver 非対応 | reveal 初期表示のまま（重大障害なし） |

## Testing Strategy
- 手動テスト:
  - PC/タブレット/SP の表示崩れ確認。
  - 各ナビリンク遷移。
  - ハンバーガー開閉、外側クリック閉じ。
  - SNS リンク先。
- 静的検証:
  - HTML/CSS/JS の構文エラーがないこと。
  - 参照パスが存在すること。

## Decision Record
### Decision - 2026-04-22
**Decision**: モノクロトーンを維持しつつ、ヒーロー背景に薄いグラデーションとグレースケール画像を重ねる。
**Context**: 要件は白黒ベースのクリーンデザインだが、没個性的な平坦画面を避ける必要がある。
**Options**:
- 単色背景のみ: 実装が容易だが印象が弱い。
- 写真のみ: 情報量が過多になる懸念。
- グラデーション + 写真の重ね: 視認性と印象のバランスが良い。
**Rationale**: 文字可読性を保ちつつ、第一印象を高められるため。
**Impact**: 追加依存なく視覚品質を向上。
**Review**: 公式素材差し替え時に再評価。
