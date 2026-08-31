# オープン教材・OER 設計リファレンスカタログ（決定版 115選）

自作教材の設計・カリキュラム構築において参照・活用できるオープン教育リソース（OER）および実践的教材のカタログです。

---

## 1. カタログの見方・評価軸

### 形式 (Format)
* **`Tutorial`**: ステップ実行型チュートリアル（手順通りに進めれば動く）
* **`Interactive`**: 対話型・シミュレーション・Web実行（パラメータ操作・リアルタイム描画）
* **`Textbook`**: 体系的オープン教科書（理論・章立て・演習問題の網羅）
* **`Lab/Project`**: 課題・制作・実装主導型（ハンズオン、自作、演習課題中心）
* **`Unplugged`**: 非PC・概念体験型（具体物・身体的アプローチ）
* **`Reference/Portal`**: 辞書・仕様・メガポータル・ガイドブック

### 難易度 (Level)
* **`初級`**: 前提知識なし、小中高〜非専門の入門
* **`中級`**: 大学初年次・プログラミング基礎習得後
* **`上級`**: 学部中上級・実務エンジニア・研究者レベル

### 再利用性（★評価・ライセンス）
* **`★★★★★`**: CC BY / MIT / Apache 2.0 / CC0 (PD) — 商用・改変・抜粋・二次配布が極めて自由
* **`★★★★☆`**: CC BY-SA — 改変・商用利用可能だが、派生物にも同一ライセンスの継承が必要
* **`★★★☆☆`**: CC BY-NC / CC BY-NC-SA — 非営利目的に限定（教育・個人利用は改変可、商用利用不可）
* **`★★☆☆☆`**: CC BY-NC-ND / 無料公開のみ — 改変不可・転載制限あり、閲覧・学習リファレンス向け

---

## 2. 分野別教材カタログ（全115選）

### 1. 電子工作・組み込み・IoT（Physical Computing）

| No | 教材名（リンク） | 形式 | 難易度 | ライセンス | ソース | 再利用性 | 教材設計パターン・品質評価 |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| 1 | [SparkFun Learn](https://learn.sparkfun.com/tutorials/) | Tutorial | 初級 | CC BY-SA 4.0 | [GitHub](https://github.com/sparkfun) | ★★★★☆ | **フックアップ型**: 回路図・写真・コード・トラブルシューティングの導線が完成されている。 |
| 2 | [Adafruit Learning System](https://learn.adafruit.com/) | Tutorial | 初級 | CC BY-SA / MIT | [GitHub](https://github.com/adafruit) | ★★★★☆ | **部品連動型**: CircuitPythonとハードを直結。「まず動かし、後から原理」の構成。 |
| 3 | [Raspberry Pi Projects](https://projects.raspberrypi.org/) | Project | 初級 | CC BY-SA | [GitHub](https://github.com/RaspberryPiFoundation) | ★★★★☆ | **ゴール提示型**: 「何を作るか」「必要なもの」「手順」「挑戦」の4層構造で子供でも自走可能。 |
| 4 | [Arduino Docs](https://docs.arduino.cc/) | Tutorial | 初級 | CC BY-SA 4.0 | [GitHub](https://github.com/arduino/docs-content) | ★★★★☆ | **標準リファレンス型**: 公式ハードの仕様と実践スケッチが有機的に統合された入門教材。 |
| 5 | [All About Circuits: Textbooks](https://www.allaboutcircuits.com/textbook/) | Textbook | 初〜上級 | オープン (Design Science) | [Web](https://www.allaboutcircuits.com/textbook/) | ★★★★☆ | **大系教本型**: 理論から回路計算まで網羅。章末の「Worksheets」が概念定着に秀逸。 |
| 6 | [Embedded Systems — Shape the World](https://users.ece.utexas.edu/~valvano/Volume1/) | Lab/Text | 中級 | CC BY-NC-ND 4.0 | Web公開 | ★★☆☆☆ | **ボトムアップ組み込み**: C言語とマイコンレジスタ操作からOS・通信まで直結する名講義。 |
| 7 | [MicroPython Documentation](https://docs.micropython.org/) | Tutorial | 初〜中級 | MIT | [GitHub](https://github.com/micropython/micropython) | ★★★★★ | **API連動チュートリアル**: マイコンの制約とPythonの簡潔さを対比させた実践設計。 |
| 8 | [Wokwi Documentation & Projects](https://docs.wokwi.com/) | Interactive | 初〜中級 | オープン / Free | [GitHub](https://github.com/wokwi) | ★★★★☆ | **シミュレータ埋め込み型**: 実機なしでブラウザ上で配線とコードを実行・検証できる。 |
| 9 | [OSHWA Guides](https://www.oshwa.org/definition/) | Reference | 中級〜 | CC BY-SA 4.0 | Web公開 | ★★★★☆ | **オープン規格型**: オープンハードウェアを作るためのライセンス選定・設計公開の規範。 |
| 10 | [Libre Solar Education](https://libre.solar/) | Project | 中〜上級 | CC BY-SA / CERN OHL | [GitHub](https://github.com/LibreSolar) | ★★★★☆ | **実機設計公開型**: 実際の太陽光充電コントローラの回路設計データを教材化。 |

---

### 2. コンピュータサイエンス・アーキテクチャ・OS

| No | 教材名（リンク） | 形式 | 難易度 | ライセンス | ソース | 再利用性 | 教材設計パターン・品質評価 |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| 11 | [CS Unplugged](https://www.csunplugged.org/) | Unplugged | 初級 | CC BY-SA 4.0 | [GitHub](https://github.com/uccser/cs-unplugged) | ★★★★☆ | **身体的・具体物体験型**: カードや紙で2進数やソートアルゴリズムの本質を体感させる傑作。 |
| 12 | [Computer Science Field Guide](https://www.csfieldguide.org.nz/) | Interactive | 初級 | CC BY-SA 4.0 | [GitHub](https://github.com/uccser/cs-field-guide) | ★★★★☆ | **対話型Web教科書**: ブラウザ上のインタラクティブアプレットでCS全分野を平易に解説。 |
| 13 | [An Open Guide to Data Structures & Algorithms](https://open.umn.edu/opentextbooks/textbooks/1017) | Textbook | 中級 | CC BY 4.0 | Web公開 | ★★★★★ | **平易なアルゴリズム入門**: 厳密な数式を抑え、擬似コードと視覚的図解で直観的に理解。 |
| 14 | [SICP (Structure and Interpretation of Computer Programs)](https://ocw.mit.edu/courses/6-001-structure-and-interpretation-of-computer-programs-spring-2005/) | Textbook | 中〜上級 | CC BY-SA 4.0 | [GitHub](https://github.com/sarabander/sicp-pdf) | ★★★★☆ | **計算機原論型**: 抽象化・メタ言語処理・評価器実装へと至る不朽の教科書。 |
| 15 | [Nand2Tetris (Elements of Computing Systems)](https://www.nand2tetris.org/) | Project | 中〜上級 | CC BY-NC-SA 3.0 | [GitHub](https://github.com/havivha/Nand2Tetris) | ★★★☆☆ | **フルスタック構築型**: NAND素子1個からCPU、アセンブラ、コンパイラ、OS、ゲームまで自作。 |
| 16 | [MIT 6.1810: Operating System Engineering](https://ocw.mit.edu/courses/6-1810-operating-system-engineering-fall-2023/) | Lab | 上級 | CC BY-NC-SA 4.0 | [GitHub](https://github.com/mit-pdos/xv6-riscv) | ★★★☆☆ | **実装主導型**: 小型UNIX（xv6）のカーネルコードを読み、ページテーブルやシステムコールを実装。 |
| 17 | [Operating Systems — Open Education Hub](https://open-education-hub.github.io/operating-systems/) | Textbook/Lab | 中級 | CC BY-SA 4.0 | [GitHub](https://github.com/open-education-hub/operating-systems) | ★★★★☆ | **モジュール統合型**: スライド、ドリル、演習プロジェクトが一体化した現代的OS教材。 |
| 18 | [Operating Systems and Middleware](https://open.umn.edu/opentextbooks/) | Textbook | 中〜上級 | CC BY-SA | Web公開 | ★★★★☆ | **分散・ミドルウェア指向**: スレッド、仮想メモリに加えRPCやセキュリティを重視したOS教科書。 |
| 19 | [MIT 6.004: Computation Structures](https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/) | Lab/Text | 中級 | CC BY-NC-SA 4.0 | Web公開 | ★★★☆☆ | **ハード〜アーキテクチャ**: 論理回路からRISC-Vプロセッサ設計までをステップアップ。 |
| 20 | [OpenStax Introduction to Computer Science](https://openstax.org/books/introduction-computer-science/) | Textbook | 初級 | CC BY-NC-SA 4.0 | [GitHub](https://github.com/openstax) | ★★★☆☆ | **標準カリキュラム型**: ハード、OS、NW、セキュリティ、倫理までを広く浅くカバー。 |

---

### 3. プログラミング言語・実践ツール・Web開発

| No | 教材名（リンク） | 形式 | 難易度 | ライセンス | ソース | 再利用性 | 教材設計パターン・品質評価 |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| 21 | [The Carpentries (Software / Data / Library)](https://carpentries.org/lessons/) | Tutorial | 初級 | CC BY 4.0 | [GitHub](https://github.com/carpentries) | ★★★★★ | **認知的負荷制御型**: ライブコーディング前提。インストラクター用メモやエラー対応例が充実。 |
| 22 | [How to Think Like a Computer Scientist (Python)](https://open.umn.edu/opentextbooks/textbooks/how-to-think-like-a-computer-scientist-learning-with-python) | Interactive | 初級 | CC BY-SA | [GitHub](https://github.com/RunestoneInteractive/thinkcspy) | ★★★★☆ | **ブラウザ内実行型**: 本文内でPythonコードを直接修正・実行できるRunestone対話型教本。 |
| 23 | [The Missing Semester of Your CS Education](https://missing.csail.mit.edu/) | Tutorial | 初〜中級 | CC BY-NC-SA 4.0 | [GitHub](https://github.com/missing-semester/missing-semester) | ★★★☆☆ | **実務ツール特化型**: シェル、Vim、Git、SSHなど大学の講義で省かれがちなツール活用を網羅。 |
| 24 | [A Byte of Python](https://open.umn.edu/opentextbooks/textbooks/a-byte-of-python) | Textbook | 初級 | CC BY-SA 4.0 | [GitHub](https://github.com/swaroopch/byte-of-python) | ★★★★☆ | **軽量入門型**: 無駄を極限まで削ぎ落とし、最短でプログラミングの基礎文法を習得させる。 |
| 25 | [Python for Everybody](https://open.umn.edu/opentextbooks/textbooks/python-for-everybody-exploring-data-using-python-3) | Textbook | 初級 | CC BY-NC-SA | [GitHub](https://github.com/csev/py4e) | ★★★☆☆ | **非情報系向け設計**: プログラミング完全初心者がデータ収集・処理を楽しめる構成。 |
| 26 | [The Rust Programming Language](https://doc.rust-lang.org/book/) | Textbook | 中級 | MIT / Apache 2.0 | [GitHub](https://github.com/rust-lang/book) | ★★★★★ | **エラー駆動学習型**: 所有権などの難解概念を、コンパイラエラーを直すプロセスを通して解説。 |
| 27 | [Crafting Interpreters](https://craftinginterpreters.com/) | Textbook/Lab | 中〜上級 | コードMIT (本文著者権) | [GitHub](https://github.com/munificent/craftinginterpreters) | ★★★☆☆ | **2周反復型**: JavaによるAST走査型とCによるバイトコードVM型の2段階で言語処理系を自作。 |
| 28 | [The Book of Shaders](https://thebookofshaders.com/) | Interactive | 初〜中級 | コードMIT (本文著者権) | [GitHub](https://github.com/patriciogonzalezvivo/thebookofshaders) | ★★★☆☆ | **リアルタイム描画連動**: 本文中のGLSLコードを書き換えると背景グラフィックスが即座に変形。 |
| 29 | [Learn Git Branching](https://learngitbranching.js.org/) | Interactive | 初〜中級 | MIT | [GitHub](https://github.com/pcottle/learnGitBranching) | ★★★★★ | **視覚シミュレーション**: Gitのブランチ操作やリベースをツリーの視覚的アニメーションで体得。 |
| 30 | [FreeCodeCamp Curriculum](https://www.freecodecamp.org/) | Interactive | 初級〜実務 | CC BY-SA 4.0 | [GitHub](https://github.com/freeCodeCamp/freeCodeCamp) | ★★★★☆ | **マイクロ演習型**: 小さなタスクの積み重ねと即時テスト通過によるゲーミフィケーション学習。 |
| 31 | [Full Stack Open (Univ. of Helsinki)](https://fullstackopen.com/) | Lab/Course | 初〜中級 | CC BY-NC-SA 3.0 | [GitHub](https://github.com/clauderic/react-sortable-hoc) | ★★★☆☆ | **提出・自動テスト連動型**: React, Node, TypeScript, CI/CDまでを実践演習と自動採点で完走。 |
| 32 | [MDN Web Docs & Curriculum](https://developer.mozilla.org/) | Tutorial/Ref | 初〜中級 | CC BY-SA 2.5+ | [GitHub](https://github.com/mdn) | ★★★★☆ | **標準Webリファレンス**: 仕様書の難解さを排し、生きたHTML/CSS/JSの作法と対話型エディタを統合。 |
| 33 | [W3C WAI Web Accessibility Tutorials](https://www.w3.org/WAI/tutorials/) | Tutorial | 初〜中級 | CC BY 4.0 | [GitHub](https://github.com/w3c/wai-tutorials) | ★★★★★ | **Bad/Good対比型**: メニューやフォーム等のUI部品について「アクセシブルでない例」と「改善コード」を対比。 |

---

### 4. AI・機械学習・深層学習・データサイエンス

| No | 教材名（リンク） | 形式 | 難易度 | ライセンス | ソース | 再利用性 | 教材設計パターン・品質評価 |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| 34 | [Dive into Deep Learning (D2L.ai)](https://d2l.ai/) | Interactive | 中〜上級 | CC BY-SA 4.0 / Apache 2.0 | [GitHub](https://github.com/d2l-ai/d2l-en) | ★★★★☆ | **多フレームワーク完全並走型**: 数式・解説・実行コード（PyTorch/TF/JAX）が完全同期した対話型教本。 |
| 35 | [Hugging Face Course](https://huggingface.co/learn/nlp-course/) | Tutorial | 初〜中級 | CC BY 4.0 / Apache 2.0 | [GitHub](https://github.com/huggingface/course) | ★★★★★ | **エコシステム直結型**: トークナイザやTransformersの仕組みをブラウザ/Colabで即座に動かせる。 |
| 36 | [Practical Deep Learning for Coders (fast.ai)](https://course.fast.ai/) | Lab/Video | 初〜中級 | GPL / CC BY-NC-SA | [GitHub](https://github.com/fastai) | ★★★☆☆ | **トップダウン逆転学習**: 理論や数式を後回しにし、「まず数行で最先端モデルを動かす」構成。 |
| 37 | [Introduction to Modern Statistics (IMS)](https://openintro-ims.netlify.app/) | Interactive | 初〜中級 | CC BY-SA 4.0 | [GitHub](https://github.com/openintrostat/ims) | ★★★★☆ | **シミュレーション推論型**: R/tidyverse を用いて乱数生成・ブートストラップから入る現代的統計。 |
| 38 | [OpenIntro Statistics](https://www.openintro.org/book/os/) | Textbook | 初〜中級 | CC BY-SA 3.0 | [GitHub](https://github.com/openintrostat/openintro-statistics) | ★★★★☆ | **実データセット重視**: 実社会のオープンデータを用い、確率論から検定までを堅実に解説。 |
| 39 | [Learning Statistics with R](https://learningstatisticswithr.com/) | Textbook | 初級 | CC BY-SA 4.0 | [GitHub](https://github.com/djnavarro/lsr) | ★★★★☆ | **不安解消・対話型語り口**: 数学への苦手意識を持つ学習者に寄り添う語り口と心理学の実例。 |
| 40 | [The Turing Way](https://the-turing-way.netlify.app/) | Handbook | 中〜上級 | CC BY 4.0 | [GitHub](https://github.com/alan-turing-institute/the-turing-way) | ★★★★★ | **再現性ガイドブック**: 研究・データ解析におけるバージョン管理、テスト、倫理の国際標準。 |
| 41 | [Python Data Science Handbook](https://jakevdp.github.io/PythonDataScienceHandbook/) | Interactive | 中級 | CC BY-NC-ND / コードMIT | [GitHub](https://github.com/jakevdp/PythonDataScienceHandbook) | ★★★☆☆ | **Jupyter完全統合型**: NumPy, Pandas, Matplotlib, Scikit-Learnの標準的な使い方を網羅。 |
| 42 | [Computational and Inferential Thinking (Data 8)](https://inferentialthinking.com/) | Interactive | 初級 | CC BY-NC-ND 4.0 | [GitHub](https://github.com/data-8/textbook) | ★★★☆☆ | **文理融合データ思考**: UCバークレー発。数学前提を削り、Pythonによる計算推論を教える。 |
| 43 | [OpenStax Introductory Statistics](https://openstax.org/books/introductory-statistics/) | Textbook | 初級 | CC BY 4.0 | [GitHub](https://github.com/openstax) | ★★★★★ | **標準導入型**: 一般的な大学統計入門講義に完全に合わせた定義・公式・手順の整理。 |
| 44 | [Collaborative Statistics](https://open.umn.edu/opentextbooks/) | Textbook | 初級 | CC BY | Web公開 | ★★★★★ | **用語・リファレンス充実**: グロッサリーとインデックスが非常に細かく整備されたオープン統計書。 |
| 45 | [Classical Numerical Methods in Scientific Computing](https://open.umn.edu/opentextbooks/textbooks/classical-numerical-methods-in-scientific-computing) | Textbook | 中〜上級 | CC BY 4.0 | Web公開 | ★★★★★ | **微分方程式・数値解析**: デルフト工科大による、有限差分法や熱伝導・波動計算の基礎。 |
| 46 | [StatQuest Visual Notes](https://statquest.org/) | Visual Guide | 初〜中級 | 無料公開 | Web公開 | ★★☆☆☆ | **極限図解型**: 複雑な機械学習アルゴリズムを数式なしのステップ図解で直観的に理解。 |

---

### 5. 対話型可視化（Explorable Explanations）＆ 実践・自作系（Build Your Own / Security）

| No | 教材名（リンク） | 形式 | 難易度 | ライセンス | ソース | 再利用性 | 教材設計パターン・品質評価 |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| 47 | [Bartosz Ciechanowski's Interactive Articles](https://ciechanow.ski/) | Interactive | 初〜中級 | 無料公開（コード公開） | Web公開 | ★★☆☆☆ | **極限の動的解説（Explorable）**: 歯車、音波、カメラ、GPS等の動作原理を自作WebGLモデルで直観操作。 |
| 48 | [Red Blob Games](https://www.redblobgames.com/) | Interactive | 初〜中級 | CC BY 4.0 / MIT | [GitHub](https://github.com/redblobgames) | ★★★★★ | **アルゴリズム対話型解体**: A*経路探索や六角形グリッドの計算幾何を、スライダーと動的描画で体得。 |
| 49 | [Distill.pub](https://distill.pub/) | Interactive | 中〜上級 | CC BY 4.0 | [GitHub](https://github.com/distillpub) | ★★★★★ | **対話型学術解説の金字塔**: CNNの特徴抽出やRNNの注意機構をインタラクティブなUIで視覚化。 |
| 50 | [VisuAlgo](https://visualgo.net/) | Interactive | 初〜中級 | 無料公開（教育利用可） | Web公開 | ★★☆☆☆ | **データ構造・探索の動的追跡**: ソート、二分探索木、グラフアルゴリズムの動作ステップを完全アニメ化。 |
| 51 | [Explained Visually (setosa.io)](https://setosa.io/ev/) | Interactive | 初〜中級 | オープン | [GitHub](https://github.com/setosa) | ★★★★☆ | **統計・数学の直観可視化**: 主成分分析（PCA）やマルコフ連鎖をドラッグ操作で体感させるWeb教材。 |
| 52 | [Ray Tracing in One Weekend](https://raytracing.github.io/) | Lab/Text | 初〜中級 | CC0（Public Domain） | [GitHub](https://github.com/RayTracing/raytracing.github.io) | ★★★★★ | **週末ミニマム完結型**: 最小限のC++コードで光線追跡と美麗なCG画像をゼロから構築する名著。 |
| 53 | [Build Your Own X](https://github.com/codecrafters-io/build-your-own-x) | Project Index | 中〜上級 | MIT | [GitHub](https://github.com/codecrafters-io/build-your-own-x) | ★★★★★ | **再発明リバースエンジニアリング**: Git, Docker, OS, 3Dエンジン等をゼロから自作する優良チュートリアル集。 |
| 54 | [Cryptopals Crypto Challenges](https://cryptopals.com/) | Lab/Project | 中〜上級 | 無料公開 | Web公開 | ★★☆☆☆ | **攻撃主導型暗号学習**: AESやRSAの欠陥を実際にハッキング・解読しながら暗号学の急所を学ぶ。 |
| 55 | [OverTheWire (Bandit)](https://overthewire.org/wargames/bandit/) | Interactive/Game | 初〜中級 | 無料公開 | Web公開 | ★★☆☆☆ | **Wargame型Linux演習**: SSH接続して各階層のパスワードをLinuxコマンドを駆使して探し出すゲーミフィケーション。 |

---

### 6. 数学（代数・微積分・離散数学・線形代数）

| No | 教材名（リンク） | 形式 | 難易度 | ライセンス | ソース | 再利用性 | 教材設計パターン・品質評価 |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| 56 | [Active Calculus](https://activecalculus.org/) | Interactive | 中級 | CC BY-SA 4.0 | [GitHub](https://github.com/ActiveCalculus) | ★★★★☆ | **事前課題＋能動演習型**: 講義前の「Preview Activity」と能動的思考を促すPreTeXt対話型教本。 |
| 57 | [Discrete Mathematics: An Open Introduction](https://discrete.openmathbooks.org/dmoi4.html) | Interactive | 中級 | CC BY-SA 4.0 | [GitHub](https://github.com/oscarlevin/dmoi) | ★★★★☆ | **CS接続型離散数学**: 750問以上の演習を収録。証明とグラフ理論、論理の接続が極めて論理的。 |
| 58 | [Hefferon: Linear Algebra](https://hefferon.net/linearalgebra/) | Textbook | 中級 | CC BY-SA 4.0 | [GitLab](https://gitlab.com/jim.hefferon/linear-algebra) | ★★★★☆ | **完全自習完備型**: 全問詳細解答、講義スライド、実験ラボコードが完備されたOERの模範。 |
| 59 | [Understanding Linear Algebra](https://understandinglinearalgebra.org/) | Interactive | 中級 | CC BY 4.0 | [GitHub](https://github.com/davidaustinm/ula) | ★★★★★ | **SageMath計算連動**: ブラウザ上で幾何学的変換や数値計算を即座に動かせる対話型線形代数。 |
| 60 | [A Cool Brisk Walk Through Discrete Math](https://open.umn.edu/opentextbooks/textbooks/843) | Textbook | 初〜中級 | CC BY-SA | Web公開 | ★★★★☆ | **短編エッセンス型**: 冗長さを省き、短期間で離散構造の基礎を駆け抜ける構成。 |
| 61 | [AIM Approved Open Textbooks](https://textbooks.aimath.org/textbooks/approved-textbooks/) | Catalog | 全学年 | 各種オープン | Web公開 | ★★★★★ | **査読済みカタログ**: アメリカ数学研究所（AIM）が厳格な審査基準で認定した良書リスト。 |
| 62 | [OpenStax College Algebra](https://openstax.org/books/college-algebra/) | Textbook | 初級 | CC BY 4.0 | [GitHub](https://github.com/openstax) | ★★★★★ | **前提知識ケア型**: 基礎代数から関数論まで、つまずきやすいポイントを豊富な例題でサポート。 |
| 63 | [OpenStax Calculus Vol 1-3](https://openstax.org/books/calculus-volume-1/) | Textbook | 中級 | CC BY 4.0 | [GitHub](https://github.com/openstax) | ★★★★★ | **大学標準微積分**: 1変数から多変数・ベクトル解析まで網羅する高品質教科書。 |
| 64 | [APEX Calculus](https://www.apexcalculus.com/) | Textbook | 中級 | CC BY-NC | [GitHub](https://github.com/APEXCalculus) | ★★★☆☆ | **3D図版・視覚重視**: グラフや立体の可視化に優れ、直観的な幾何理解を助ける微積分教科書。 |
| 65 | [Discrete Math with SageMath](https://open.umn.edu/opentextbooks/textbooks/discrete-math-with-sagemath-learn-math-with-open-source-software) | Lab/Text | 中級 | CC BY 4.0 | Web公開 | ★★★★★ | **オープンソース数式処理連動**: 理論とSageMathによる実践コードを並走させる設計。 |

---

### 7. 物理学・天文学

| No | 教材名（リンク） | 形式 | 難易度 | ライセンス | ソース | 再利用性 | 教材設計パターン・品質評価 |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| 66 | [PhET Interactive Simulations](https://phet.colorado.edu/) | Interactive | 初〜中級 | CC BY 4.0 / GPL | [GitHub](https://github.com/phetsims) | ★★★★★ | **探究シミュレーション**: パラメータを操作して法則を発見させる研究ベースの対話型教材。 |
| 67 | [OpenStax College Physics 2e](https://openstax.org/books/college-physics-2e/) | Textbook | 初級 | CC BY 4.0 | [GitHub](https://github.com/openstax) | ★★★★★ | **代数ベース物理**: 微積分不要。医療・生物系や日常の現象と結びつけた概念重視の構成。 |
| 68 | [OpenStax University Physics Vol 1-3](https://openstax.org/books/university-physics-volume-1/) | Textbook | 中級 | CC BY 4.0 | [GitHub](https://github.com/openstax) | ★★★★★ | **微積分ベース物理**: 理工系学部の標準2〜3学期分（力学・電磁気・熱・波動・量子）を網羅。 |
| 69 | [OpenStax Astronomy 2e](https://openstax.org/books/astronomy-2e/) | Textbook | 初級 | CC BY 4.0 | [GitHub](https://github.com/openstax) | ★★★★★ | **ビジュアル天文学**: NASA等の高解像度写真と観測データをフルカラーで配した入門書。 |
| 70 | [Light and Matter (Benjamin Crowell)](http://www.lightandmatter.com/) | Textbook | 初〜中級 | CC BY-SA 3.0 | [GitHub](https://github.com/bcrowell) | ★★★★☆ | **思考実験重視型**: 機械的な公式暗記を排し、物理的な因果関係と概念モデルの構築を重視。 |
| 71 | [Physics LibreTexts](https://phys.libretexts.org/) | OER Portal | 全学年 | CC BY-NC-SA 等 | [LibreTexts](https://libretexts.org/) | ★★★☆☆ | **OERメガポータル**: 各大学の物理講義ノートや教科書を章単位でremix・編集可能。 |
| 72 | [David Tong: Lectures on Theoretical Physics](https://www.damtp.cam.ac.uk/user/tong/teaching.html) | Lecture Notes | 上級 | 無料公開 | Web公開 | ★★☆☆☆ | **理論物理の最高峰講義録**: ケンブリッジ大の古典力学から場の量子論、弦理論まで。 |
| 73 | [MIT OCW: Introductory Science & Math](https://ocw.mit.edu/) | Courseware | 中級 | CC BY-NC-SA 4.0 | Web公開 | ★★★☆☆ | **大学講義一式**: シラバス、講義動画、演習問題、試験問題と解答が完全にセット。 |
| 74 | [Mechanics Map (Penn State)](https://mechanicsmap.psu.edu/) | Interactive | 中級 | CC BY-SA 4.0 | Web公開 | ★★★★☆ | **有向グラフ概念マップ**: 力学の各単元の前提関係を有向マップ化し、動画と例題を紐付け。 |
| 75 | [Project PHYSNET](https://www.physnet.org/) | Modular | 中級 | CC BY | Web公開 | ★★★★★ | **マイクロモジュール型**: 物理学の各単元を独立した短い学習モジュール（PDF演習）に分割。 |

---

### 8. 化学・物質科学

| No | 教材名（リンク） | 形式 | 難易度 | ライセンス | ソース | 再利用性 | 教材設計パターン・品質評価 |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| 76 | [OpenStax Chemistry 2e](https://openstax.org/books/chemistry-2e/) | Textbook | 中級 | CC BY 4.0 | [GitHub](https://github.com/openstax) | ★★★★★ | **大学一般化学標準**: 原子の構造から熱力学・平衡・有機化学の基礎までを網羅。 |
| 77 | [LearnChemE (CU Boulder)](https://learncheme.com/) | Tutorial/Sim | 中〜上級 | オープン (NSF支援) | Web公開 | ★★★★☆ | **5分スクリーキャスト**: 短い手書き解説動画とExcel/Mathematicaシミュレーションのセット。 |
| 78 | [Chemistry: Atoms First 2e (OpenStax)](https://openstax.org/books/chemistry-atoms-first-2e/) | Textbook | 中級 | CC BY 4.0 | [GitHub](https://github.com/openstax) | ★★★★★ | **微視的先行アプローチ**: 原子の量子力学的構造からスタートし、巨視的な化学反応へ進む順序。 |
| 79 | [Organic Chemistry with a Biological Emphasis](https://open.umn.edu/opentextbooks/textbooks/organic-chemistry-with-a-biological-emphasis-volume-i) | Textbook | 中〜上級 | CC BY-NC-SA 4.0 | Web公開 | ★★★☆☆ | **生化学接続型有機化学**: 合成化学だけでなく、生体内の酵素反応機構を有機化学的に解説。 |
| 80 | [Analytical Chemistry 2.1 (David Harvey)](https://open.umn.edu/opentextbooks/textbooks/analytical-chemistry-2-1) | Textbook | 中級 | CC BY-NC-SA 4.0 | Web公開 | ★★★☆☆ | **実験誤差・データ解析統合**: 滴定や分光分析の計測理論と統計的データ処理を詳細に網羅。 |
| 81 | [Molecular Workbench](http://mw.concord.org/modeler/) | Interactive | 初〜中級 | CC BY 4.0 / Open Source | [GitHub](https://github.com/concord-consortium) | ★★★★★ | **分子動力学シミュレータ**: 分子間力や気体分子の運動をリアルタイムに視覚化・実験。 |
| 82 | [ChemLibreTexts](https://chem.libretexts.org/) | OER Portal | 全学年 | CC BY-NC-SA 等 | [LibreTexts](https://libretexts.org/) | ★★★☆☆ | **世界最大の化学OER**: 無機・有機・物理化学・生化学・機器分析の教材を網羅。 |
| 83 | [Scientific Computing for Chemists with Python](https://open.umn.edu/opentextbooks/textbooks/scientific-computing-for-chemists-with-python) | Lab/Text | 中級 | CC BY-NC-SA | Web公開 | ★★★☆☆ | **化学データ処理実践**: 実験スペクトルのフィッティングや量子化学計算をJupyterで実践。 |
| 84 | [Virtual Chemistry Experiments](https://chemdemos.uoregon.edu/) | Lab | 初〜中級 | オープン | Web公開 | ★★★★☆ | **対話型仮想実験室**: 危険・高コストな化学実験を動画とシミュレーションで疑似体験。 |
| 85 | [Concepts of Chemical Engineering 4 Kids](https://learncheme.com/) | Unplugged | 初級 | CC BY | Web公開 | ★★★★★ | **身近なアナロジー**: 物質収支や熱交換の原理を料理や日常の遊びに例えて解説。 |

---

### 9. 生物学・生命科学・地球環境

| No | 教材名（リンク） | 形式 | 難易度 | ライセンス | ソース | 再利用性 | 教材設計パターン・品質評価 |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| 86 | [OpenStax Biology 2e](https://openstax.org/books/biology-2e/) | Textbook | 中級 | CC BY 4.0 | [GitHub](https://github.com/openstax) | ★★★★★ | **生物学大系教本**: 細胞、遺伝、進化、動植物の生理、生態学までを網羅する主教科書。 |
| 87 | [OpenStax Concepts of Biology](https://openstax.org/books/concepts-biology/) | Textbook | 初級 | CC BY 4.0 | [GitHub](https://github.com/openstax) | ★★★★★ | **教養リテラシー型**: 非専攻者向け。感染症やバイオテクノロジーなど社会課題と結びつける。 |
| 88 | [OpenStax Anatomy and Physiology 2e](https://openstax.org/books/anatomy-and-physiology-2e/) | Textbook | 中級 | CC BY 4.0 | [GitHub](https://github.com/openstax) | ★★★★★ | **医療臨床ケーススタディ**: 人体器官の精密な図解と、臨床での疾患事例を融合。 |
| 89 | [OpenStax Microbiology](https://openstax.org/books/microbiology/) | Textbook | 中級 | CC BY 4.0 | [GitHub](https://github.com/openstax) | ★★★★★ | **微生物・免疫学**: 病原体の基礎知識から免疫応答、抗菌薬の作用機序までを体系化。 |
| 90 | [OpenGeology: Introduction to Geology](https://opengeology.org/) | Interactive | 初〜中級 | CC BY-NC-SA 4.0 | Web公開 | ★★★☆☆ | **動的Web地質学**: 高解像度岩石写真、3Dモデル、対話型クイズが埋め込まれたモダン教科書。 |
| 91 | [Introduction to Climate Science (Oregon State)](https://open.oregonstate.education/climatescience/) | Textbook | 初〜中級 | CC BY-NC | Web公開 | ★★★☆☆ | **気候変動科学**: IPCC報告書に準拠し、放射強制力や炭素循環モデルを平易に解説。 |
| 92 | [Introduction to Earth Science (Virginia Tech)](https://pressbooks.lib.vt.edu/introearthscience/) | Textbook | 初級 | CC BY-NC-SA 4.0 | Web公開 | ★★★☆☆ | **フルカラー地球科学**: プレートテクトニクス、気象、海洋、宇宙を Pressbooks で美しく組版。 |
| 93 | [BioLibreTexts](https://bio.libretexts.org/) | OER Portal | 全学年 | CC BY-NC-SA 等 | [LibreTexts](https://libretexts.org/) | ★★★☆☆ | **生物学OER集成**: 分子生物学から生態学まで、世界中の大学の講義資料を再編成可能。 |
| 94 | [BioInteractive (HHMI)](https://www.biointeractive.org/) | Lab/Video | 初〜中級 | CC BY-NC-SA 4.0 | Web公開 | ★★★☆☆ | **研究者データ追体験**: 実際の学術論文データを元にした仮想実験と短編ドキュメンタリー。 |
| 95 | [Computational Genomics Tutorial](https://compgenomr.github.io/book/) | Lab/Text | 上級 | CC BY-NC-SA 4.0 | [GitHub](https://github.com/compgenomr/book) | ★★★☆☆ | **バイオインフォ実践**: Rを用いた次世代シーケンス（NGS）データ解析の完全チュートリアル。 |

---

### 10. 工学・力学・電気電子システム

| No | 教材名（リンク） | 形式 | 難易度 | ライセンス | ソース | 再利用性 | 教材設計パターン・品質評価 |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| 96 | [Engineering Statics: Open and Interactive](https://engineeringstatics.org/) | Interactive | 中級 | CC BY-NC-SA | [GitHub](https://github.com/DanBakerGeo/Statics) | ★★★☆☆ | **3Dモデル埋め込み型**: PreTeXtで作成され、力の釣り合いやモーメントを3Dで視覚操作。 |
| 97 | [Engineering Computations (EngComp)](https://github.com/engineersCode/EngComp) | Lab/Text | 初〜中級 | CC BY 4.0 / MIT | [GitHub](https://github.com/engineersCode/EngComp) | ★★★★★ | **計算工学モジュール**: Python/Jupyterで機械・流体・構造計算を段階的に学ぶ優良教材。 |
| 98 | [A First Course in Electrical & Computer Eng.](https://open.umn.edu/opentextbooks/textbooks/a-first-course-in-electrical-and-computer-engineering) | Textbook | 初〜中級 | CC BY 3.0 | Web公開 | ★★★★★ | **数学から工学への架橋**: 複素数や正弦波から回路理論・信号処理・論理回路へスムーズに導入。 |
| 99 | [Engineering at Alberta Courses](https://engcourses-uofa.ca/) | Courseware | 中〜上級 | CC BY-SA / CC BY | Web公開 | ★★★★☆ | **大学工学講義集**: アルバータ大の熱力学・流体力学・構造力学の講義ノートとコードを公開。 |
| 100 | [Engineering: An Introduction for High School](https://k12.libretexts.org/Bookshelves/Science_and_Technology/Engineering%3A_An_Introduction_for_High_School) | Textbook | 初級 | CC BY-NC-SA | [LibreTexts](https://libretexts.org/) | ★★★☆☆ | **工学導入・デザイン思考**: 高度な数式を使わず、「社会課題を工学でどう解決するか」を提示。 |
| 101 | [Engineering Mechanics: Statics](https://open.umn.edu/opentextbooks/textbooks/engineering-mechanics-statics) | Textbook | 中級 | CC BY-NC-SA | Web公開 | ★★★☆☆ | **標準静力学**: 大学工学部のシラバスに完全に準拠した論理的章立てと豊富な例題。 |
| 102 | [Electromechanical Systems](https://open.umn.edu/opentextbooks/textbooks/electromechanical-systems-1st-edition) | Textbook | 中級 | CC BY-NC-SA | Web公開 | ★★★☆☆ | **機電一体型教材**: モーター、アクチュエータ、センサ、計測回路を横断的に1冊で学ぶ。 |
| 103 | [Radio Systems Engineering](https://open.umn.edu/opentextbooks/textbooks/radio-systems-engineering) | Textbook | 上級 | CC BY-NC 4.0 | Web公開 | ★★★☆☆ | **高周波・無線工学**: 理論と実機設計の乖離を埋めるCambridge大出版の本格オープン教科書。 |
| 104 | [Principles of Semiconductor Devices](https://ecee.colorado.edu/~bart/book/) | Interactive | 上級 | オープン | Web公開 | ★★★★☆ | **半導体物性対話型**: エネルギーバンド図やPN接合の特性曲線をブラウザ上で即座に計算・描画。 |
| 105 | [LibreTexts Engineering](https://eng.libretexts.org/) | OER Portal | 全学年 | CC BY-NC-SA 等 | [LibreTexts](https://libretexts.org/) | ★★★☆☆ | **工学OER統合基盤**: 材料力学、流体力学、制御工学、ロボティクス等の教材を集成。 |

---

### 11. 哲学・論理学・批判的思考

| No | 教材名（リンク） | 形式 | 難易度 | ライセンス | ソース | 再利用性 | 教材設計パターン・品質評価 |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| 106 | [Open Logic Project](https://openlogicproject.org/) | Modular | 中〜上級 | CC BY 4.0 | [GitHub](https://github.com/OpenLogicProject/OpenLogic) | ★★★★★ | **ソースファースト・モジュール型**: LaTeXソースが高度に部品化され、講義に合わせ自動ビルド。 |
| 107 | [forall x: Calgary](https://forallx.openlogicproject.org/) | Textbook | 初〜中級 | CC BY 4.0 | [GitHub](https://github.com/OpenLogicProject/forallx-yyc) | ★★★★★ | **形式論理のオープン標準**: 命題論理・述語論理・自然演繹。世界中で派生版（remix）が作られる。 |
| 108 | [Rebus: Introduction to Philosophy Series](https://press.rebus.community/intro-to-phil-ethics/) | Textbook | 初級 | CC BY 4.0 | [GitHub](https://github.com/RebusCommunity) | ★★★★★ | **分冊型アンソロジー**: 倫理学・認識論・論理学・心の哲学など全9巻を独立した専門家が執筆。 |
| 109 | [A Concise Introduction to Logic (Craig DeLancey)](https://milnepublishing.geneseo.edu/concise-introduction-to-logic/) | Textbook | 初級 | CC BY-NC-SA 4.0 | Web公開 | ★★★☆☆ | **哲学史連動論理学**: 哲学史上の著名な論証（神の存在証明等）を題材に論理規則を学ぶ。 |
| 110 | [Logic and Critical Thinking (Matthew Van Cleave)](https://open.umn.edu/opentextbooks/) | Textbook | 初級 | CC BY 4.0 | Web公開 | ★★★★★ | **実践的議論分析**: 認知バイアス、論理的誤謬（Fallacy）、議論の再構成に焦点を当てた実用書。 |
| 111 | [1000-Word Philosophy](https://1000wordphilosophy.com/) | Short Essay | 初級〜一般 | CC BY-NC-ND 等 | Web公開 | ★★☆☆☆ | **厳密短編形式**: 難解な哲学的議論を「1,000語ちょうど」で簡潔かつ厳密に解説する連載集。 |
| 112 | [Stanford Encyclopedia of Philosophy (SEP)](https://plato.stanford.edu/) | Reference | 学部〜研究者 | 無料公開 (独自規約) | Web公開 | ★★☆☆☆ | **世界最高峰の学術事典**: 第一線の研究者が執筆・査読・更新する信頼性最強のリファレンス。 |
| 113 | [OpenStax Introduction to Philosophy](https://openstax.org/books/introduction-philosophy/) | Textbook | 初級 | CC BY-NC-SA 4.0 | [GitHub](https://github.com/openstax) | ★★★☆☆ | **世界哲学を包含した概論**: 西洋哲学だけでなく東洋・先住民族の思想も含めた現代的構成。 |
| 114 | [Open Yale Courses: Political Philosophy](https://oyc.yale.edu/) | Courseware | 初級〜一般 | CC BY-NC-SA | Web公開 | ★★★☆☆ | **名物講義アーカイブ**: プラトンから現代までの全講義動画・音声・テキスト文字起こしを公開。 |
| 115 | [Wireless Philosophy (Wi-Phi)](https://www.wi-phi.com/) | Video/Anim | 初級 | 無料公開 | Web公開 | ★★☆☆☆ | **短編アニメーション解説**: 難解な哲学トピックを5〜10分の親しみやすいアニメで可視化。 |

---

## 3. 自作教材に組み込むための設計戦略

### 1. 「Hands-on（手を動かす）」×「OER（理論教科書）」のハイブリッド構成
* **電子工作・ハードウェア**:
  * 実装・配線: [SparkFun Learn](https://learn.sparkfun.com/tutorials/) / [Adafruit](https://learn.adafruit.com/)
  * 原理・回路計算: [All About Circuits](https://www.allaboutcircuits.com/textbook/)
* **コンピュータサイエンス・アルゴリズム**:
  * 概念体験: [CS Unplugged](https://www.csunplugged.org/) / [VisuAlgo](https://visualgo.net/)
  * 理論・データ構造: [An Open Guide to Data Structures & Algorithms](https://open.umn.edu/opentextbooks/textbooks/1017)
  * 実装・再発明: [Build Your Own X](https://github.com/codecrafters-io/build-your-own-x) / [Nand2Tetris](https://www.nand2tetris.org/)
* **AI・データサイエンス**:
  * ライブコーディング: [The Carpentries](https://carpentries.org/lessons/) / [fast.ai](https://course.fast.ai/)
  * 理論・数式連動: [Dive into Deep Learning](https://d2l.ai/) / [Introduction to Modern Statistics](https://openintro-ims.netlify.app/)
  * 直観可視化: [Distill.pub](https://distill.pub/) / [Explained Visually](https://setosa.io/ev/)

### 2. 教材ビルドツールの選定マトリクス

| ツール | 最適な教材タイプ | 特徴・メリット | 採用例 |
| :--- | :--- | :--- | :--- |
| **PreTeXt** | 数学・物理・工学（演習重視） | Web・PDF・点字へ一元出力。対話型WeBWorKやSageMathと統合。 | Active Calculus, Engineering Statics |
| **Jupyter Book / MyST** | データ科学・AI・計算工学 | MarkdownとJupyter Notebookを統合。コード実行結果・Plotly等の埋め込み。 | D2L.ai, The Turing Way, EngComp |
| **Quarto** | 論文・多言語データ分析教本 | R, Python, Julia, Observable JSを単一文書で扱える次世代出版システム。 | 各種モダンデータ科学コース |
| **Pressbooks** | 人文科学・社会科学・読み物 | WordPressベースの美しい組版。Web・EPUB・PDF出力に対応。 | Rebus Community, Open Education OER |
| **Custom Web (WebGL/D3)** | Explorable Explanations | スライダーやドラッグ操作に応じた完全動的な描画。 | Bartosz Ciechanowski, Red Blob Games |

### 3. ライセンスの混在（Mix & Match）ルール
1. **ベースは `CC BY` または `MIT / Apache 2.0` を推奨**:
   * 商用展開（有償セミナー、有料プラットフォーム、書籍化等）や将来的な拡張に対して最も制限が少ない。
2. **`CC BY-SA` の素材を取り込む場合**:
   * 「同一ライセンス継承（ShareAlike）」義務が発生するため、自作教材全体も `CC BY-SA` で公開する必要がある。
3. **`CC BY-NC` / `CC BY-NC-SA` の素材を取り込む場合**:
   * 非営利目的に制限されるため、営利企業での研修・有料スクール等での使用が不可となる点に注意。
4. **`CC BY-ND` の素材**:
   * 改変が禁止されているため、教材内での抜粋・再構成は行えず、外部リンクや参照としての紹介に留める。
