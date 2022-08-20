const models = require('./models');

// get questions:
const getQuestions = (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
};

const getAnswers = (req, res) => {
  const { question_id } = req.params;
  const count = req.params.count || 5;
  const page = req.query.page || 1;
  const formatted = {};
  models.getAnswersResults(question_id, count, page)
    .then((response) => {
      console.log(`this is test display for question_id ${question_id}:`, response.rows);
      formatted.question = question_id;
      formatted.page = page;
      formatted.count = count;
      formatted.results = response.rows;
      res.status(200).send(formatted);
    }).catch((err) => res.status(500).send(err));


};

const addAQuestion = (req, res) => {
  const dataObj = req.body;
  models.addAQuestion(dataObj.product_id, dataObj.body, dataObj.name, dataObj.email)
    .then((response) => {
      console.log(response);
      res.status(201).send('Question added!');
    }).catch((err) => res.status(500).send(err));
};

const addAnswer = (req, res) => {
  console.log(req.body);
  // const dataObj = req.body;
  // models.addAnswer(dataObj.product_id, dataObj.body, dataObj.name, dataObj.email)
  //   .then((response) => {
  //     res.status(201).send(response);
  //   }).catch((err) => res.status(500).send(err));
  res.status(201).send('Answer added!');
};

const voteQuestionHelpful = (req, res) => {
  console.log(req.params);
  const { question_id } = req.params;
  models.voteQuestionHelpful(question_id)
    .then((response) => {
      console.log(response);
      res.status(204).send('Question voted helpful!');
    }).catch((err) => res.status(500).send(err));
};

const reportQuestion = (req, res) => {
  console.log(req.params);
  const { question_id } = req.params;
  models.reportQuestion(question_id)
    .then((response) => {
      console.log(response);
      res.status(204).send('Question is reported!');
    }).catch((err) => res.status(500).send(err));
};

const voteAnswerHelpful = (req, res) => {
  console.log(req.params);
  const { answer_id } = req.params;
  models.voteAnswerHelpful(answer_id)
    .then((response) => {
      console.log(response);
      res.status(204).send('Answer voted helpful!');
    }).catch((err) => res.status(500).send(err));
};

const reportAnswer = (req, res) => {
  console.log(req.params);
  const { answer_id } = req.params;
  models.reportAnswer(answer_id)
    .then((response) => {
      console.log(response);
      res.status(204).send('Answer is reported!');
    }).catch((err) => res.status(500).send(err));
};

// test display upto 5 results with product_id = 1, reported = false, unformatted;
const displayQuestionTest = (req, res) => {
  const product_id = 1;
  const count = 5;
  models.displayQuestionTest(product_id, count)
    .then((response) => {
      console.log('this is test display for product_id 1:', response);
      res.status(200).send(response.rows);
    }).catch((err) => res.status(500).send(err));
};

const displayAnswersTest = (req, res) => {
  const question_id = 36;
  const count = 15;
  const page = 1;
  const formatted = {};
  models.getAnswersResults(question_id, count, page)
    .then((response) => {
      console.log('this is test display for question_id 5:', response.rows);
      formatted.question = question_id;
      formatted.page = page;
      formatted.count = count;
      formatted.results = response.rows;
      res.status(200).send(formatted);
    }).catch((err) => res.status(500).send(err));
};

module.exports = {
  getQuestions,
  getAnswers,
  addAQuestion,
  addAnswer,
  voteQuestionHelpful,
  reportQuestion,
  voteAnswerHelpful,
  reportAnswer,
  displayQuestionTest,
  displayAnswersTest,
};
