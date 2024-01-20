document.addEventListener('DOMContentLoaded', function () {
    const editor = document.getElementById('editor');
    const output = document.getElementById('output');
    const tabs = document.querySelectorAll('input[name="codeType"]');

    editor.addEventListener('input', updateOutput);

    tabs.forEach(tab => {
        tab.addEventListener('change', updateOutput);
    });

    function updateOutput() {
        const code = editor.value;
        const selectedTab = document.querySelector('input[name="codeType"]:checked').value;

        try {
            switch (selectedTab) {
                case 'javascript':

                    const consoleLogBuffer = [];
                    const originalConsoleLog = console.log;
                    console.log = (...args) => {
                        consoleLogBuffer.push(args.join(' '));
                    };

                    eval(code);

                    console.log = originalConsoleLog;
                    output.textContent = consoleLogBuffer.join('\n');
                    break;
                case 'html':

                    output.innerHTML = code;
                    break;

            }
        } catch (error) {
            output.textContent = `Error: ${error.message}`;
        }
    }
});
