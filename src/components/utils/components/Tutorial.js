import React, { useState, useEffect } from "react"

const Tutorial = () => {
  const [showTutorial, setShowTutorial] = useState(false)

  useEffect(() => {
    // Check if the tutorial has been seen before
    const hasSeenTutorial = localStorage.getItem("hasSeenTutorial")

    if (!hasSeenTutorial) {
      setShowTutorial(true) // Show the tutorial if not seen
      localStorage.setItem("hasSeenTutorial", "true") // Mark as seen
    }
  }, [])

  const handleCloseTutorial = () => {
    setShowTutorial(false)
  }

  return (
    <>
      {showTutorial && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h1>Welcome to the Tutorial</h1>
            <p>Here’s how to use the app:</p>
            <ul>
              <li>Step 1: Do this</li>
              <li>Step 2: Do that</li>
              <li>Step 3: Enjoy!</li>
            </ul>
            <button onClick={handleCloseTutorial} style={styles.closeButton}>
              Got It!
            </button>
          </div>
        </div>
      )}
    </>
  )
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  },
  modal: {
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    maxWidth: "400px",
    width: "80%"
  },
  closeButton: {
    marginTop: "20px",
    padding: "10px 20px",
    background: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
}

export default Tutorial
