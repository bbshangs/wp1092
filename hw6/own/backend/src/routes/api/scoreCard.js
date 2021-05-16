import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();

router.post('/create-card', async function (req, res) {
  try {
    // TODO:
    const name = req.body.name;
    const subject = req.body.subject;
    const score = req.body.score;
    const existing = await ScoreCard.find({ "name": name, "subject": subject });
    
    if (existing.length === 0) {
      const newScoreCard = new ScoreCard({ "name": name, "subject": subject, "score": score });
      newScoreCard.save();
      res.json({ message: `Adding (${name}, ${subject}, ${score})`, card: true });
    }
    else {
      ScoreCard.replaceOne({ "name": name, "subject": subject }, { "name": name, "subject": subject, "score": score }, null, function (err, docs) {
        if (err)
            console.log(err)
        else
            console.log("Update Successfully!");
      });
      res.json({ message: `Updating (${name}, ${subject}, ${score})`, card: true });
    }
  } catch (e) {
    res.json({ message: 'Create error...'});
  }
});

// TODO: delete the collection of the DB
router.delete('/clear-db', async function (_, res) {
  try {
    await ScoreCard.deleteMany({});
    res.json({ message: 'Database cleared!' });
  } catch(e) {
    res.json({ message: 'Clear database error...' });
  }
});

// TODO: implement the DB query
// route.xx(xxxx)
router.post('/query', async function (req, res) {
  try {
    const queryType = req.body.queryType;
    const queryString = req.body.queryString;
    var result = [];
    if (queryType === "name") 
      result = await ScoreCard.find({ "name": queryString});
    else if (queryType === "subject")
      result = await ScoreCard.find({ "subject": queryString});
    
    if (result.length === 0) 
      res.json({ message: `${queryType.toUpperCase()} (${queryString}) not found!` })
    else {
      var messages = [];
      for (let i = 0; i < result.length; i++) {
        messages.push(`${result[i].name} ${result[i].subject} ${result[i].score}`);
      }
      res.json({ messages: messages});
    }
  } catch(e) {
    res.json({ message: 'Query error...' });
    console.log(e);
  }
});

export default router;
