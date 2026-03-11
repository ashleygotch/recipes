import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/recipes`)
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then(setRecipes)
      .catch((e) => setError(String(e)));
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1>Family Recipes</h1>

      {error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : recipes.length === 0 ? (
        <p>No recipes yet.</p>
      ) : (
        <div>
          {recipes.map((r) => (
            <div
              key={r.id}
              style={{
                border:"1px solid #ddd",
                borderRadius:12,
                padding:16,
                marginBottom:16,
              }}
            >
              <h2 style={{marginTop:0}}>{r.title}</h2>
              {r.description && <p>{r.description}</p>}
              {r.tags && (
                <p>
                  <strong>Tags:</strong> {r.tags}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}