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

  async function loadComments() {
    const items = await getComments(postId);
    setComments(items);
  }

  useEffect(() => {
    let active = true;

    getComments(postId).then((items) => {
      if (active) {
        setComments(items);
      }
    });

    return () => {
      active = false;
    };
  }, [postId]);

  async function handleSubmit() {
    await createComment(postId, content);
    setContent("");
    await loadComments();
  }

  function handleCancel() {
    setContent("");
  }

  return (
    <section style={{ marginTop: "32px" }}>
      <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>Comments</h2>

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
        }}
      />

      <div style={{ marginTop: "12px" }}>
        <button type="button" onClick={handleSubmit} style={{ marginRight: "8px" }}>
          Post Comment
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </section>
  );
}
