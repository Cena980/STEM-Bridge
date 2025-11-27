import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SubmitWork({ itemType, itemId, studentId, courseId }) {
  const [submission, setSubmission] = useState(null);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch existing submission (if any)
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/submissions/${itemType}/${itemId}/student/${studentId}`)
      .then((res) => {
        setSubmission(res.data);
        setLoading(false);
      });
  }, []);

  const submit = async () => {
    const formData = new FormData();
    formData.append("studentId", studentId);
    formData.append("itemType", itemType);
    formData.append("itemId", itemId);
    formData.append("courseId", courseId);
    formData.append("submissionText", text);
    if (file) formData.append("file", file);
    console.log(courseId);

    await axios.post("http://localhost:5000/api/submissions/submit-file", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    alert("Submitted!");
    window.location.reload();
  };

  if (loading) return <p>Loading...</p>;

  // Already submitted – display summary
  if (submission) {
    return (
      <div className="bg-gray-800 p-4 rounded">
        <h2 className="text-xl font-bold text-white">Your Submission</h2>
        <p className="text-gray-300 whitespace-pre-wrap mt-2">
          {submission.submission_text}
        </p>

        {submission.submission_file && (
          <a
            href={`/${submission.submission_file}`}
            target="_blank"
            className="text-blue-400 underline block mt-3"
          >
            View Uploaded File
          </a>
        )}

        {submission.grade != null && (
          <div className="mt-4 text-green-300">
            <p><b>Grade:</b> {submission.grade}</p>
            <p><b>Feedback:</b> {submission.feedback}</p>
          </div>
        )}
      </div>
    );
  }

  // Not submitted yet
  return (
    <div className="bg-gray-800 p-4 rounded">
      <h2 className="text-xl font-bold text-white">Submit Your Work</h2>

      <textarea
        className="w-full p-3 bg-gray-700 text-white rounded mt-3"
        rows="6"
        placeholder="Write your answer…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <input
        type="file"
        className="mt-3 text-white"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={submit}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        Submit
      </button>
    </div>
  );
}
