require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Health Companion API Running")
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})

  app.post("/analyze-labs", async (req, res) => {
    const labs = req.body.labs
  
    const referenceRanges = {
      glucose: { min: 70, max: 99, unit: "mg/dL" },
      iron: { min: 60, max: 170, unit: "mcg/dL" }
    }
  
    const analyzed = labs.map(lab => {
      const ref = referenceRanges[lab.testType]
      let status = "normal"
  
      if (lab.value < ref.min) status = "low"
      if (lab.value > ref.max) status = "high"
  
      return {
        ...lab,
        idealRange: `${ref.min}-${ref.max} ${ref.unit}`,
        status
      }
    })
  
    res.json({ analyzed })
  })

  