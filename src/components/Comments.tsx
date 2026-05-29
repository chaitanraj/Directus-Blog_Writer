"use client";

import { useEffect, useState } from "react";

import { createComment, getComments } from "@/lib/comments";
import type { Comment } from "@/types/blog";

type CommentsProps = {
  postId: number | string;
};

export function Comments({ postId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function loadComments() {
    try {
      const items = await getComments(postId);
      setComments(items);
      setError(null);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load comments.");
    }
  }

  useEffect(() => {
    let active = true;

    getComments(postId)
      .then((items) => {
        if (active) {
          setComments(items);
          setError(null);
        }
      })
      .catch((error) => {
        if (active) {
          setError(error instanceof Error ? error.message : "Failed to load comments.");
        }
      });

    return () => {
      active = false;
    };
  }, [postId]);

  async function handleSubmit() {
    try {
      await createComment(postId, content);
      setContent("");
      await loadComments();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to create comment.");
    }
  }

  function handleCancel() {
    setContent("");
  }

  return (
    <section style={{ marginTop: "32px" }}>
      <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>Comments</h2>

      {error ? <p>{error}</p> : null}

      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
          {comments.map((comment) => (
            <li
              key={comment.id}
              style={{
                borderBottom: "1px solid #000",
                paddingBottom: "12px",
                marginBottom: "12px",
              }}
            >
              {comment.content}
            </li>
          ))}
        </ul>
      )}

      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        rows={4}
        style={{
          display: "block",
          width: "100%",
          border: "1px solid #000",
          padding: "8px",
          color: "#000",
          background: "#fff",
          font: "inherit",
        }}
      />

      <div style={{ marginTop: "12px" }}>
        <button
          type="button"
          onClick={handleSubmit}
          style={{
            marginRight: "8px",
            border: "1px solid #000",
            background: "#000",
            color: "#fff",
            padding: "8px 12px",
            cursor: "pointer",
          }}
        >
          Post Comment
        </button>
        <button
          type="button"
          onClick={handleCancel}
          style={{
            border: "1px solid #000",
            background: "#fff",
            color: "#000",
            padding: "8px 12px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </section>
  );
}
