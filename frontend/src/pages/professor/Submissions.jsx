import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";

export default function ProfessorSubmissions({ itemType }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { itemId } = useParams();
  console.log(itemType, itemId);
  

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/submissions/${itemType}/${itemId}`)
      .then((res) => setSubmissions(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
      
  }, [itemType, itemId]);
  console.log(submissions);
  function GradeSubmissionButton({ submission }) {
  const [grade, setGrade] = useState(submission.grade || "");
  const [feedback, setFeedback] = useState(submission.feedback || "");
  const submissionId = submission.id;


  

  const handleSubmit = async () => {
    try {
      console.log(submissionId, grade, feedback);
      await axios.post(`http://localhost:5000/api/submissions/grade`, {submissionId, grade, feedback });
      alert("Graded successfully!");
    } catch (err) {
      console.error(err);
      alert("Error grading submission");
    }
  };

  return (
    <div className="flex text-gray-600 flex-col gap-2">
      <input
        type="number"
        placeholder="Grade"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        className="border p-1 w-20"
      />
      <input
        type="text"
        placeholder="Feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="border p-1"
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-2 py-1 rounded">
        Submit
      </button>
    </div>
  );
}


  return (
    <Layout>
  <div className="sm:max-w-[calc(100%-4rem)] md:max-w-[calc(100%-4rem)]">
    <h2 className="text-2xl text-gray-200 font-bold mb-4">Student Submissions</h2>

    {loading ? (
      <p>Loading...</p>
    ) : (
      <div className="grid gap-4">
        {submissions.map((s) => (
          <div key={s.id} className="border border-gray-700 rounded-lg p-4 bg-gray-800 shadow">
            <p className="text-gray-400">
              <span className="font-semibold text-gray-300 mb-2 text-gray-300 mb-2 text-gray-300 text-gray-300">Student:</span> {s.student_name}
            </p>
            <p
              className="font-semibold text-gray-300 mb-2 text-gray-300 mb-2 text-gray-300">Submission Text:
            </p>
            <p className="text-gray-400">
              {s.submission_text || "-"}
            </p>
            <p className="text-gray-400">
              <span className="font-semibold text-gray-300 mb-2 text-gray-300 mb-2 text-gray-300">File:</span>{" "}
              {s.submission_file ? (
                <a
                  href={`/${s.submission_file}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 underline"
                >
                  View File
                </a>
              ) : (
                "-"
              )}
            </p>
            <p className="text-gray-400">
              <span className="font-semibold text-gray-300 mb-2 text-gray-300 mb-2 text-gray-300">Grade:</span> {s.grade ?? "Not graded"}
            </p>
            <p className="text-gray-400">
              <span className="font-semibold text-gray-300 mb-2 text-gray-300 mb-2 text-gray-300">Feedback:</span> {s.feedback ?? "-"}
            </p>
            <div className="mt-2">
              <GradeSubmissionButton submission={s} />
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</Layout>

  );
}
