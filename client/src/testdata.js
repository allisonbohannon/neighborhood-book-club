const visitsTest = []

const generateVisits = () => {
  for (let i = 0; i < 50; i++) {
    const visit = {
      id: i, 
      userId: 337 + Math.floor(Math.random()*10 + 1),
      wineryId: 254 + Math.floor(Math.random()*7 + 1),
      rating: Math.floor(Math.random()*5 + 1)
    }
    visitsTest.push(visit)
  }
}

const commentsTest = []

const generateComments = () => {
  for (let i = 0; i < 50; i++) {
    const comment = {
      id: i, 
      userId: 337+ Math.floor(Math.random()*10 + 1),
      wineryId: 254+ Math.floor(Math.random()*7 + 1),
      text: "blah blah blah tannins"
    }
    commentsTest.push(comment)
  }
}

generateVisits()
generateComments()

export {visitsTest, commentsTest}