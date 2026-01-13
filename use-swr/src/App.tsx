import { useState } from "react";
import useSWR, { SWRConfig } from "swr";
import "./App.css";

const API_BASE = "https://jsonplaceholder.typicode.com";

async function fetcher(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
  return res.json();
}

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
    <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h2 style={{}}>1. キャッシュ共有 + 定期更新</h2>
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
        }}
      >
        <label style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          ユーザーID:
          <select
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
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

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        <UserDetail userId={userId} enableRefresh={enableRefresh} />
        <UserDetail userId={userId} enableRefresh={enableRefresh} />
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
    <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h2 style={{}}>2. キーの先行切り替え</h2>
      <p style={{ fontSize: "0.9rem", color: "#666" }}>
        IDを変更すると、IDは即座に切り替わるがデータは後から到着。
        <br />
        SWRのキー変更でリクエストが発生する様子を確認できる。
      </p>

      <div style={{ display: "flex", gap: "1rem" }}>
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
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
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
            <p style={{}}>
              <strong>{data?.name}</strong>
            </p>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>{data?.email}</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ========================================
// Profile: 条件付きフェッチ + エラーハンドリング
// - フォーム入力が完了するまでフェッチしない
// - 空文字の場合はkeyがnullになりリクエストが発生しない
// - mutate() を使ったエラー回復とダミーデータ作成
// ========================================
function Profile() {
  // 入力中のユーザーID
  const [userId, setUserId] = useState("");
  // 確定したユーザーID
  const [submittedUserId, setSubmittedUserId] = useState("");
  // エラー時の自動リトライ（手動リトライするときは無効化する）
  const [shouldRetryOnError, setShouldRetryOnError] = useState(false);

  const { data, error, isLoading, mutate } = useSWR(
    submittedUserId ? `${API_BASE}/users/${submittedUserId}` : null,
    { shouldRetryOnError },
  );

  // 存在しないユーザーをローカルで「作成」する（mutateでキャッシュに直接書き込む）
  const createDummyUser = () => {
    mutate(
      {
        id: Number(submittedUserId),
        name: `ダミーユーザー ${submittedUserId}`,
        email: `dummy${submittedUserId}@example.com`,
        phone: "000-0000-0000",
      },
      { revalidate: false }, // サーバーに再リクエストしない
    );
  };

  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h2 style={{}}>3. 条件付きフェッチ + エラーハンドリング</h2>
      <p style={{ fontSize: "0.9rem", color: "#666" }}>
        IDを入力して「検索」を押すまでリクエストは発生しない。
        <br />
        存在しないID（11以上）を入力するとエラーが発生 → mutateで回復可能。
      </p>
      <label>
        <input
          type="checkbox"
          checked={shouldRetryOnError}
          onChange={(e) => setShouldRetryOnError(e.target.checked)}
        />
        エラー時に自動再試行
      </label>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmittedUserId(userId.trim());
        }}
        style={{ display: "flex", gap: "1rem" }}
      >
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="ユーザーID (1-10, 11以上はエラー)"
          style={{ padding: "0.5rem", width: "220px" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          検索
        </button>
      </form>

      {submittedUserId === "" && (
        <p style={{ color: "#888" }}>IDを入力して検索してください</p>
      )}

      {isLoading && <p style={{}}>読み込み中...</p>}

      {error && !isLoading && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            background: "#fee",
            border: "1px solid #f99",
            borderRadius: "8px",
            padding: "1rem",
          }}
        >
          <p style={{ color: "#c00" }}>
            <strong>ユーザー {submittedUserId} が見つかりません</strong>
          </p>
          <p style={{ color: "#666", fontSize: "0.9rem" }}>
            このIDのユーザーはサーバーに存在しません。
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              onClick={() => mutate()}
              style={{
                background: "#007bff",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              再試行
            </button>
            <button
              onClick={createDummyUser}
              style={{
                background: "#28a745",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              ユーザーを作成
            </button>
          </div>
          <p style={{ color: "#888", fontSize: "0.8rem" }}>
            「ユーザーを作成」は mutate() でキャッシュに直接データを書き込みます
          </p>
        </div>
      )}

      {data && !error && (
        <div style={{ border: "1px solid #ccc", padding: "1rem" }}>
          <p>
            <strong>{data.name}</strong>
          </p>
          <p>{data.email}</p>
          <p>{data.phone}</p>
          <button
            onClick={() => mutate()}
            style={{
              background: "#007bff",
              color: "#fff",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            再試行
          </button>
        </div>
      )}
    </section>
  );
}

function App() {
  return (
    <Providers>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          maxWidth: "800px",
          margin: "0 auto",
          padding: "2rem",
        }}
      >
        <header>
          <h1>SWR 学習サンプル</h1>
          <p style={{ color: "#666" }}>
            各セクションでSWRの機能を体験できます。
            <br />
            Chrome DevTools &gt; Network で挙動を確認できます。
          </p>
        </header>

        <User />
        <UserSwitcher />
        <Profile />
      </div>
    </Providers>
  );
}

export default App;
