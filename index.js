const core = require('@actions/core');
const exec = require('@actions/exec');


const INPUTS = {
    image: 'image',
    tag: 'tag',
}

const OUTPUTS = {
    isExist: 'is_exist'
}


async function run() {
    const image = core.getInput(INPUTS.image, { required: true });
    const tag = core.getInput(INPUTS.tag, { required: false }) || 'latest';

    try {
        let inspectStdOut = '';
        let inspectStdErr = '';

        const exitCode = await exec.exec('docker', ['manifest', 'inspect', `${image}:${tag}`], {
            silent: true,
            ignoreReturnCode: true,
            listeners: {
                stdout: (data) => {
                    inspectStdOut += data.toString();
                },
                stderr: (data) => {
                    inspectStdErr += data.toString();
                }
            }
        });
        if (exitCode !== 0) {
            core.debug(inspectStdErr);
        }
        core.setOutput(OUTPUTS.isExist, exitCode === 0 ? 'true' : 'false');
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
