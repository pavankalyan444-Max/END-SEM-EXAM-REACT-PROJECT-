import React, { useState } from 'react';

function App() {
  // 1. State variables to store student info and marks
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [english, setEnglish] = useState('');
  const [math, setMath] = useState('');
  const [science, setScience] = useState('');

  // 2. State variable to store the submitted details to display
  const [submittedData, setSubmittedData] = useState(null);

  // 3. Helper function to find grade based on marks / percentage
  // - Above 90: Grade A
  // - Above 80: Grade B
  // - Above 70: Grade C
  // - Above 60: Grade D
  // - Above 50: Grade E
  // - 50 or below: Grade F (Fail)
  const calculateGrade = (marks) => {
    if (marks >= 90) {
      return 'A';
    } else if (marks >= 80) {
      return 'B';
    } else if (marks >= 70) {
      return 'C';
    } else if (marks >= 60) {
      return 'D';
    } else if (marks >= 50) {
      return 'E';
    } else {
      return 'F (Fail)';
    }
  };

  // 4. Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload

    // Check if all fields are entered
    if (!name || !studentId || english === '' || math === '' || science === '') {
      alert('Please fill in all the details!');
      return;
    }

    // Convert marks to numbers
    const engMark = Number(english);
    const mathMark = Number(math);
    const sciMark = Number(science);

    // Calculate total marks and percentage (out of 300)
    const total = engMark + mathMark + sciMark;
    const percentage = ((total / 300) * 100).toFixed(2);

    // Calculate grades for each subject and overall
    const englishGrade = calculateGrade(engMark);
    const mathGrade = calculateGrade(mathMark);
    const scienceGrade = calculateGrade(sciMark);
    const overallGrade = calculateGrade(Number(percentage));

    // Store the submitted details
    setSubmittedData({
      name: name,
      studentId: studentId,
      english: engMark,
      englishGrade: englishGrade,
      math: mathMark,
      mathGrade: mathGrade,
      science: sciMark,
      scienceGrade: scienceGrade,
      total: total,
      percentage: percentage,
      overallGrade: overallGrade,
    });
  };

  // 5. Function to reset the form
  const handleReset = () => {
    setName('');
    setStudentId('');
    setEnglish('');
    setMath('');
    setScience('');
    setSubmittedData(null);
  };

  return (
    <div className="container">
      <h1>Student Management System</h1>

      {/* Student Form */}
      <form onSubmit={handleSubmit} className="form-card">
        <h3>Enter Student Details</h3>

        <div className="form-group">
          <label>Student Name:</label>
          <input
            type="text"
            placeholder="e.g. John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Student ID:</label>
          <input
            type="text"
            placeholder="e.g. STU101"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>English Marks:</label>
          <input
            type="number"
            placeholder="Enter marks (0 - 100)"
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
            min="0"
            max="100"
          />
        </div>

        <div className="form-group">
          <label>Math Marks:</label>
          <input
            type="number"
            placeholder="Enter marks (0 - 100)"
            value={math}
            onChange={(e) => setMath(e.target.value)}
            min="0"
            max="100"
          />
        </div>

        <div className="form-group">
          <label>Science Marks:</label>
          <input
            type="number"
            placeholder="Enter marks (0 - 100)"
            value={science}
            onChange={(e) => setScience(e.target.value)}
            min="0"
            max="100"
          />
        </div>

        <div className="btn-group">
          <button type="submit" className="submit-btn">
            Submit
          </button>
          <button type="button" onClick={handleReset} className="reset-btn">
            Clear
          </button>
        </div>
      </form>

      {/* Show submitted details when available */}
      {submittedData && (
        <div className="result-card">
          <h2>Student Result</h2>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Student ID:</strong> {submittedData.studentId}</p>

          <hr />

          <h3>Marks & Grades:</h3>
          <p>
            <strong>English:</strong> {submittedData.english} / 100 &nbsp;—&nbsp; 
            <span className="badge">Grade {submittedData.englishGrade}</span>
          </p>
          <p>
            <strong>Math:</strong> {submittedData.math} / 100 &nbsp;—&nbsp; 
            <span className="badge">Grade {submittedData.mathGrade}</span>
          </p>
          <p>
            <strong>Science:</strong> {submittedData.science} / 100 &nbsp;—&nbsp; 
            <span className="badge">Grade {submittedData.scienceGrade}</span>
          </p>

          <hr />

          <p><strong>Total Marks:</strong> {submittedData.total} / 300</p>
          <p className="percentage">
            <strong>Percentage:</strong> {submittedData.percentage}%
          </p>
          <p className="overall-grade">
            <strong>Overall Grade:</strong> {submittedData.overallGrade}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
