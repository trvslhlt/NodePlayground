'use strict'


function ErrorTemplate(error) {
    this.error = error;

    if (error.errorTitle) {
        this.errorTitle = error.errorTitle;
    }
    if (error.errorMessage) {
        this.errorMessage = error.errorMessage;
    }
}

exports.ErrorTemplate = ErrorTemplate;