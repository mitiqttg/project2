import * as topicsService from "../../services/topicsService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
    question_text: [validasaur.required, validasaur.minLength(1)],
};

const getQuestionData = async (request) => {
    const body = request.body();
    const params = await body.value;
    return {
        question_text: params.get("question_text"),
    };
};


const addQuestion = async ({ request, response, render, user, params }) => {
    const questionData = await getQuestionData(request);
    
    const [passes, errors] = await validasaur.validate(
        questionData,
        questionValidationRules,
        );
        
    if (!passes) {
        console.log(errors);
        questionData.validationErrors = errors;
        render("topicQuestions.eta", questionData);
    } else {
        await questionService.addQuestion(params.id, user.id, questionData.question_text);
        response.redirect(`/topics/${params.id}`);
    }
};

const deleteTopic = async ({ params, response, user }) => {
    await topicsService.deleteTopic(params.id, user.id);
    
    response.redirect("/topics");
};

const listQuestions = async ({ render, params }) => {
    render("topicQuestions.eta", {
        allQuestions: await questionService.listQuestions(params.id),
        isAdmin: await topicsService.isAdmin(),
    });
};
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// O P T I O N S //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

const optionValidationRules = {
    option_text: [validasaur.required, validasaur.minLength(1)],
};

const getOptionData = async (request) => {
    const body = request.body();
    const params = await body.value;
    return {
        option_text: params.get("option_text"),
        correctness: params.has("is_correct"),
    };
};

const addOption = async ({ params, response, user }) => {
    const optionData = await getOptionData(request);
    
    const [passes, errors] = await validasaur.validate(
        optionData,
        optionValidationRules,
        );

        if (!passes) {
            console.log(errors);
        optionData.validationErrors = errors;
        render("topicQAs.eta", optionData);
    } else {
        await questionService.addOption(params.qId, optionData.option_text, optionData.correctness);
        response.redirect(`/topics/${params.id}/questions/${params.qId}`);
    }
};

const listOptions = async ({ params, response, user }) => {};
const deleteOption = async ({ params, response, user }) => {};

export { 
    addQuestion, 
    deleteTopic, 
    listQuestions,
    addOption,
    listOptions,
    deleteOption
};