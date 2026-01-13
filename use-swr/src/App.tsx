import { useState } from "react";
import useSWR, { SWRConfig } from "swr";
import "./App.css";

const API_BASE = "https://jsonplaceholder.typicode.com";

const fetcher = (url) => fetch(url).then((r) => r.json());

// ========================================
// Providers: SWRのグローバル設定
// ========================================
function Providers({ children }) {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
}

// ========================================
// UserDetail: ユーザー詳細表示
// - 同じuserIdで複数回使用 → キャッシュ共有を確認
// - refreshInterval で定期更新を確認
// ========================================
function UserDetail({ userId, enableRefresh = false }) {
  const { data, error, isLoading } = useSWR<{
    id: number;
    name: string;
    email: string;
  }>(`${API_BASE}/users/${userId}`, {
    refreshInterval: enableRefresh ? 5_000 : 0,
  });

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        margin: "0.5rem",
        minWidth: "200px",
      }}
    >
      {isLoading && <p>読み込み中...</p>}
      {error && <p>エラーが発生しました</p>}
      {data && (
        <>
          <h4>{data.name}</h4>
          <p style={{ fontSize: "0.8rem", color: "#666" }}>{data.email}</p>
          <small>ID: {data.id}</small>
        </>
      )}
    </div>
  );
}

// ========================================
// User: キャッシュ共有と定期更新の確認
// - 2つ以上のUserDetailを並べて、2回目以降キャッシュ・ヒットで即表示されることを確認
// - URLを変更して結果の差を確認
// ========================================
function User() {
  const [userId, setUserId] = useState(1);
  const [enableRefresh, setEnableRefresh] = useState(false);

  return (
    <section style={{ marginBottom: "2rem" }}>
      <h2>1. キャッシュ共有 + 定期更新</h2>
      <p style={{ fontSize: "0.9rem", color: "#666" }}>
        同じURLを参照する2つのコンポーネントがキャッシュを共有。
        <br />
        2回目以降は即座に表示される（DevTools Networkで1回のみリクエスト確認）。
      </p>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <label>
          ユーザーID:
          <select
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            style={{ marginLeft: "0.5rem" }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </label>

        <label>
          <input
            type="checkbox"
            checked={enableRefresh}
            onChange={(e) => setEnableRefresh(e.target.checked)}
          />
          自動更新 (5秒間隔)
        </label>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <UserDetail userId={userId} enableRefresh={enableRefresh} />
        <UserDetail userId={userId} enableRefresh={enableRefresh} />
        <UserDetail userId={userId} enableRefresh={enableRefresh} />
        <UserDetail userId={userId} enableRefresh={enableRefresh} />
      </div>

      {enableRefresh && (
        <p style={{ fontSize: "0.8rem", color: "#888" }}>
          最終更新: {new Date().toLocaleTimeString()}（5秒ごとに再フェッチ）
        </p>
      )}
    </section>
  );
}

// ========================================
// UserSwitcher: IDが先行して変わるデモ
// - IDを切り替えると即座にIDの表示が変わる
// - データは遅延して到着（ローディング表示）
// - キーが変わる = 新しいリクエストが発生する様子を可視化
// ========================================
function UserSwitcher() {
  const [userId, setUserId] = useState(1);

  // わざと遅いfetcherで遅延を可視化
  const { data, isLoading } = useSWR<{
    id: number;
    name: string;
    email: string;
  }>(
    `${API_BASE}/users/${userId}`,
    async (url: string) => {
      // 人工的に1.5秒遅延させる
      await new Promise((r) => setTimeout(r, 1500));
      const res = await fetch(url);
      return res.json();
    },
    { keepPreviousData: false },
  );

  return (
    <section style={{ marginBottom: "2rem" }}>
      <h2>2. キーの先行切り替え</h2>
      <p style={{ fontSize: "0.9rem", color: "#666" }}>
        IDを変更すると、IDは即座に切り替わるがデータは後から到着。
        <br />
        SWRのキー変更でリクエストが発生する様子を確認できる。
      </p>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        {[1, 2, 3, 4, 5].map((id) => (
          <button
            key={id}
            onClick={() => setUserId(id)}
            style={{
              padding: "0.5rem 1rem",
              background: userId === id ? "#007bff" : "#eee",
              color: userId === id ? "#fff" : "#333",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            User {id}
          </button>
        ))}
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          minHeight: "100px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "0.5rem",
          }}
        >
          <span
            style={{
              background: "#007bff",
              color: "#fff",
              padding: "0.25rem 0.5rem",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            ID: {userId}
          </span>
          <span style={{ color: "#888" }}>← 即座に変わる</span>
        </div>

        {isLoading ? (
          <div style={{ color: "#888" }}>
            <span
              style={{
                display: "inline-block",
                animation: "pulse 1s infinite",
              }}
            >
              データを取得中...
            </span>
          </div>
        ) : (
          <div>
            <p style={{ margin: 0 }}>
              <strong>{data?.name}</strong>
            </p>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#666" }}>
              {data?.email}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// ========================================
// Profile: 条件付きフェッチ
// - フォーム入力が完了するまでフェッチしない
// - 空文字の場合はkeyがnullになりリクエストが発生しない
// ========================================
function Profile() {
  // 入力中のユーザーID
  const [userId, setUserId] = useState("");
  // 確定したユーザーID
  const [submittedUserId, setSubmittedUserId] = useState("");

  const { data, error, isLoading } = useSWR<{
    id: number;
    name: string;
    email: string;
    phone: string;
  }>(submittedUserId ? `${API_BASE}/users/${submittedUserId}` : null);

  return (
    <section style={{ marginBottom: "2rem" }}>
      <h2>3. 条件付きフェッチ</h2>
      <p style={{ fontSize: "0.9rem", color: "#666" }}>
        IDを入力して「検索」を押すまでリクエストは発生しない。
        <br />
        （DevTools Networkで確認）
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmittedUserId(userId.trim());
        }}
        style={{ marginBottom: "1rem" }}
      >
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="ユーザーID (1-10)"
          style={{ padding: "0.5rem", marginRight: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          検索
        </button>
      </form>

      {submittedUserId === "" && (
        <p style={{ color: "#888" }}>IDを入力して検索してください</p>
      )}

      {isLoading && <p>読み込み中...</p>}
      {error && (
        <p style={{ color: "red" }}>エラー: ユーザーが見つかりません</p>
      )}
      {data && (
        <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
          <p>
            <strong>{data.name}</strong>
          </p>
          <p>{data.email}</p>
          <p>{data.phone}</p>
        </div>
      )}
    </section>
  );
}

// ========================================
// App: メインコンポーネント
// ========================================
function App() {
  return (
    <Providers>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
        <h1>SWR 学習サンプル</h1>
        <p style={{ marginBottom: "2rem", color: "#666" }}>
          各セクションでSWRの機能を体験できます。
          <br />
          Chrome DevTools &gt; Network で挙動を確認してください。
        </p>

        <User />
        <UserSwitcher />
        <Profile />
      </div>
    </Providers>
  );
}

export default App;
