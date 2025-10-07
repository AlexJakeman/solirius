export class QuestionPages {    
    // Page errors
    errorThereIsAProblem = "//*[contains(text(), 'There is a problem')]";
    errorPleaseAnswerThisQuestion = "//*[contains(text(), 'Please answer this question')]";

    // Buttons
    buttonContinue(index: number = 1) {
        return `(//*[text()='Continue'])[${index}]`;
    }

    // Input fields
    inputDateDay(index: number = 1) {
        return `(//*[text()='Day'])/following::input[${index}]`;
    }
    inputDateMonth(index: number = 1) {
        return `(//*[text()='Month'])/following::input[${index}]`;
    }
    inputDateYear(index: number = 1) {
        return `(//*[text()='Year'])/following::input[${index}]`;
    }
}