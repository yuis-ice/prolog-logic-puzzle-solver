# Prolog論理パズルソルバー

WAsmとTau Prologを使った論理パズル解決Webアプリケーションです。

## 特徴

- **Tau Prolog統合**: JavaScript/TypeScriptでPrologの論理プログラミングを活用
- **React + TypeScript**: モダンなフロントエンド技術
- **WASM対応**: 高性能な計算処理
- **レスポンシブデザイン**: デスクトップ・モバイル対応

## 実装済み機能

### 数独ソルバー
- 9x9の数独グリッドでパズルを作成・編集
- Tau Prologによる制約充足問題の解決
- リアルタイムでの解答表示
- パズルのリセット・クリア機能

## 今後の実装予定

- Nクイーン問題ソルバー
- ゼブラパズル（論理推論パズル）
- カスタムパズル作成機能
- より高度なProlog制約ソルバー

## 技術スタック

- **フロントエンド**: React 19, TypeScript
- **ビルドツール**: Vite
- **論理エンジン**: Tau Prolog
- **スタイリング**: CSS3 (グラデーション、ガラスモーフィズム)
- **型システム**: TypeScript (厳格型チェック)

## 開発・実行

### 前提条件
- Node.js (v20以上推奨)
- npm または yarn

### インストール
```bash
npm install
```

### 開発サーバー起動
```bash
npm run dev
```

### プロダクションビルド
```bash
npm run build
```

### リント実行
```bash
npm run lint
```

## プロジェクト構造

```
src/
├── components/          # Reactコンポーネント
│   ├── SudokuSolver.tsx    # 数独ソルバー
│   ├── LogicPuzzleSelector.tsx  # パズル選択
│   └── *.css              # コンポーネント別スタイル
├── hooks/               # カスタムフック
│   └── usePrologEngine.ts  # Prolog統合
├── types/               # TypeScript型定義
│   └── tau-prolog.d.ts     # Tau Prologの型
├── App.tsx              # メインアプリケーション
└── main.tsx             # エントリーポイント
```

## Tau Prolog について

Tau PrologはJavaScriptで実装されたProlog処理系で、以下の特徴があります：

- **Webブラウザ完全対応**: Node.jsとブラウザの両方で動作
- **ECMAScript標準準拠**: モダンなJavaScript環境で動作
- **制約充足問題**: 論理パズルや最適化問題に最適
- **高性能**: WebAssemblyとの組み合わせで高速処理

## ライセンス

MIT License
