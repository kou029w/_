# オープン教材・OER 設計リファレンスカタログ（初級・全年齢版 66選）

[決定版115選](oer_catalog.md)のうち、**難易度に「初級」を含む教材、または「全学年」対応のポータル教材**のみに絞り込んだ版です。中級者のみ・上級者のみを対象とする教材（難易度が「中級」単独、「中〜上級」「上級」のみ等）は除外しています。

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
* **`初〜中級` / `初級〜実務` / `初級〜一般`**: 初級から始まり、発展的内容も含むもの
* **`全学年`**: 全レベルの教材を横断的に集成したポータル（初級コンテンツを含む）

### 再利用性（★評価・ライセンス）
* **`★★★★★`**: CC BY / MIT / Apache 2.0 / CC0 (PD) — 商用・改変・抜粋・二次配布が極めて自由
* **`★★★★☆`**: CC BY-SA — 改変・商用利用可能だが、派生物にも同一ライセンスの継承が必要
* **`★★★☆☆`**: CC BY-NC / CC BY-NC-SA — 非営利目的に限定（教育・個人利用は改変可、商用利用不可）
* **`★★☆☆☆`**: CC BY-NC-ND / 無料公開のみ — 改変不可・転載制限あり、閲覧・学習リファレンス向け

---

## 2. 分野別教材カタログ（初級・全年齢版 66選）

### 1. 電子工作・組み込み・IoT（Physical Computing）

| No | 教材名（リンク） | 形式 | 難易度 | ライセンス | ソース | 再利用性 | 教材設計パターン・品質評価 |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| 1 | [SparkFun Learn](https://learn.sparkfun.com/tutorials/) | Tutorial | 初級 | CC BY-SA 4.0 | [GitHub](https://github.com/sparkfun) | ★★★★☆ | **フックアップ型**: 回路図・写真・コード・トラブルシューティングの導線が完成されている。 |
| 2 | [Adafruit Learning System](https://learn.adafruit.com/) | Tutorial | 初級 | CC BY-SA / MIT | [GitHub](https://github.com/adafruit) | ★★★★☆ | **部品連動型**: CircuitPythonとハードを直結。「まず動かし、後から原理」の構成。 |
| 3 | [Raspberry Pi Projects](https://projects.raspberrypi.org/) | Project | 初級 | CC BY-SA | [GitHub](https://github.com/RaspberryPiFoundation) | ★★★★☆ | **ゴール提示型**: 「何を作るか」「必要なもの」「手順」「挑戦」の4層構造で子供でも自走可能。 |
| 4 | [Arduino Docs](https://docs.arduino.cc/) | Tutorial | 初級 | CC BY-SA 4.0 | [GitHub](https://github.com/arduino/docs-content) | ★★★★☆ | **標準リファレンス型**: 公式ハードの仕様と実践スケッチが有機的に統合された入門教材。 |
| 5 | [All About Circuits: Textbooks](https://www.allaboutcircuits.com/textbook/) | Textbook | 初〜上級 | オープン (Design Science) | [Web](https://www.allaboutcircuits.com/textbook/) | ★★★★☆ | **大系教本型**: 理論から回路計算まで網羅。章末の「Worksheets」が概念定着に秀逸。 |
| 6 | [MicroPython Documentation](https://docs.micropython.org/) | Tutorial | 初〜中級 | MIT | [GitHub](https://github.com/micropython/micropython) | ★★★★★ | **API連動チュートリアル**: マイコンの制約とPythonの簡潔さを対比させた実践設計。 |
| 7 | [Wokwi Documentation & Projects](https://docs.wokwi.com/) | Interactive | 初〜中級 | オープン / Free | [GitHub](https://github.com/wokwi) | ★★★★☆ | **シミュレータ埋め込み型**: 実機なしでブラウザ上で配線とコードを実行・検証できる。 |

---

### 2. コンピュータサイエンス・アーキテクチャ・OS

| No | 教材名（リンク） | 形式 | 難易度 | ライセンス | ソース | 再利用性 | 教材設計パターン・品質評価 |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| 8 | [CS Unplugged](https://www.csunplugged.org/) | Unplugged | 初級 | CC BY-SA 4.0 | [GitHub](https://github.com/uccser/cs-unplugged) | ★★★★☆ | **身体的・具体物体験型**: カードや紙で2進数やソートアルゴリズムの本質を体感させる傑作。 |
| 9 | [Computer Science Field Guide](https://www.csfieldguide.org.nz/) | Interactive | 初級 | CC BY-SA 4.0 | [GitHub](https://github.com/uccser/cs-field-guide) | ★★★★☆ | **対話型Web教科書**: ブラウザ上のインタラクティブアプレットでCS全分野を平易に解説。 |
| 10 | [OpenStax Introduction to Computer Science](https://openstax.org/books/introduction-computer-science/) | Textbook | 初級 | CC BY-NC-SA 4.0 | [GitHub](https://github.com/openstax) | ★★★☆☆ | **標準カリキュラム型**: ハード、OS、NW、セキュリティ、倫理までを広く浅くカバー。 |

---

### 3. プログラミング言語・実践ツール・Web開発

| No | 教材名（リンク） | 形式 | 難易度 | ライセンス | ソース | 再利用性 | 教材設計パターン・品質評価 |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| 11 | [The Carpentries (Software / Data / Library)](https://carpentries.org/lessons/) | Tutorial | 初級 | CC BY 4.0 | [GitHub](https://github.com/carpentries) | ★★★★★ | **認知的負荷制御型**: ライブコーディング前提。インストラクター用メモやエラー対応例が充実。 |
| 12 | [How to Think Like a Computer Scientist (Python)](https://open.umn.edu/opentextbooks/textbooks/how-to-think-like-a-computer-scientist-learning-with-python) | Interactive | 初級 | CC BY-SA | [GitHub](https://github.com/RunestoneInteractive/thinkcspy) | ★★★★☆ | **ブラウザ内実行型**: 本文内でPythonコードを直接修正・実行できるRunestone対話型教本。 |
| 13 | [The Missing Semester of Your CS Education](https://missing.csail.mit.edu/) | Tutorial | 初〜中級 | CC BY-NC-SA 4.0 | [GitHub](https://github.com/missing-semester/missing-semester) | ★★★☆☆ | **実務ツール特化型**: シェル、Vim、Git、SSHなど大学の講義で省かれがちなツール活用を網羅。 |
| 14 | [A Byte of Python](https://open.umn.edu/opentextbooks/textbooks/a-byte-of-python) | Textbook | 初級 | CC BY-SA 4.0 | [GitHub](https://github.com/swaroopch/byte-of-python) | ★★★★☆ | **軽量入門型**: 無駄を極限まで削ぎ落とし、最短でプログラミングの基礎文法を習得させる。 |
| 15 | [Python for Everybody](https://open.umn.edu/opentextbooks/textbooks/python-for-everybody-exploring-data-using-python-3) | Textbook | 初級 | CC BY-NC-SA | [GitHub](https://github.com/csev/py4e) | ★★★☆☆ | **非情報系向け設計**: プログラミング完全初心者がデータ収集・処理を楽しめる構成。 |
| 16 | [The Book of Shaders](https://thebookofshaders.com/) | Interactive | 初〜中級 | コードMIT (本文著者権) | [GitHub](https://github.com/patriciogonzalezvivo/thebookofshaders) | ★★★☆☆ | **リアルタイム描画連動**: 本文中のGLSLコードを書き換えると背景グラフィックスが即座に変形。 |
| 17 | [Learn Git Branching](https://learngitbranching.js.org/) | Interactive | 初〜中級 | MIT | [GitHub](https://github.com/pcottle/learnGitBranching) | ★★★★★ | **視覚シミュレーション**: Gitのブランチ操作やリベースをツリーの視覚的アニメーションで体得。 |
| 18 | [FreeCodeCamp Curriculum](https://www.freecodecamp.org/) | Interactive | 初級〜実務 | CC BY-SA 4.0 | [GitHub](https://github.com/freeCodeCamp/freeCodeCamp) | ★★★★☆ | **マイクロ演習型**: 小さなタスクの積み重ねと即時テスト通過によるゲーミフィケーション学習。 |
| 19 | [Full Stack Open (Univ. of Helsinki)](https://fullstackopen.com/) | Lab/Course | 初〜中級 | CC BY-NC-SA 3.0 | [GitHub](https://github.com/clauderic/react-sortable-hoc) | ★★★☆☆ | **提出・自動テスト連動型**: React, Node, TypeScript, CI/CDまでを実践演習と自動採点で完走。 |
| 20 | [MDN Web Docs & Curriculum](https://developer.mozilla.org/) | Tutorial/Ref | 初〜中級 | CC BY-SA 2.5+ | [GitHub](https://github.com/mdn) | ★★★★☆ | **標準Webリファレンス**: 仕様書の難解さを排し、生きたHTML/CSS/JSの作法と対話型エディタを統合。 |
| 21 | [W3C WAI Web Accessibility Tutorials](https://www.w3.org/WAI/tutorials/) | Tutorial | 初〜中級 | CC BY 4.0 | [GitHub](https://github.com/w3c/wai-tutorials) | ★★★★★ | **Bad/Good対比型**: メニューやフォーム等のUI部品について「アクセシブルでない例」と「改善コード」を対比。 |

---

### 4. AI・機械学習・深層学習・データサイエンス

| No | 教材名（リンク） | 形式 | 難易度 | ライセンス | ソース | 再利用性 | 教材設計パターン・品質評価 |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| 22 | [Hugging Face Course](https://huggingface.co/learn/nlp-course/) | Tutorial | 初〜中級 | CC BY 4.0 / Apache 2.0 | [GitHub](https://github.com/huggingface/course) | ★★★★★ | **エコシステム直結型**: トークナイザやTransformersの仕組みをブラウザ/Colabで即座に動かせる。 |
| 23 | [Practical Deep Learning for Coders (fast.ai)](https://course.fast.ai/) | Lab/Video | 初〜中級 | GPL / CC BY-NC-SA | [GitHub](https://github.com/fastai) | ★★★☆☆ | **トップダウン逆転学習**: 理論や数式を後回しにし、「まず数行で最先端モデルを動かす」構成。 |
| 24 | [Introduction to Modern Statistics (IMS)](https://openintro-ims.netlify.app/) | Interactive | 初〜中級 | CC BY-SA 4.0 | [GitHub](https://github.com/openintrostat/ims) | ★★★★☆ | **シミュレーション推論型**: R/tidyverse を用いて乱数生成・ブートストラップから入る現代的統計。 |
| 25 | [OpenIntro Statistics](https://www.openintro.org/book/os/) | Textbook | 初〜中級 | CC BY-SA 3.0 | [GitHub](https://github.com/openintrostat/openintro-statistics) | ★★★★☆ | **実データセット重視**: 実社会のオープンデータを用い、確率論から検定までを堅実に解説。 |
| 26 | [Learning Statistics with R](https://learningstatisticswithr.com/) | Textbook | 初級 | CC BY-SA 4.0 | [GitHub](https://github.com/djnavarro/lsr) | ★★★★☆ | **不安解消・対話型語り口**: 数学への苦手意識を持つ学習者に寄り添う語り口と心理学の実例。 |
| 27 | [Computational and Inferential Thinking (Data 8)](https://inferentialthinking.com/) | Interactive | 初級 | CC BY-NC-ND 4.0 | [GitHub](https://github.com/data-8/textbook) | ★★★☆☆ | **文理融合データ思考**: UCバークレー発。数学前提を削り、Pythonによる計算推論を教える。 |
| 28 | [OpenStax Introductory Statistics](https://openstax.org/books/introductory-statistics/) | Textbook | 初級 | CC BY 4.0 | [GitHub](https://github.com/openstax) | ★★★★★ | **標準導入型**: 一般的な大学統計入門講義に完全に合わせた定義・公式・手順の整理。 |
| 29 | [Collaborative Statistics](https://open.umn.edu/opentextbooks/) | Textbook | 初級 | CC BY | Web公開 | ★★★★★ | **用語・リファレンス充実**: グロッサリーとインデックスが非常に細かく整備されたオープン統計書。 |
| 30 | [StatQuest Visual Notes](https://statquest.org/) | Visual Guide | 初〜中級 | 無料公開 | Web公開 | ★★☆☆☆ | **極限図解型**: 複雑な機械学習アルゴリズムを数式なしのステップ図解で直観的に理解。 |

---

### 5. 対話型可視化（Explorable Explanations）＆ 実践・自作系（Build Your Own / Security）

| No | 教材名（リンク） | 形式 | 難易度 | ライセンス | ソース | 再利用性 | 教材設計パターン・品質評価 |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| 31 | [Bartosz Ciechanowski's Interactive Articles](https://ciechanow.ski/) | Interactive | 初〜中級 | 無料公開（コード公開） | Web公開 | ★★☆☆☆ | **極限の動的解説（Explorable）**: 歯車、音波、カメラ、GPS等の動作原理を自作WebGLモデルで直観操作。 |
| 32 | [Red Blob Games](https://www.redblobgames.com/) | Interactive | 初〜中級 | CC BY 4.0 / MIT | [GitHub](https://github.com/redblobgames) | ★★★★★ | **アルゴリズム対話型解体**: A*経路探索や六角形グリッドの計算幾何を、スライダーと動的描画で体得。 |
| 33 | [VisuAlgo](https://visualgo.net/) | Interactive | 初〜中級 | 無料公開（教育利用可） | Web公開 | ★★☆☆☆ | **データ構造・探索の動的追跡**: ソート、二分探索木、グラフアルゴリズムの動作ステップを完全アニメ化。 |
| 34 | [Explained Visually (setosa.io)](https://setosa.io/ev/) | Interactive | 初〜中級 | オープン | [GitHub](https://github.com/setosa) | ★★★★☆ | **統計・数学の直観可視化**: 主成分分析（PCA）やマルコフ連鎖をドラッグ操作で体感させるWeb教材。 |
| 35 | [Ray Tracing in One Weekend](https://raytracing.github.io/) | Lab/Text | 初〜中級 | CC0（Public Domain） | [GitHub](https://github.com/RayTracing/raytracing.github.io) | ★★★★★ | **週末ミニマム完結型**: 最小限のC++コードで光線追跡と美麗なCG画像をゼロから構築する名著。 |
| 36 | [OverTheWire (Bandit)](https://overthewire.org/wargames/bandit/) | Interactive/Game | 初〜中級 | 無料公開 | Web公開 | ★★☆☆☆ | **Wargame型Linux演習**: SSH接続して各階層のパスワードをLinuxコマンドを駆使して探し出すゲーミフィケーション。 |

---

### 6. 数学（代数・微積分・離散数学・線形代数）

| No | 教材名（リンク） | 形式 | 難易度 | ライセンス | ソース | 再利用性 | 教材設計パターン・品質評価 |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| 37 | [A Cool Brisk Walk Through Discrete Math](https://open.umn.edu/opentextbooks/textbooks/843) | Textbook | 初〜中級 | CC BY-SA | Web公開 | ★★★★☆ | **短編エッセンス型**: 冗長さを省き、短期間で離散構造の基礎を駆け抜ける構成。 |
| 38 | [AIM Approved Open Textbooks](https://textbooks.aimath.org/textbooks/approved-textbooks/) | Catalog | 全学年 | 各種オープン | Web公開 | ★★★★★ | **査読済みカタログ**: アメリカ数学研究所（AIM）が厳格な審査基準で認定した良書リスト。 |
| 39 | [OpenStax College Algebra](https://openstax.org/books/college-algebra/) | Textbook | 初級 | CC BY 4.0 | [GitHub](https://github.com/openstax) | ★★★★★ | **前提知識ケア型**: 基礎代数から関数論まで、つまずきやすいポイントを豊富な例題でサポート。 |

---

### 7. 物理学・天文学

| No | 教材名（リンク） | 形式 | 難易度 | ライセンス | ソース | 再利用性 | 教材設計パターン・品質評価 |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| 40 | [PhET Interactive Simulations](https://phet.colorado.edu/) | Interactive | 初〜中級 | CC BY 4.0 / GPL | [GitHub](https://github.com/phetsims) | ★★★★★ | **探究シミュレーション**: パラメータを操作して法則を発見させる研究ベースの対話型教材。 |
| 41 | [OpenStax College Physics 2e](https://openstax.org/books/college-physics-2e/) | Textbook | 初級 | CC BY 4.0 | [GitHub](https://github.com/openstax) | ★★★★★ | **代数ベース物理**: 微積分不要。医療・生物系や日常の現象と結びつけた概念重視の構成。 |
| 42 | [OpenStax Astronomy 2e](https://openstax.org/books/astronomy-2e/) | Textbook | 初級 | CC BY 4.0 | [GitHub](https://github.com/openstax) | ★★★★★ | **ビジュアル天文学**: NASA等の高解像度写真と観測データをフルカラーで配した入門書。 |
| 43 | [Light and Matter (Benjamin Crowell)](http://www.lightandmatter.com/) | Textbook | 初〜中級 | CC BY-SA 3.0 | [GitHub](https://github.com/bcrowell) | ★★★★☆ | **思考実験重視型**: 機械的な公式暗記を排し、物理的な因果関係と概念モデルの構築を重視。 |
| 44 | [Physics LibreTexts](https://phys.libretexts.org/) | OER Portal | 全学年 | CC BY-NC-SA 等 | [LibreTexts](https://libretexts.org/) | ★★★☆☆ | **OERメガポータル**: 各大学の物理講義ノートや教科書を章単位でremix・編集可能。 |

---

### 8. 化学・物質科学

| No | 教材名（リンク） | 形式 | 難易度 | ライセンス | ソース | 再利用性 | 教材設計パターン・品質評価 |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| 45 | [Molecular Workbench](http://mw.concord.org/modeler/) | Interactive | 初〜中級 | CC BY 4.0 / Open Source | [GitHub](https://github.com/concord-consortium) | ★★★★★ | **分子動力学シミュレータ**: 分子間力や気体分子の運動をリアルタイムに視覚化・実験。 |
| 46 | [ChemLibreTexts](https://chem.libretexts.org/) | OER Portal | 全学年 | CC BY-NC-SA 等 | [LibreTexts](https://libretexts.org/) | ★★★☆☆ | **世界最大の化学OER**: 無機・有機・物理化学・生化学・機器分析の教材を網羅。 |
| 47 | [Virtual Chemistry Experiments](https://chemdemos.uoregon.edu/) | Lab | 初〜中級 | オープン | Web公開 | ★★★★☆ | **対話型仮想実験室**: 危険・高コストな化学実験を動画とシミュレーションで疑似体験。 |
| 48 | [Concepts of Chemical Engineering 4 Kids](https://learncheme.com/) | Unplugged | 初級 | CC BY | Web公開 | ★★★★★ | **身近なアナロジー**: 物質収支や熱交換の原理を料理や日常の遊びに例えて解説。 |

---

### 9. 生物学・生命科学・地球環境

| No | 教材名（リンク） | 形式 | 難易度 | ライセンス | ソース | 再利用性 | 教材設計パターン・品質評価 |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| 49 | [OpenStax Concepts of Biology](https://openstax.org/books/concepts-biology/) | Textbook | 初級 | CC BY 4.0 | [GitHub](https://github.com/openstax) | ★★★★★ | **教養リテラシー型**: 非専攻者向け。感染症やバイオテクノロジーなど社会課題と結びつける。 |
| 50 | [OpenGeology: Introduction to Geology](https://opengeology.org/) | Interactive | 初〜中級 | CC BY-NC-SA 4.0 | Web公開 | ★★★☆☆ | **動的Web地質学**: 高解像度岩石写真、3Dモデル、対話型クイズが埋め込まれたモダン教科書。 |
| 51 | [Introduction to Climate Science (Oregon State)](https://open.oregonstate.education/climatescience/) | Textbook | 初〜中級 | CC BY-NC | Web公開 | ★★★☆☆ | **気候変動科学**: IPCC報告書に準拠し、放射強制力や炭素循環モデルを平易に解説。 |
| 52 | [Introduction to Earth Science (Virginia Tech)](https://pressbooks.lib.vt.edu/introearthscience/) | Textbook | 初級 | CC BY-NC-SA 4.0 | Web公開 | ★★★☆☆ | **フルカラー地球科学**: プレートテクトニクス、気象、海洋、宇宙を Pressbooks で美しく組版。 |
| 53 | [BioLibreTexts](https://bio.libretexts.org/) | OER Portal | 全学年 | CC BY-NC-SA 等 | [LibreTexts](https://libretexts.org/) | ★★★☆☆ | **生物学OER集成**: 分子生物学から生態学まで、世界中の大学の講義資料を再編成可能。 |
| 54 | [BioInteractive (HHMI)](https://www.biointeractive.org/) | Lab/Video | 初〜中級 | CC BY-NC-SA 4.0 | Web公開 | ★★★☆☆ | **研究者データ追体験**: 実際の学術論文データを元にした仮想実験と短編ドキュメンタリー。 |

---

### 10. 工学・力学・電気電子システム

| No | 教材名（リンク） | 形式 | 難易度 | ライセンス | ソース | 再利用性 | 教材設計パターン・品質評価 |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| 55 | [Engineering Computations (EngComp)](https://github.com/engineersCode/EngComp) | Lab/Text | 初〜中級 | CC BY 4.0 / MIT | [GitHub](https://github.com/engineersCode/EngComp) | ★★★★★ | **計算工学モジュール**: Python/Jupyterで機械・流体・構造計算を段階的に学ぶ優良教材。 |
| 56 | [A First Course in Electrical & Computer Eng.](https://open.umn.edu/opentextbooks/textbooks/a-first-course-in-electrical-and-computer-engineering) | Textbook | 初〜中級 | CC BY 3.0 | Web公開 | ★★★★★ | **数学から工学への架橋**: 複素数や正弦波から回路理論・信号処理・論理回路へスムーズに導入。 |
| 57 | [Engineering: An Introduction for High School](https://k12.libretexts.org/Bookshelves/Science_and_Technology/Engineering%3A_An_Introduction_for_High_School) | Textbook | 初級 | CC BY-NC-SA | [LibreTexts](https://libretexts.org/) | ★★★☆☆ | **工学導入・デザイン思考**: 高度な数式を使わず、「社会課題を工学でどう解決するか」を提示。 |
| 58 | [LibreTexts Engineering](https://eng.libretexts.org/) | OER Portal | 全学年 | CC BY-NC-SA 等 | [LibreTexts](https://libretexts.org/) | ★★★☆☆ | **工学OER統合基盤**: 材料力学、流体力学、制御工学、ロボティクス等の教材を集成。 |

---

### 11. 哲学・論理学・批判的思考

| No | 教材名（リンク） | 形式 | 難易度 | ライセンス | ソース | 再利用性 | 教材設計パターン・品質評価 |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| 59 | [forall x: Calgary](https://forallx.openlogicproject.org/) | Textbook | 初〜中級 | CC BY 4.0 | [GitHub](https://github.com/OpenLogicProject/forallx-yyc) | ★★★★★ | **形式論理のオープン標準**: 命題論理・述語論理・自然演繹。世界中で派生版（remix）が作られる。 |
| 60 | [Rebus: Introduction to Philosophy Series](https://press.rebus.community/intro-to-phil-ethics/) | Textbook | 初級 | CC BY 4.0 | [GitHub](https://github.com/RebusCommunity) | ★★★★★ | **分冊型アンソロジー**: 倫理学・認識論・論理学・心の哲学など全9巻を独立した専門家が執筆。 |
| 61 | [A Concise Introduction to Logic (Craig DeLancey)](https://milnepublishing.geneseo.edu/concise-introduction-to-logic/) | Textbook | 初級 | CC BY-NC-SA 4.0 | Web公開 | ★★★☆☆ | **哲学史連動論理学**: 哲学史上の著名な論証（神の存在証明等）を題材に論理規則を学ぶ。 |
| 62 | [Logic and Critical Thinking (Matthew Van Cleave)](https://open.umn.edu/opentextbooks/) | Textbook | 初級 | CC BY 4.0 | Web公開 | ★★★★★ | **実践的議論分析**: 認知バイアス、論理的誤謬（Fallacy）、議論の再構成に焦点を当てた実用書。 |
| 63 | [1000-Word Philosophy](https://1000wordphilosophy.com/) | Short Essay | 初級〜一般 | CC BY-NC-ND 等 | Web公開 | ★★☆☆☆ | **厳密短編形式**: 難解な哲学的議論を「1,000語ちょうど」で簡潔かつ厳密に解説する連載集。 |
| 64 | [OpenStax Introduction to Philosophy](https://openstax.org/books/introduction-philosophy/) | Textbook | 初級 | CC BY-NC-SA 4.0 | [GitHub](https://github.com/openstax) | ★★★☆☆ | **世界哲学を包含した概論**: 西洋哲学だけでなく東洋・先住民族の思想も含めた現代的構成。 |
| 65 | [Open Yale Courses: Political Philosophy](https://oyc.yale.edu/) | Courseware | 初級〜一般 | CC BY-NC-SA | Web公開 | ★★★☆☆ | **名物講義アーカイブ**: プラトンから現代までの全講義動画・音声・テキスト文字起こしを公開。 |
| 66 | [Wireless Philosophy (Wi-Phi)](https://www.wi-phi.com/) | Video/Anim | 初級 | 無料公開 | Web公開 | ★★☆☆☆ | **短編アニメーション解説**: 難解な哲学トピックを5〜10分の親しみやすいアニメで可視化。 |

---

## 3. 自作教材に組み込むための設計戦略

### 1. 「Hands-on（手を動かす）」×「OER（理論教科書）」のハイブリッド構成
* **電子工作・ハードウェア**:
  * 実装・配線: [SparkFun Learn](https://learn.sparkfun.com/tutorials/) / [Adafruit](https://learn.adafruit.com/)
  * 原理・回路計算: [All About Circuits](https://www.allaboutcircuits.com/textbook/)
* **コンピュータサイエンス・アルゴリズム**:
  * 概念体験: [CS Unplugged](https://www.csunplugged.org/) / [VisuAlgo](https://visualgo.net/)
* **AI・データサイエンス**:
  * ライブコーディング: [The Carpentries](https://carpentries.org/lessons/) / [fast.ai](https://course.fast.ai/)
  * 理論・数式連動: [Introduction to Modern Statistics](https://openintro-ims.netlify.app/)
  * 直観可視化: [Explained Visually](https://setosa.io/ev/)

### 2. 教材ビルドツールの選定マトリクス

| ツール | 最適な教材タイプ | 特徴・メリット | 採用例（本カタログ内） |
| :--- | :--- | :--- | :--- |
| **Jupyter Book / MyST** | データ科学・AI・計算工学 | MarkdownとJupyter Notebookを統合。コード実行結果・Plotly等の埋め込み。 | EngComp |
| **Quarto** | 論文・多言語データ分析教本 | R, Python, Julia, Observable JSを単一文書で扱える次世代出版システム。 | 各種モダンデータ科学コース |
| **Pressbooks** | 人文科学・社会科学・読み物 | WordPressベースの美しい組版。Web・EPUB・PDF出力に対応。 | Rebus Community, Introduction to Earth Science (Virginia Tech) |
| **Custom Web (WebGL/D3)** | Explorable Explanations | スライダーやドラッグ操作に応じた完全動的な描画。 | Bartosz Ciechanowski, Red Blob Games |
| **LibreTexts** | 大学横断のOER集成・remix | 章単位で組み替え可能なオープン教科書プラットフォーム。 | Physics/Chem/Bio/Engineering LibreTexts |

> 注: PreTeXt採用の代表教材（Active Calculus, Engineering Statics 等）は中級以上向けのため本版では割愛しています。詳細は[決定版115選](oer_catalog.md)を参照してください。

### 3. ライセンスの混在（Mix & Match）ルール
1. **ベースは `CC BY` または `MIT / Apache 2.0` を推奨**:
   * 商用展開（有償セミナー、有料プラットフォーム、書籍化等）や将来的な拡張に対して最も制限が少ない。
2. **`CC BY-SA` の素材を取り込む場合**:
   * 「同一ライセンス継承（ShareAlike）」義務が発生するため、自作教材全体も `CC BY-SA` で公開する必要がある。
3. **`CC BY-NC` / `CC BY-NC-SA` の素材を取り込む場合**:
   * 非営利目的に制限されるため、営利企業での研修・有料スクール等での使用が不可となる点に注意。
4. **`CC BY-ND` の素材**:
   * 改変が禁止されているため、教材内での抜粋・再構成は行えず、外部リンクや参照としての紹介に留める。
