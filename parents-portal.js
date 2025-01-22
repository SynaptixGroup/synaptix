// Function to evaluate the decision
function evaluateDecision(decision) {
    let feedback = '';
    switch (decision) {
        case 'force':
            feedback = 'Forcing your child might create resentment. Try to understand their perspective first.';
            break;
        case 'understand':
            feedback = 'Great choice! Understanding your child\'s perspective can help address the root cause.';
            break;
        case 'consequence':
            feedback = 'Explaining consequences is good, but make sure to also understand their perspective.';
            break;
        default:
            feedback = 'Please select a valid option.';
    }

    // Update the feedback in the DOM
    document.getElementById('decisionFeedback').textContent = feedback;
}
