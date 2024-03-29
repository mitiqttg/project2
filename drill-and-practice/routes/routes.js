import { Router } from "../deps.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as mainController from "./controllers/mainController.js";
import * as topicsController from "./controllers/topicsController.js";
import * as questionController from "./controllers/questionController.js";
import * as quizController from "./controllers/quizController.js";
import * as questionApi from "./apis/questionApi.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/topics", topicsController.listTopics);
router.post("/topics", topicsController.addTopic);
router.post("/topics/:id/delete", topicsController.deleteTopic);

router.get("/topics/:tId", questionController.listQuestions);
router.post("/topics/:tId/questions", questionController.addQuestion);
router.get("/topics/:tId/questions/:qId", questionController.listQuestionOptions);
router.post("/topics/:tId/questions/:qId/delete", questionController.deleteQuestion);
router.post("/topics/:tId/questions/:qId/options", questionController.addOption);
router.post("/topics/:tId/questions/:qId/options/:oId/delete", questionController.deleteOption);

router.get("/quiz", quizController.listQuizTopics);
router.get("/quiz/:tId", quizController.randomQuizOfTopic);
router.get("/quiz/:tId/questions/:qId", quizController.goQuiz);
router.post("/quiz/:tId/questions/:qId/options/:oId", quizController.chooseOption);
router.get("/quiz/:tId/questions/:qId/correct", quizController.correctOption);
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.incorrectOption);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/logout", loginController.logOut);
router.post("/auth/login", loginController.processLogin);

router.get("/api/questions/random", questionApi.randomSelectedQuestion);
router.post("/api/questions/answer", questionApi.verifyAnswer);

router.get("/auth", loginController.showLoginForm);
router.get("/api", questionApi.randomSelectedQuestion);

export { router };
