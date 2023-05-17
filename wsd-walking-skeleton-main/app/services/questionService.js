import { sql } from "../database/database.js";

const listQuestions = async (id) => {
  const rows = await sql`SELECT * FROM questions WHERE topic_id = ${id}`;

  return rows[0];
};

const deleteQuestion = async (id) => {
  await sql`DELETE * FROM topics WHERE id = ${id}`;
  const questionIDs = await sql`SELECT id FROM questions WHERE topic_id = ${id}`; //return a list of ID numbers
  await sql`DELETE * FROM questions WHERE topic_id = ${id}`;

  questionIDs[0].forEach(id => {
    sql`DELETE * FROM question_answer_options WHERE question_id = ${id}`;
    sql`DELETE * FROM question_answers WHERE question_id = ${id}`;
  });
};

const addQuestion = async (tId, userId, question_text) => {
  return await sql`INSERT INTO questions (topic_id, user_id, question_text) VALUES (${tId}, ${userId}, ${question_text})`;
};

// const setCorrectness = async (qId,oId) => { 
//   return await sql`UPDATE question_answer_options SET is_correct = TRUE WHERE quesion_id = ${qId} AND id = ${oId}`;
// };

const listOptions = async (qId) => {
  const rows = await sql`SELECT * FROM question_answer_options WHERE question_id= ${qId} ORDER BY name ASC`;
  return rows;
};

const addOption = async (qId,text,correctness) => {
  return await sql`INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES (${qId}, ${text}, ${correctness})`;
};

const deleteOption = async (id) => {
  await sql`DELETE * FROM topics WHERE id = ${id}`;
  const questionIDs = await sql`SELECT id FROM questions WHERE topic_id = ${id}`; //return a list of ID numbers
  await sql`DELETE * FROM questions WHERE topic_id = ${id}`;

  questionIDs[0].forEach(id => {
    sql`DELETE * FROM question_answer_options WHERE question_id = ${id}`;
    sql`DELETE * FROM question_answers WHERE question_id = ${id}`;
  });
};

export {
  addQuestion,
  listQuestions,
  deleteQuestion,
  addOption,
  listOptions,
  deleteOption
};